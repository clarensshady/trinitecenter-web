import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const deleteLimiteBoule = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "limiteboule", `${id}`);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteLimiteBoule };
