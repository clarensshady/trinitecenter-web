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
  Tooltip,
  Spinner,
} from "@nextui-org/react";

import { columns } from "./data";
import { EditIcon } from "../table_1/editIcon";
import { DeleteIcon } from "../table_1/deleteIcon";
import { Iga } from "../../types/gagnant";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { deleteGagnants } from "./action";
import { useNavigate, NavigateFunction } from "react-router-dom";

//type Ikey = "id" | "name" | "age" | "role" | "team" | "status" | "actions";
type Ikey = "id" | "nom_tirage" | "numero_gagnant" | "date" | "actions";

const INITIAL_VISIBLE_COLUMNS = [
  "nom_tirage",
  "numero_gagnant",
  "date",
  "actions",
];

export default function TableGagnant() {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [lotGagnant, setLotGagnant] = React.useState<Iga[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const navigate: NavigateFunction = useNavigate();

  React.useEffect(() => {
    const allLotGagnant = async () => {
      try {
        onSnapshot(collection(db, "lotGagnants"), (querySnapshot) => {
          const AllLotGagnants = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              nom_tirage: doc.data().Tirage,
              numero_gagnant: `${doc.data().Lotto31eLot}-${
                doc.data().SecondLot
              }-${doc.data().ThirdLot}`,
              date: doc.data().date,
            } as Iga;
          });
          setLotGagnant(AllLotGagnants);
        });
        setLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allLotGagnant();
  }, []);

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(lotGagnant.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lotGagnant.slice(start, end);
  }, [page, lotGagnant, rowsPerPage]);

  const renderCell = React.useCallback((gagnant: Iga, columnKey: Ikey) => {
    const cellValue = gagnant[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editer superviseur">
              <label onClick={() => navigate(`edit/${gagnant.id}`)}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </label>
            </Tooltip>
            <Tooltip color="danger" content="Suprimer superviseur">
              <label
                onClick={() => {
                  deleteGagnants(gagnant.id);
                }}
              >
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </label>
            </Tooltip>
          </div>
        );
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
            : `${selectedKeys.size} of ${lotGagnant.length} selected`}
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
              align="start"
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
                <TableCell align="justify">
                  {renderCell(item, columnKey as Ikey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
