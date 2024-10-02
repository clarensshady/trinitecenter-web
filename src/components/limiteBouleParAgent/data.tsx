import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "AGENT", uid: "agent", sortable: true },
  { name: "TIRAGE", uid: "tirage", sortable: true },
  { name: "BOULE", uid: "boule", sortable: true },
  { name: "MIN", uid: "min", sortable: true },
  { name: "Max", uid: "max", sortable: true },
  { name: "LIMITE", uid: "limite" },
  { name: "ACTIVE", uid: "active" },
];

export { columns };
