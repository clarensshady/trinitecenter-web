import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "AGENT", uid: "agent" },
  { name: "TIRAGE", uid: "tirage", sortable: true },
  { name: "LOTTO", uid: "lotto", sortable: true },
  { name: "MIN", uid: "min", sortable: true },
  { name: "MAX", uid: "max" },
  { name: "LIMITE", uid: "limite" },
  { name: "Active", uid: "active" },
];

export { columns };
