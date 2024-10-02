import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const deleteGagnants = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "lotGagnants", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteGagnants };
