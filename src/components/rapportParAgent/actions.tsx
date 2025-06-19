import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config";
import __ from "lodash";
import {
  CalendarDate,
  parseDateTime,
  toCalendarDate,
} from "@internationalized/date";
import { IFi } from "../../types/fiches";
import { getAllAgentsReport } from "./ winningAgent";

interface IData {
  id?: string;
  date: string;
  agent: string;
  fiche: number;
  montant: number;
  pertes: number;
  gains: number;
}

const rapportParAgent = async (
  agent: string,
  dateDebut: CalendarDate,
  dateDefin: CalendarDate,
  setData: React.Dispatch<React.SetStateAction<IData[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if (agent == "tout") {
      console.log("agent: ")
      setLoading(true)
      console.log("not win")
      const win = await  getAllAgentsReport(dateDebut.toString(), dateDefin.toString()); 
          // return {
          //   id: FicheByDate[index].id,
          //   date: dateDebut.toString(),
          //   agent: ra,
          //   fiche: __.size(FicheByDate.map((a) => a.bank == ra)),
          //   montant: montants,
          //   pertes: pertes,
          //   gains: gains,
          // } as IData;
        

        setData(win);
        setLoading(false)
      
    } else {
      const q = query(
        collection(db, "fiches"),
        where("Bank", "==", `${agent}`)
      );
      setLoading(true);
      const stats = await getDocs(q);
      if (stats.empty) {
        setLoading(false);
      }
      if (!stats.empty) {
        const fich = stats.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            dateCreated: fi.data().dateCreated,
            toPaid: fi.data().toPaid,
          };
        }) as IFi[];

        /* const agentQuery = query(
        collection(db, "Vendeur"),
        where("Bank", "==", `${agent}`)
      ); */
        //   const agents = await getDocs(agentQuery);
        setLoading(false);
        const FicheByDate = fich.filter(
          (f) =>
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDebut) >=
              0 &&
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDefin) <= 0
        );

        //   const com = agents.docs.map((a) => a.data());
        //   const commission = __.sum(com.map((c) => c.Commision).map(Number));
        // nombre de fiches
        const fiches = __.size(FicheByDate);

        const lottery = FicheByDate.map((fi) => fi.lottery).flat(1);

        const montants = __.sum(lottery.map((f) => f.montant).map(Number));
        // pertes
        const pertes = __.sum(FicheByDate.map((f) => f.toPaid)) ?? 0;
        // gains
        // const gains = montants - pertes ?? 0;
        setData([
          {
            id: `${Math.random() * 100}`,
            date: dateDebut.toString(),
            agent: agent,
            fiche: fiches,
            montant: montants,
            pertes,
            gains: 0,
          },
        ]);
      }
    }
  } catch (error) {
    setLoading(false);
    throw new Error(`${error}`);
  }
};

export { rapportParAgent };
