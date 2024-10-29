interface IGagnant {
  id: number;
  nom_tirage: string;
  numero_gagnant: string;
  date: string;
  actions?: string;
}

interface IAdd {
  Tirage: string;
  Lotto31eLot: string;
  SecondLot: string;
  ThirdLot: string;
}

interface Iga {
  id?: string;
  nom_tirage: string;
  numero_gagnant: string;
  date: string;
  actions: string;
}

export type { IGagnant, IAdd, Iga };
