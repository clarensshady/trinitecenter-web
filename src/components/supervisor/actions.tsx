import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config";

const blockSupervisor = async (status: boolean, id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "superviseur", id);
      await updateDoc(superDoc, {
        block: status ? false : true,
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteSuperviseur = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "superviseur", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { blockSupervisor, deleteSuperviseur };
