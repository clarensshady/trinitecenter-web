import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config";

const blockSurcussale = async (status: boolean, id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "surcussale", `${id}`);
      await updateDoc(superDoc, {
        block: status ? false : true,
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteSurcussale = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "surcussale", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { blockSurcussale, deleteSurcussale};