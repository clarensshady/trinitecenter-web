interface IBL {
  numero: string;
  montant: string;
  option: string;
  borlette: string;
}

interface IStatistics {
  id: string;
  Tirage: string;
  Surcussale: string;
  Lottery: IBL[];
  date: string;
  bank: string;
  agent: string;
  isDeleted: string;
  isPaid: string;
  isWinning: string;
}

interface IStatTirage {
  id?: string;
  tirage: string;
  date: string;
  lotto: string;
  boules: string;
  montants: string;
  opt?: string;
  Lot1: string;
  Lot2: string;
  Lot3: string;
}

export type { IStatistics, IStatTirage };
