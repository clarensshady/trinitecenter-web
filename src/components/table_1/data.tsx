import { Icol, ITirage } from "../../types/table";

const columns: Icol[] = [
  { name: "NOM", uid: "nom" },
  { name: "OUVERTURE", uid: "ouverture" },
  { name: "FERMETURE", uid: "fermeture" },
  { name: "BLOCK", uid: "block" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

/* const tirages: ITirage<string>[] = [
  {
    id: 1,
    nom: "New York Midi",
    ouverture: "05:00:00",
    fermeture: "14:25:00",
    block: "Fermé",
    status: "En cours",
  },
  {
    id: 2,
    nom: "New York Soir",
    ouverture: "14:00:00",
    fermeture: "22:25:00",
    block: "Activé",
    status: "Fermé",
  },
  {
    id: 3,
    nom: "Georgia Matin",
    ouverture: "05:00:00",
    fermeture: "12:25:00",
    block: "Activé",
    status: "Fermé",
  },
  {
    id: 4,
    nom: "Georgia Soir",
    ouverture: "14:00:00",
    fermeture: "18:50:00",
    block: "Activé",
    status: "Fermé",
  },
  {
    id: 5,
    nom: "Florida Midi",
    ouverture: "05:00:00",
    fermeture: "13:25:00",
    block: "Activé",
    status: "En cours",
  },
  {
    id: 6,
    nom: "Florida Soir",
    ouverture: "14:00:00",
    fermeture: "21:40:00",
    block: "Activé",
    status: "Fermé",
  },
]; */

export { columns };
