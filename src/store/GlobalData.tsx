import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserLogin {
  id: string;
  Pseudoname: string;
  Prenom: string;
  NomDeFamille: string;
  NumeroTelephone: string;
  Genre: string;
  DateDeNaissance: string;
  Commission: string;
  Pays: string;
  Ville: string;
  Surcussale: string;
  AddresseComplete: string;
  MotDePasse: string;
  Bank: string;
  Role: string;
  PhotoUrl: string;
}

interface IData {
  User: IUserLogin;
  isAuthenticated: boolean;
  isMessage: boolean;
  addUser: (newUser: IUserLogin) => void;
  deleteUser: () => void;
  UpdateUser: (updateInfo: Partial<IUserLogin>) => void;
  updatePhoto: (photoUrl: string) => void;
  changeAuthentication: (value: boolean) => void;
  setIsMessage: (value: boolean) => void;
}

const useLotteryStore = create<IData>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      User: {} as IUserLogin,
      isMessage: false,
      addUser: (newUser: IUserLogin) => set(() => ({ User: newUser })),
      deleteUser: () => set(() => ({ User: {} as IUserLogin })),
      UpdateUser: (updateInfo: Partial<IUserLogin>) =>
        set((state) => ({ User: { ...state.User, ...updateInfo } })),
      updatePhoto: (photoUrl: string) =>
        set((state) => ({ User: { ...state.User, PhotoUrl: photoUrl } })),
      changeAuthentication: (value: boolean) =>
        set(() => ({ isAuthenticated: value })),
      setIsMessage: (value: boolean) => set(() => ({ isMessage: value })),
    }),
    {
      name: "Lottery-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLotteryStore;
