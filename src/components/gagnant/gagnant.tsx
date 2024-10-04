import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { columns } from "./data";
import { Iga } from "../../types/gagnant";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";

//type Ikey = "id" | "name" | "age" | "role" | "team" | "status" | "actions";
type Ikey = "id" | "nom_tirage" | "numero_gagnant" | "date";

const INITIAL_VISIBLE_COLUMNS = ["nom_tirage", "numero_gagnant", "date"];

export default function TableLotGagnant() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [lotGagnant, setLotGagnant] = React.useState<Iga[]>([]);

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
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allLotGagnant();
  }, []);

  const [rowsPerPage] = React.useState<number>(5);

  const [page] = React.useState(1);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lotGagnant.slice(start, end);
  }, [page, lotGagnant, rowsPerPage]);

  const renderCell = React.useCallback((gagnant: Iga, columnKey: Ikey) => {
    const cellValue = gagnant[columnKey];

    switch (columnKey) {
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="px-2">
      <Table
        removeWrapper
        aria-label="Example table with custom cells, pagination"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className="py-4"
              align="start"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Pas de Gagnant Trouve"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-white" align="justify">
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
