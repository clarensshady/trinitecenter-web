interface ISignInSuper {
  Email: string;
  Password: string;
  Code: string;
}

interface IForm {
  Pseudoname: string;
  NumeroTelephone: string;
  Prenom: string;
  NomDeFamille: string;
  Commission: string;
  Email: string;
  Ville: string;
  AddresseComplete: string;
  MotDePasse: string;
}

interface IrecSup extends IForm {
  id?: string;
  Genre: string;
  dateDeNaissance: string;
  Pays: string;
  block: boolean;
}

interface IRSup {
  id?: string;
  nom_complet: string;
  telephone: string;
  pays: string;
  ville: string;
  addresse_complet: string;
  status: boolean;
  actions?: string;
}

export type { ISignInSuper, IForm, IRSup, IrecSup };
