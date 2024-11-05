import * as React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Chip,
  Input,
  DatePicker,
  SelectItem,
  Select,
  CalendarDate,
  Spinner,
} from "@nextui-org/react";
import { IsupCol } from "../../types/table";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../../config";
import { IFicheGagnant } from "../../types/fiches";
import __ from "lodash";
import { SearchIcon } from "../searchIcon";
import { Tirages } from "../ventes/tirage";
import {
  getLocalTimeZone,
  parseDateTime,
  toCalendarDate,
  today,
} from "@internationalized/date";
import { IoptionData } from "../../types/options";
import { allBank, allSurcussale } from "../../utils/mainActions";

const columns: IsupCol[] = [
  {
    name: "TIRAGES",
    uid: "tirages",
  },
  {
    name: "AGENTS",
    uid: "agents",
  },
  {
    name: "BOULES",
    uid: "boules",
  },
  {
    name: "MONTANTS",
    uid: "montants",
  },
  {
    name: "BANK",
    uid: "bank",
  },
  {
    name: "DATE",
    uid: "date",
  },
  {
    name: "PAYE",
    uid: "peyé",
  },
  {
    name: "SUPRIME",
    uid: "suprimé",
  },
  {
    name: "APAYE",
    uid: "apeyé",
  },
];

type Ikey =
  | "id"
  | "tirages"
  | "agents"
  | "boules"
  | "montants"
  | "date"
  | "peyé"
  | "suprimé"
  | "apeyé";

const INITIAL_VISIBLE_COLUMNS = [
  "tirages",
  "agents",
  "boules",
  "montants",
  "bank",
  "date",
  "peyé",
  "suprimé",
  "apeyé",
];

interface IBL {
  numero: string;
  montant: string;
  borlette: string;
  option: string;
}

interface ISel {
  key: string;
  label: string;
}

