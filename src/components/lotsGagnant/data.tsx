import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOM TIRAGE", uid: "nom_tirage", sortable: true },
  { name: "NUMERO GAGNANT", uid: "numero_gagnant", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };
