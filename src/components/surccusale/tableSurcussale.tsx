import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  User,
  Pagination,
  Tooltip,
  Chip,
  Spinner,
} from "@nextui-org/react";

import { SearchIcon } from "../searchIcon";
import { columns } from "./data";
import { EditIcon } from "../table_1/editIcon";
import { DeleteIcon } from "../table_1/deleteIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { IrecSuc } from "../../types/surcussale";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { useNavigate } from "react-router-dom";
import { blockSurcussale, deleteSurcussale } from "./actions";

type Ikey =
  | "id"
  | "nom_superviseur"
  | "pays"
  | "ville"
  | "nom_central"
  | "block"
  | "actions";

const INITIAL_VISIBLE_COLUMNS = [
  "nom_superviseur",
  "pays",
  "ville",
  "nom_central",
  "block",
  "actions",
];

export default function TableSurcussale() {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter] = React.useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [surcussales, setSurcussale] = React.useState<IrecSuc[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    const allSurcussales = async () => {
      try {
        onSnapshot(collection(db, "surcussale"), (querySnapshot) => {
          const surcussale = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              nom_superviseur: doc.data().Superviseur,
              pays: doc.data().Pays,
              ville: doc.data().Ville,
              nom_central: doc.data().NomCentral,
              block: doc.data().block,
            } as IrecSuc;
          });
          setSurcussale(surcussale);
        });
        setLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allSurcussales();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...surcussales];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nom_superviseur.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [surcussales, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((user: IrecSuc, columnKey: Ikey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nom_superviseur":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "https://images.unsplash.com/broken",
              showFallback: true,
            }}
            description={`#${user.nom_superviseur.split(" ")[0]}${
              user.nom_superviseur.split(" ")[1]
            }@superviseur`}
            name={cellValue}
            className="capitalize"
          >
            <span>{user.nom_superviseur}</span>
          </User>
        );
      case "block":
        return (
          <Chip
            className="capitalize"
            color={user.block ? "danger" : "success"}
            size="sm"
            variant="flat"
          >
            <span className="font-bold">{user.block ? "Oui" : "Non"}</span>
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content={user.block ? "UnBlock" : "Block"}>
              <label
                onClick={() => {
                  blockSurcussale(user.block, `${user.id}`);
                }}
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  {user.block ? (
                    <FontAwesomeIcon icon={faKey} />
                  ) : (
                    <FontAwesomeIcon
                      className="mt-[0.4rem]"
                      icon={faUnlockKeyhole}
                    />
                  )}
                </span>
              </label>
            </Tooltip>
            <Tooltip content="Editer superviseur">
              <label onClick={() => navigate(`edit/${user.id}`)}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </label>
            </Tooltip>
            <Tooltip color="danger" content="Suprimer superviseur">
              <label
                onClick={() => {
                  deleteSurcussale(`${user.id}`);
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    surcussales.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
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
        //sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        //onSortChange={setSortDescriptor}
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
