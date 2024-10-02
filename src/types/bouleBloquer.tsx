interface IBouleS {
  Tirage: string;
  Agent: string;
}

interface IBouleB {
  Boule: string;
}

interface IrecoverBoule extends IBouleS {
  id?: string;
  tirage: string;
  agent: string;
  boule: string;
  date: string;
  actions?: string;
}

export type { IBouleB, IBouleS, IrecoverBoule };
