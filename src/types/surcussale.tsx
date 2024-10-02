interface ISurC {
  Pays: string;
  Ville: string;
  Superviseur: string;
  NomCentral: string;
  NumeroTelephone: string;
}

interface IrecSuc {
  id?: string;
  nom_superviseur: string;
  pays: string;
  ville: string;
  nom_central: string;
  block: boolean;
  actions?: string;
}

export type { ISurC, IrecSuc };
