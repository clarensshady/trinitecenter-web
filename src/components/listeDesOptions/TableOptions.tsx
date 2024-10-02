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
  Pagination,
  Tooltip,
  Chip,
  Spinner,
} from "@nextui-org/react";

import { SearchIcon } from "../searchIcon";
import { columns } from "./data";
import { IListOption } from "../../types/table";
import { DeleteIcon } from "../table_1/deleteIcon";
import { faLockOpen, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { blockOption, deleteOption } from "./actions";

type Ikey = "id" | "bank" | "surcussale" | "color" | "status" | "actions";

const INITIAL_VISIBLE_COLUMNS = [
  "bank",
  "surcussale",
  "color",
  "status",
  "actions",
];

export default function TableOptions() {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [options, setOptions] = React.useState<IListOption[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns == "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...options];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.bank.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [options, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  React.useEffect(() => {
    const showOptions = async () => {
      try {
        const optionRef = collection(db, "listOptions");
        onSnapshot(optionRef, (querySnapshot) => {
          const option = querySnapshot.docs.map((op) => {
            return {
              id: op.id,
              bank: op.data().Bank,
              surcussale: op.data().Surcussale,
              color: op.data().Color,
              status: op.data().block == true ? "Bloqué" : "Active",
            };
          }) as IListOption[];
          setOptions(option);
        });
        setLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showOptions();
  }, []);

  const renderCell = React.useCallback(
    (option: IListOption, columnKey: Ikey) => {
      const cellValue = option[columnKey];

      const color = option.color;

      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize"
              color={option.status === "Active" ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {option.status === "Active" ? "Active" : "blocked"}
            </Chip>
          );
        case "color":
          return (
            <Chip
              style={{
                backgroundColor:
                  color.toLowerCase() == "yellow"
                    ? "orange"
                    : `${color.toLowerCase()}`,
                color: "white",
              }}
              size="sm"
              variant="flat"
            >
              {option.color}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Supprimer">
                <label
                  onClick={() => {
                    deleteOption(option.id);
                  }}
                >
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </label>
              </Tooltip>
              <Tooltip
                color="danger"
                content={option.status == "Active" ? "Bloqué" : "Débloqué"}
              >
                <label
                  onClick={() => {
                    blockOption(`${option.id}`, option.status);
                  }}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    {option.status == "Active" ? (
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
            </div>
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
              placeholder="Search by boule..."
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
    Option.length,
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
                <TableCell>{renderCell(item, columnKey as Ikey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
