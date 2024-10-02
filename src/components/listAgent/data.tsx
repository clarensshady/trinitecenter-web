import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOM COMPLET", uid: "nom_complet", sortable: true },
  { name: "COM", uid: "com", sortable: true },
  { name: "Téléphone", uid: "telephone" },
  { name: "VILLE", uid: "ville" },
  { name: "ADRRESS COMPLET", uid: "addresse_complet" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

export { columns };
