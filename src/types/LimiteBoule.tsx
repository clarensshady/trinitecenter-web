interface ILimiteBS {
  Tirage: string;
  Agent: string;
}

interface ILimiteBoule {
  Boule: string;
  Min: string;
  Max: string;
  Limite: string;
}

interface ILBoule {
  id?: string;
  tirage: string;
  boule: string;
  max: string;
  min: string;
  limite: string;
  active: boolean;
  actions?: string;
}

interface ILBoulePA extends ILBoule {
  agent: string;
}

export type { ILimiteBS, ILimiteBoule, ILBoule, ILBoulePA };
