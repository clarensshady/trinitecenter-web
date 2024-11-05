import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  CalendarDate,
} from "@nextui-org/react";
import { columns } from "./data";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config";
import {
  Time,
  parseDateTime,
  toCalendarDate,
  toCalendarDateTime,
  toTime,
} from "@internationalized/date";
import { IStatTirage, IStatistics } from "../../types/statistics";
import __ from "lodash";
import { StatisticsLot } from "../ventes/actions";

interface Ilotto {
  Lotto3: number;
  Lotto4op1: number;
  Lotto4op2: number;
  Lotto4op3: number;
  Lotto5op1: number;
  Lotto5op2: number;
  Lotto5op3: number;
  Mariage: number;
  tirage1: number;
  tirage2: number;
  tirage3: number;
}

type Ikey =
  | "id"
  | "tirage"
  | "date"
  | "lotto"
  | "boules"
  | "opt"
  | "montants"
  | "Lot1"
  | "Lot2"
  | "Lot3";

const INITIAL_VISIBLE_COLUMNS = [
  "tirage",
  "date",
  "lotto",
  "boules",
  "opt",
  "montants",
  "Lot1",
  "Lot2",
  "Lot3",
];

interface ITableStatisticsProps {
  Tirage: string;
  Surcussale: string;
  Agent: string;
  DateDuFiche: CalendarDate;
  HeureDuFiche: Time;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableStatistics({
  Tirage,
  Surcussale,
  Agent,
  DateDuFiche,
  HeureDuFiche,
  setLoading,
}: ITableStatisticsProps) {
  const [filterValue /* setFilterValue */] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns /* setVisibleColumns */] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [stats, setStat] = React.useState<IStatTirage[]>([]);
  const [rowsPerPage /* setRowsPerPage */] = React.useState<number>(15);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  React.useEffect(() => {
    const showStatistics = async () => {
      try {
        const q = query(
          collection(db, "fiches"),
          where("Tirage", "==", `${Tirage?.toLowerCase()}`),
          where("Bank", "==", `${Agent}`)
          // where("Surcussale", "==", `${Surcussale?.toLowerCase()}`)
        );

        setLoading(true);
        const statRef = await getDocs(q);
        const firstQuery = query(
          collection(db, "primeAgent"),
          where("Agent", "==", Agent),
          where("Tirage", "==", `${Tirage}`)
        );
        const secondQuery = query(
          collection(db, "primeTirage"),
          where("Tirage", "==", `${Tirage}`)
        );

        const primeAgent = await getDocs(firstQuery);
        const primeTirage = await getDocs(secondQuery);
        const PrimeGenerale = await getDoc(
          doc(db, "primeGenerale", "slWTegZ0f1uy1l8xJecw")
        );

        const pAgent = primeAgent.docs.map((f) => f.data()) as Ilotto[];
        const pTirage = primeTirage.docs.map((f) => f.data()) as Ilotto[];
        const pGenerale = PrimeGenerale.data() as Ilotto;

        if (statRef.empty) {
          setStat([]);

          setLoading(false);
        }
        if (!statRef.empty) {
          const statistics = statRef.docs.map((stat) => {
            return {
              id: stat.id,
              Tirage: stat.data().Tirage,
              Surcussale: stat.data().Surcussale,
              Lottery: stat.data().Lottery,
              date: stat.data().dateCreated,
              bank: stat.data().Bank,
              agent: stat.data().Agent,
              isPaid: stat.data().isPaid,
              isWinning: stat.data().isWinning,
            } as IStatistics;
          });

          setLoading(false);

          // const lottery = statistics[0].Lottery;
          const stat = statistics.filter(
            (res) =>
              toCalendarDate(parseDateTime(`${res.date}`)).compare(
                DateDuFiche
              ) == 0 &&
              toTime(parseDateTime(`${res.date}`).set({ second: 0 })).compare(
                HeureDuFiche
              ) == 0
          )[0];
          const lottery = stat.Lottery;

          const result = lottery.map((lot) => {
            //
            const date = toCalendarDateTime(
              parseDateTime(`${stat.date}`).set({ second: 0 })
            );

            const premierLot = StatisticsLot(
              pAgent,
              pTirage,
              pGenerale,
              lot.borlette,
              parseInt(lot.montant),
              "1er lot"
            );

            const deuxiemeLot = StatisticsLot(
              pAgent,
              pTirage,
              pGenerale,
              lot.borlette,
              parseInt(lot.montant),
              "2eme lot"
            );

            const troisiemeLot = StatisticsLot(
              pAgent,
              pTirage,
              pGenerale,
              lot.borlette,
              parseInt(lot.montant),
              "3eme lot"
            );

            return {
              id: `${Math.random() * 1000}`,
              tirage: stat.Tirage,
              date: `${date}`,
              lotto: lot.borlette,
              boules: lot.numero,
              montants: lot.montant,
              opt: lot.option[0],
              Lot1: `${premierLot.aPaye}`,
              Lot2: `${deuxiemeLot.aPaye}`,
              Lot3: `${troisiemeLot.aPaye}`,
            } as IStatTirage;
          });
          setLoading(false);

          setStat(result);
        }
      } catch (error) {
        setLoading(false);
        throw new Error(`${error}`);
      }
    };

    showStatistics();
  }, [Tirage, Agent, Surcussale, DateDuFiche, HeureDuFiche]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(stats.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return stats.slice(start, end);
  }, [page, stats, rowsPerPage]);

  const renderCell = React.useCallback(
    (stats: IStatTirage, columnKey: Ikey) => {
      const cellValue = stats[columnKey];

      switch (columnKey) {
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${stats.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="px-2">
      <Table
        removeWrapper
        aria-label="Example table with custom cells, pagination"
        bottomContent={bottomContent}
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="single"
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Aucun Statistics Trouve"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as Ikey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
