import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const deleteBoule = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "blocageBoule", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteBoule };
