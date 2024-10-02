import { db } from "../../config";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

const blockTirage = async (id: string, block: string) => {
  try {
    const tirageRef = doc(db, "Tirages", `${id}`);
    await updateDoc(tirageRef, {
      Block: block == "Activé" ? "Bloqué" : "Activé",
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteTirage = async (id: string) => {
  try {
    const tirageRef = doc(db, "Tirages", `${id}`);
    await deleteDoc(tirageRef);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export { blockTirage, deleteTirage };
