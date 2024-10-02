import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const deleteLimiteJeu = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "limiteJeu", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteLimiteJeu };
