import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config";
import __ from "lodash";
import {
  CalendarDate,
  parseDateTime,
  toCalendarDate,
} from "@internationalized/date";
import { IFi } from "../../types/fiches";

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
      const q = collection(db, "fiches");
      setLoading(true);
      const data = await getDocs(q);
      if (data.empty) {
        setLoading(false);
      }
      if (!data.empty) {
        const rapport = data.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            dateCreated: fi.data().dateCreated,
            bank: fi.data().Bank,
            toPaid: fi.data().toPaid,
          } as IFi;
        });
        setLoading(false);
        const FicheByDate = rapport.filter(
          (f) =>
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDebut) >=
              0 &&
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDefin) <= 0
        );

        const agentRapport = __.uniq(FicheByDate.map((d) => d.bank));
        const stats = agentRapport.map((ra, index) => {
          const bank = FicheByDate.filter((f) => f.bank == ra);
          const lottery = bank.map((f) => f.lottery).flat(1);
          const pertes = __.sum(bank.map((f) => f.toPaid)) ?? 0;
          const montants = __.sum(lottery.map((f) => f.montant).map(Number));
          const gains = montants - pertes ?? 0;
          return {
            id: FicheByDate[index].id,
            date: dateDebut.toString(),
            agent: ra,
            fiche: __.size(FicheByDate.map((a) => a.bank == ra)),
            montant: montants,
            pertes: pertes,
            gains: gains,
          } as IData;
        });

        setData(stats);
      }
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
        const gains = montants - pertes ?? 0;
        setData([
          {
            id: `${Math.random() * 100}`,
            date: dateDebut.toString(),
            agent: agent,
            fiche: fiches,
            montant: montants,
            pertes,
            gains,
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
