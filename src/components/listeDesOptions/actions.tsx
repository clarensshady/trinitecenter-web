import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

const deleteOption = async (id: string) => {
  try {
    const optionDoc = doc(db, "listOptions", `${id}`);
    await deleteDoc(optionDoc);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const blockOption = async (id: string, status: string) => {
  try {
    const optionDoc = doc(db, "listOptions", `${id}`);
    await updateDoc(optionDoc, { block: status == "Active" ? true : false });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { deleteOption, blockOption };
