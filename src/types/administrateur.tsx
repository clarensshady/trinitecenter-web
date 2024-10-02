type ISignIn = {
  Email: string;
  Password: string;
};

interface Isel {
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

export type { ISignIn, Isel };
