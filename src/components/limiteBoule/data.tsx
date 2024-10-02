import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "TIRAGE", uid: "tirage", sortable: true },
  { name: "BOULE", uid: "boule", sortable: true },
  { name: "MIN", uid: "min", sortable: true },
  { name: "MAX", uid: "max" },
  { name: "LIMITE", uid: "limite" },
  { name: "Active", uid: "active" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

export { columns };
