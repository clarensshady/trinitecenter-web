interface IlimitJ {
  Min: string;
  Max: string;
  Limite: string;
}

interface ILimitS {
  Tirage: string;
  Option: string;
}

interface ILimitPA extends ILimitS {
  Agent: string;
}

interface IRecLi {
  id?: string;
  tirage: string;
  lotto: string;
  min: string;
  max: string;
  limite: string;
  active: boolean;
  actions?: string;
}

interface ILPA extends IRecLi {
  agent: string;
}

export type { IlimitJ, ILimitS, ILimitPA, IRecLi, ILPA };
