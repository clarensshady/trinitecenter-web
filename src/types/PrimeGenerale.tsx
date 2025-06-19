interface IprimGen<S> {
  id?: S;
  tirage1: S;
  tirage2: S;
  tirage3: S;
  Mariage: S;
  Lotto3: S;
  Lotto4op1: S;
  Lotto4op2: S;
  Lotto4op3: S;
  Lotto5op1: S;
  Lotto5op2: S;
  Lotto5op3: S;
  MariageGratuit: S;
}

interface IPrime extends IprimGen<string> {
  Tirage: string;
  Agent: string;
  [key: string]: any;
}

interface IListofPrimeAgent {
  id?: string;
  Nom: string;
  Tirage: string;
  Borlette: string;
  Mariage: string;
  MariageGratuit: string;
  Lotto3: string;
  Lotto4: string;
  Lotto5: string;
}

interface IListofTirage extends Omit<IListofPrimeAgent, "Tirage"> {}
interface IParTirage extends IPrime {
  Tirage: string;
}

export type { IprimGen, IPrime, IParTirage, IListofPrimeAgent, IListofTirage };