export default function FicheGagnantTable() {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [fiches, setFiche] = React.useState<IFicheGagnant[]>([]);
  const [data, setData] = React.useState<IoptionData>({} as IoptionData);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [surcussale, setSurcussale] = React.useState<ISel[]>([]);
  const [bank, setBank] = React.useState<ISel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [page, setPage] = React.useState(1);
  let defaultDate: CalendarDate = today(getLocalTimeZone());

  const [dateDebut, setDateDeDebut] = React.useState<CalendarDate>(defaultDate);
  const [dateDeFin, setDateDeFin] = React.useState<CalendarDate>(defaultDate);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    const showFiche = async () => {
      try {
        const gdate = toCalendarDate(today(getLocalTimeZone()));
        const q = query(
          collection(db, "fiches"),
          where("isWinning", "==", true)
        );
        onSnapshot(q, (querySnapshot) => {
          const allFiches = querySnapshot.docs.map((doc) => {
            const Lottery = doc.data().Lottery as IBL[];
            const totalMontant = __.sum(
              Lottery.map((m) => m.montant).map(Number)
            );
            const totalBoule = __.size(Lottery.map((b) => b.numero));

            return {
              id: doc.id,
              tirages: doc.data().Tirage,
              agents: doc.data().Agent,
              boules: `${totalBoule}`,
              surcussale: doc.data().Surcussale,
              montants: `${totalMontant}`,
              bank: doc.data().Bank,
              date: doc.data().dateCreated,
              peyé: doc.data().isPaid,
              suprimé: doc.data().isDeleted,
              apeyé: doc.data().toPaid,
            } as IFicheGagnant;
          });
          setFiche(allFiches);
        });
        setLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showFiche();
  }, []);

  React.useEffect(() => {
    const showSurcu = async () => {
      try {
        const surcu = await allSurcussale();
        setSurcussale(surcu);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    const showBank = async () => {
      try {
        const bank = await allBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showSurcu();
    showBank();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...fiches];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.tirages.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (data.Tirage) {
      if (data.Tirage == "tout") {
        filteredUsers = filteredUsers.filter(
          (op) => !op.tirages.includes("tout")
        );
      } else {
        filteredUsers = filteredUsers.filter((op) =>
          op.tirages.includes(data.Tirage.toLowerCase())
        );
      }
    }

    if (data.Surcussale) {
      if (data.Surcussale == "tout") {
        filteredUsers = filteredUsers.filter(
          (op) => op.surcussale?.toLowerCase() != "tout"
        );
      } else {
        filteredUsers = filteredUsers.filter(
          (op) => op.surcussale?.toLowerCase() == data.Surcussale?.toLowerCase()
        );
      }
    }

    if (data.Agent) {
      if (data.Agent == "tout") {
        filteredUsers = filteredUsers.filter(
          (op) => op.bank?.toLowerCase() != "tout"
        );
      } else {
        filteredUsers = filteredUsers.filter(
          (op) => op.bank?.toLowerCase() == data.Agent.toLowerCase()
        );
      }
    }

    if (dateDebut && dateDeFin) {
      filteredUsers = filteredUsers.filter(
        (f) =>
          toCalendarDate(parseDateTime(f.date)).compare(dateDebut) >= 0 &&
          toCalendarDate(parseDateTime(f.date)).compare(dateDeFin) <= 0
      );
    }

    return filteredUsers;
  }, [fiches, filterValue, data, dateDebut, dateDeFin]);

  const pages = Math.ceil(fiches.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback(
    (stats: IFicheGagnant, columnKey: Ikey) => {
      const cellValue = stats[columnKey];
      switch (columnKey) {
        case "peyé":
          return (
            <Chip
              className="capitalize font-semibold"
              color={stats.peyé ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {stats.peyé ? "Oui" : "Nom"}
            </Chip>
          );
        case "suprimé":
          return (
            <Chip
              className="capitalize font-semibold"
              color={stats.suprimé ? "danger" : "success"}
              size="sm"
              variant="flat"
            >
              {stats.suprimé ? "Oui" : "Nom"}
            </Chip>
          );
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

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div>
        <div className="flex gap-3 px-2 py-4">
          <Select
            selectionMode="single"
            label="Tirage"
            name="Tirage"
            value={data.Tirage}
            placeholder="Selectioner tirage"
            onChange={onChangeSelect}
            className="hidden md:flex md:max-w-xs"
          >
            {Tirages.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Surcussale"
            name="Surcussale"
            value={data.Surcussale}
            onChange={onChangeSelect}
            placeholder="Selectionner surcussale"
            className="hidden md:flex md:max-w-xs"
          >
            {surcussale.map((surcu) => (
              <SelectItem className="capitalize" key={surcu.key}>
                {surcu.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Agent"
            placeholder="Select agent"
            name="Agent"
            value={data.Agent}
            onChange={onChangeSelect}
            className="hidden md:flex md:max-w-xs"
          >
            {bank.map((agent) => (
              <SelectItem key={agent.key}>{agent.label}</SelectItem>
            ))}
          </Select>
          <div className="flex-1">
            <DatePicker
              // defaultValue={defaultDate}
              value={dateDebut}
              onChange={setDateDeDebut}
              label="Date de début"
              className="w-xs"
            />
          </div>
          <div className="flex-1">
            <DatePicker
              // defaultValue={defaultDate}
              value={dateDeFin}
              onChange={setDateDeFin}
              label="Date de fin"
              className="w-xs"
            />
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <div className="flex gap-3">
            <Input
              label="Rechercher"
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
              isClearable
              radius="lg"
              className="hidden md:flex"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/50",
                  "w-[160px]",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/90",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "group-data-[focus=true]:shadow-xl",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Search..."
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
            <Button
              variant="shadow"
              className="py-7 text-lg rounded-md hidden md:flex"
              color="primary"
              // onClick={filteredOption}
            >
              Filtrer
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    Option.length,
    onSearchChange,
    hasSearchFilter,
    data,
    dateDebut,
    dateDeFin,
    bank,
    surcussale,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${fiches.length} selected`}
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, data]);

  return (
    <div className="px-2">
      <Table
        topContent={topContent}
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
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={
            <span className="text-xl text-black font-bold">Pas trouvé</span>
          }
          items={items}
        >
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
