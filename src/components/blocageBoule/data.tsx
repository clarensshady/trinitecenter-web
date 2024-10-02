import { IsupCol, IBlockBoule } from "../../types/table";

const columns: IsupCol[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "TIRAGE", uid: "tirage", sortable: true },
  { name: "AGENT", uid: "agent", sortable: true },
  { name: "BOULE", uid: "boule", sortable: true },
  { name: "DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const users: IBlockBoule[] = [
  {
    id: 1,
    tirage: "Tony Reichert",
    agent: "CEO",
    boule: "58",
    date: "active",
  },
  {
    id: 2,
    tirage: "Zoey Lang",
    agent: "Tech Lead",
    boule: "40",
    date: "paused",
  },
  {
    id: 3,
    tirage: "Jane Fisher",
    agent: "Sr. Dev",
    boule: "80",
    date: "active",
  },
  {
    id: 4,
    tirage: "William Howard",
    agent: "C.M.",
    boule: "77",
    date: "vacation",
  },
  {
    id: 5,
    tirage: "Kristen Copper",
    agent: "S. Manager",
    boule: "99",
    date: "active",
  },
  {
    id: 6,
    tirage: "Brian Kim",
    agent: "P. Manager",
    boule: "20",
    date: "Manathan",
  },
];

export { columns, users, statusOptions };
