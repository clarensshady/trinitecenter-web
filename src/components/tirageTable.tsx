import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { EditIcon } from "./table_1/editIcon";
import { DeleteIcon } from "./table_1/deleteIcon";
import { columns } from "./table_1/data";
import { ITirage } from "../types/table";
import { SearchIcon } from "./searchIcon";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config";
import {
  getLocalTimeZone,
  now,
  parseTime,
  toTime,
} from "@internationalized/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { blockTirage, deleteTirage } from "./listTirage/actions";

type Ikey = "nom" | "ouverture" | "fermeture" | "block" | "status" | "actions";
const INITIAL_VISIBLE_COLUMNS: string[] = [
  "nom ",
  "ouverture",
  "fermeture",
  "block",
  "status",
  "actions",
];

export interface IModalProps {
  TirageId: string;
  onOpen: () => void;
  onOpenChange: () => void;
}

interface ITirageTableProps {
  setLag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Tiragetable({ setLag }: ITirageTableProps) {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [loading, setLoading] = React.useState<boolean>(true);
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [tirages, setTirages] = React.useState<ITirage<string>[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const navigate = useNavigate();

  React.useEffect(() => {
    const Now = toTime(now(getLocalTimeZone()));

    const allTirages = async () => {
      try {
        setLag(true);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setLag(false);
        onSnapshot(collection(db, "Tirages"), (querySnapshot) => {
          const alltirages = querySnapshot.docs.map((doc) => {
            const ouverture = parseTime(doc.data().Ouverture);
            const fermeture = parseTime(doc.data().fermeture);

            return {
              nom: doc.data().Nom,
              ouverture: doc.data().Ouverture,
              block: doc.data().Block,
              fermeture: doc.data().fermeture,
              status:
                Now.compare(ouverture) < 0 || Now.compare(fermeture) > 0
                  ? "Fermé"
                  : "En cours",
              id: doc.id,
            };
          }) as ITirage<string>[];
          setTirages(alltirages);
        });
        setLoading(false);
      } catch (error) {
        setLag(false);
        setLoading(false);
        throw new Error(`${error}`);
      }
    };
    allTirages();
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tirages];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nom.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [tirages, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback(
    (user: ITirage<string>, columnKey: Ikey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize font-semibold"
              color={user.status === "En cours" ? "warning" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "block":
          return (
            <Chip
              className="capitalize font-semibold"
              color={user.block === "Bloqué" ? "danger" : "success"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip
                content={user.block == "Activé" ? "Désactivé" : "Bloqué"}
              >
                <label
                  onClick={() => {
                    blockTirage(`${user.id}`, user.block);
                  }}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    {user.block == "Activé" ? (
                      <FontAwesomeIcon
                        className="mt-[0.4rem]"
                        icon={faLockOpen}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="mt-[0.4rem]"
                        icon={faUnlockKeyhole}
                      />
                    )}
                  </span>
                </label>
              </Tooltip>
              <Tooltip content="Edit tirage">
                <label onClick={() => navigate(`edit/${user.id}`)}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </label>
              </Tooltip>
              <Tooltip color="danger" content="Delete tirage">
                <label
                  onClick={() => {
                    deleteTirage(`${user.id}`);
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

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end px-4 pb-1 pt-4">
          <div className="">
            <Input
              label="Rechercher"
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
              isClearable
              radius="lg"
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
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/90",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "group-data-[focus=true]:shadow-xl",
                  "group-data-[focus=true]:w-[270px]",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Search by name..."
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div>
            <Button
              variant="shadow"
              className="py-7 text-lg rounded-md"
              color="primary"
            >
              Rafraîchir
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    tirages.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${tirages.length} selected`}
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
    <Table
      isStriped
      layout="auto"
      topContent={topContent}
      aria-label="Example table with custom cells, pagination"
      bottomContent={bottomContent}
      removeWrapper
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectionMode="multiple"
      topContentPlacement="inside"
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
        items={items}
        isLoading={loading}
        emptyContent={"Pas de Tirage"}
        loadingContent={<Spinner label="Loading..." />}
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
