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
  CalendarDate,
} from "@nextui-org/react";
import { IsupCol } from "../../types/table";
import __ from "lodash";
import { rapportParAgent } from "./actions";

const columns: IsupCol[] = [
  {
    name: "DATE",
    uid: "date",
  },
  {
    name: "AGENT",
    uid: "agent",
  },
  {
    name: "FICHE",
    uid: "fiche",
  },
  {
    name: "MONTANT",
    uid: "montant",
  },
  {
    name: "PERTES",
    uid: "pertes",
  },
  {
    name: "GAINS",
    uid: "gains",
  },
];

type Ikey = "id" | "date" | "agent" | "fiche" | "montant" | "pertes" | "gains";

const INITIAL_VISIBLE_COLUMNS = [
  "date",
  "agent",
  "fiches",
  "montant",
  "pertes",
  "gains",
];

interface IRapport {
  Agent: string;
  dateDebut: CalendarDate;
  dateDefin: CalendarDate;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IData {
  id?: string;
  date: string;
  agent: string;
  fiche: number;
  montant: number;
  pertes: number;
  gains: number;
}

export default function RapportTable({
  Agent,
  dateDebut,
  dateDefin,
  setLoading,
}: IRapport) {
  const [filterValue /* setFilterValue */] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns /* setVisibleColumns */] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage /* setRowsPerPage */] = React.useState<number>(5);
  const [data, setData] = React.useState<IData[]>([]);

  React.useEffect(() => {
    const AgentStatistics = async () => {
      try {
        await rapportParAgent(Agent, dateDebut, dateDefin, setData, setLoading);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    AgentStatistics();
  }, [Agent, dateDebut, dateDefin]);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  const renderCell = React.useCallback((stats: IData, columnKey: Ikey) => {
    const cellValue = stats[columnKey];

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);

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
            : `${selectedKeys.size} of ${data.length} selected`}
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
        selectionMode="multiple"
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
        <TableBody emptyContent={"Pas de Rapport Trouvé"} items={items}>
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
