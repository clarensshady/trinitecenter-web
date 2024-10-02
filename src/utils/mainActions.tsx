import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

import __ from "lodash";

interface ISel {
  key: string;
  label: string;
}

const surcussaleRef = collection(db, "surcussale");
const bankRef = collection(db, "listOptions");
const superRef = collection(db, "superviseur");
const tirageRef = collection(db, "Tirages");

const allSurcussale = async () => {
  try {
    const surcussale = await getDocs(surcussaleRef);

    const surcu = surcussale.docs.map((s) => {
      return {
        key: `${s.data().Superviseur}`,
        label: `${s.data().Superviseur}`,
      } as ISel;
    });

    return [{ key: "tout", label: "Tout" }, ...surcu];
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const allBank = async () => {
  try {
    const bank = await getDocs(bankRef);

    const ban = bank.docs.map((s) => {
      return {
        key: `${s.data().Bank}`,
        label: __.capitalize(`${s.data().Bank}`),
      } as ISel;
    });

    return [{ key: "tout", label: "Tout" }, ...ban];
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const allSuperviseur = async () => {
  const superviseur = await getDocs(superRef);

  try {
    const surcu = superviseur.docs.map((s) => {
      return {
        key: `${s.data().Pseudoname}`,
        label: __.capitalize(`${s.data().Pseudoname}`),
      } as ISel;
    });

    return surcu;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const allTirage = async () => {
  const tira = await getDocs(tirageRef);

  try {
    const tirage = tira.docs.map((s) => {
      return {
        key: `${s.data().Nom}`,
        label: __.capitalize(`${s.data().Nom}`),
      } as ISel;
    });

    return [{ key: "tout", label: "Tout" }, ...tirage];
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const someBank = async () => {
  try {
    const bank = await getDocs(bankRef);

    const ban = bank.docs.map((s) => {
      return {
        key: `${s.data().Bank}`,
        label: __.capitalize(`${s.data().Bank}`),
      } as ISel;
    });

    return ban;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const someSurcussale = async () => {
  try {
    const surcussale = await getDocs(surcussaleRef);

    const surcu = surcussale.docs.map((s) => {
      return {
        key: `${s.data().Superviseur}`,
        label: `${s.data().Superviseur}`,
      } as ISel;
    });

    return surcu;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const someTirage = async () => {
  const tira = await getDocs(tirageRef);

  try {
    const tirage = tira.docs.map((s) => {
      return {
        key: `${s.data().Nom}`,
        label: __.capitalize(`${s.data().Nom}`),
      } as ISel;
    });

    return tirage;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  allBank,
  allSuperviseur,
  allSurcussale,
  allTirage,
  someBank,
  someSurcussale,
  someTirage,
};
