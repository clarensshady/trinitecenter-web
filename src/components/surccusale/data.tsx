import { IsupCol } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOM SUPERVISEUR", uid: "nom_superviseur", sortable: true },
  { name: "PAYS", uid: "pays", sortable: true },
  { name: "VILLE", uid: "ville", sortable: true },
  { name: "NOM CENTRAL", uid: "nom_central" },
  { name: "BLOCK", uid: "block" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

export { columns };
