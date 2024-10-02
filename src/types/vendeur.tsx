interface IVendeur {
  id?: string;
  nom_complet: string;
  com: string;
  telephone: string;
  ville: string;
  addresse_complet: string;
  status: boolean;
  actions?: string;
}

export type { IVendeur };
