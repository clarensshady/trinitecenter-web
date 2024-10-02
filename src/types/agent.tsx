import { IForm } from "./superviseur";

interface Isel {
  key: string;
  label: string;
}

interface IListAgent {
  id: number;
  nom_complet: string;
  ref_code: string;
  com: string;
  ville: string;
  address_complet: string;
  telephone: string;
  avatar?: string;
  email?: string;
  actions?: string;
}

interface INewAgent extends Omit<IForm, "Email" | "Genre"> {
  Commission: string;
  AndroidId: string;
}

export type { Isel, IListAgent, INewAgent };
