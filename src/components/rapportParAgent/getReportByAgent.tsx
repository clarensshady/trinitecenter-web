import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import moment from "moment"
import { db } from "../../config";
import { getWinningReport } from "./ winningAgent";

interface IData {
    id?: string;
    date: string;
    agent: string;
    fiche: number;
    montant: number;
    pertes: number;
    gains: number;
  }

  type Fiche = {
    id?: string;
    Agent: string;
    Lottery: IBL[];
    Tirage: string;
    isDeleted: boolean;
    isWinning: boolean;
  };

  interface IBL {
    numero: string;
    montant: string;
    option: string;
    borlette: string;
  }



const getReportByAgent = async (
    dateDebut: string,
    dateDefin: string,
    targetAgent: string
  ): Promise<IData> => {
    try {
      const start = moment(dateDebut).startOf("day").toDate();
      const end = moment(dateDefin).endOf("day").toDate();
  
      const fichesRef = collection(db, "fiches");
      const q = query(
        fichesRef,
        where("Agent", "==", `${targetAgent.toLowerCase()}`) ,// Only fiches for the specified agent
        where("timestamp", ">=", Timestamp.fromDate(start)),
        where("timestamp", "<=", Timestamp.fromDate(end)),
        orderBy("timestamp", "desc")
      );
  
      const snapshot = await getDocs(q);
      const rawFiches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Fiche));
      const fiches = rawFiches.filter(fiche => !fiche.isDeleted);
  
      const winnings = await getWinningReport(fiches);
  
      let totalAmount = 0;
      fiches.forEach(fiche => {
        fiche.Lottery.forEach(lot => {
          totalAmount += parseFloat(lot.montant);
        });
      });
  
      return {
        id: `${targetAgent}-${dateDebut}`,
        agent: targetAgent,
        fiche: fiches.length,
        montant: parseInt(totalAmount.toFixed(2)),
        pertes: parseInt(winnings.totalAmountToPay.toFixed(2)),
        gains: parseInt((totalAmount - winnings.totalAmountToPay).toFixed(2)),
        date: dateDebut,
      };
    } catch (error) {
      throw new Error(`Failed to generate report for agent "${targetAgent}": ${error}`);
    }
  };

  export {getReportByAgent}
  