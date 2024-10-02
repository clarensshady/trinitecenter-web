interface Icol {
  name: string;
  uid: string;
}

interface ITirage<S> {
  id: string;
  nom: S;
  ouverture: S;
  fermeture: S;
  block: S;
  status: S;
  actions?: any;
}

interface IPPAgent<S> {
  key: S;
  nom: S;
  tirage: S;
  borlette: S;
  mariage: S;
  mariageg: S;
  lotto3: S;
  lotto4: S;
  lotto5: S;
}

interface IsupCol {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface IPPCol {
  key: string;
  label: string;
}
interface IsupData {
  id: number;
  nom_complet: string;
  ref_code: string;
  pays: string;
  ville: string;
  address_complet: string;
  avatar?: string;
  email?: string;
  actions?: string;
}

interface IBlockBoule {
  id: number;
  tirage: string;
  agent: string;
  boule: string;
  date: string;
  actions?: string;
}

interface IStat {
  id: number;
  date: string;
  tirage: string;
  lotto: string;
  montants: string;
  boules: string;
  montant: string;
  quantite: string;
  status: string;
}

interface IListOption {
  id: string;
  bank: string;
  surcussale: string;
  color: string;
  status: string;
  actions?: string;
}

interface ILimiteJeu {
  id: number;
  tirage: string;
  lotto: string;
  min: string;
  max: string;
  active: string;
  actions?: string;
}

interface ILimiteBoule {
  id: number;
  tirage: string;
  boule: string;
  min: string;
  max: string;
  active: string;
  actions?: string;
}

interface ILimiteBouleParAgent extends Omit<ILimiteBoule, "active"> {
  agent: string;
  status: string;
}

interface IrapportParAgent {
  id: number;
  date: string;
  agents: string;
  fiches: string;
  fgagnants: string;
  montant: string;
  commissions: string;
  pertes: string;
  gains: string;
}

export type {
  IStat,
  Icol,
  ITirage,
  IPPAgent,
  IPPCol,
  IsupCol,
  IsupData,
  IBlockBoule,
  IListOption,
  ILimiteJeu,
  ILimiteBoule,
  ILimiteBouleParAgent,
  IrapportParAgent,
};
