interface IFicheVendu {
  id?: string;
  tirages: string;
  agents: string;
  boules: string;
  surcussale: string;
  montants: string;
  bank?: string;
  date: string;
  peyé: boolean;
  suprimé: boolean;
  gagnant?: boolean;
  actions?: string;
}

interface IFicheGagnant extends Omit<IFicheVendu, "actions"> {
  apeyé: string;
}

interface IFicheElimine extends Omit<IFicheVendu, "actions"> {}

interface IBL {
  numero: string;
  montant: string;
  borlette: string;
  option: string;
}

interface IFi {
  id: string;
  date: string;
  tirages: string;
  bank: string;
  lottery: IBL[];
  gagnant?: boolean;
  dateCreated: string;
  toPaid: number;
}

interface IControlAgent {
  id: string;
  date: number;
  ficheGlobal: number;
  montantGlobal: number;
  commissions: number;
  perteGlobal: number;
  gainGlobal: number;
}

export type { IFicheVendu, IFicheGagnant, IFicheElimine, IFi, IControlAgent };
