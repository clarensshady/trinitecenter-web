import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Spinner,
} from "@nextui-org/react";
import { Icol } from "../../types/table";
import React from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { IListofPrimeAgent } from "../../types/PrimeGenerale";

const columns: Icol[] = [
  { name: "NOM", uid: "Nom" },
  { name: "TIRAGE", uid: "Tirage" },
  { name: "BORLETTE", uid: "Borlette" },
  { name: "MARIAGE", uid: "Mariage" },
  { name: "MARIAGE.G", uid: "MariageGratuit" },
  { name: "LOTTO3", uid: "Lotto3" },
  { name: "LOTTO4", uid: "Lotto4" },
  { name: "LOTTO5", uid: "Lotto5" },
];

type Ikey =
  | "Nom"
  | "Tirage"
  | "Borlette"
  | "Mariage"
  | "MariageGratuit"
  | "Lotto3"
  | "Lotto4"
  | "Lotto5";

export default function AgentTable() {
  const [agents, setAgents] = React.useState<IListofPrimeAgent[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));

  const [rowsPerPage /* setRowsPerPage */] = React.useState<number>(5);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const allAgents = async () => {
      try {
        onSnapshot(collection(db, "primeAgent"), (querySnapshot) => {
          const primeAgent = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              Nom: doc.data().Agent,
              Tirage: doc.data().Tirage,
              Borlette: doc.data().MariageGratuit,
              Mariage: doc.data().Mariage,
              MariageGratuit: doc.data().MariageGratuit,
              Lotto3: doc.data().Lotto3,
              Lotto4: doc.data().Lotto4op1,
              Lotto5: doc.data().Lotto5op1,
            };
          });

          setAgents(primeAgent);
        });
        setLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allAgents();
  }, []);

  const pages = Math.ceil(agents.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return agents.slice(start, end);
  }, [page, agents, rowsPerPage]);

  const renderCell = React.useCallback(
    (user: IListofPrimeAgent, columnKey: Ikey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        default:
          return <span className="font-semibold">{cellValue}</span>;
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
            : `${selectedKeys.size} of ${agents.length} selected`}
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
  }, [selectedKeys, items.length, page, pages]);

  return (
    <Table
      removeWrapper
      aria-label="Example table with custom cells, pagination"
      bottomContent={bottomContent}
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      // selectedKeys={selectedKeys}
      selectionMode="single"
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
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
        items={agents}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="capitalize">
                {renderCell(item, columnKey as Ikey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
