import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

const deleteFiche = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "fiches", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const ficheGagnant = async (id: string, montant: string) => {
  try {
    const ficheRef = doc(db, "fiches", `${id}`);

    await updateDoc(ficheRef, {
      isWinning: true,
      toPaid: montant,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const peyeFiche = async (id: string, status: boolean) => {
  try {
    const ficheRef = doc(db, "fiches", `${id}`);
    await updateDoc(ficheRef, {
      isPaid: status ? false : true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteFiche, peyeFiche, ficheGagnant };
