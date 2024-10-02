import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

const deleteAgent = async (id?: string) => {
  try {
    if (id) {
      const superDoc = doc(db, "Vendeur", id);
      await deleteDoc(superDoc);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const blockAndUnblock = async (status: boolean, code?: string) => {
  try {
    await updateDoc(doc(db, "Vendeur", `${code}`), {
      block: status ? false : true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteAgent, blockAndUnblock };
