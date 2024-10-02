import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOM COMPLET", uid: "nom_complet", sortable: true },
  { name: "TELEPHONE", uid: "telephone", sortable: true },
  { name: "PAYS", uid: "pays", sortable: true },
  { name: "VILLE", uid: "ville" },
  { name: "ADRRESS COMPLET", uid: "addresse_complet" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

export { columns };
