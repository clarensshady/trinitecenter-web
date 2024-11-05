import __ from "lodash";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDateTime,
  toCalendarDate,
  today,
} from "@internationalized/date";
import { IFi } from "../../types/fiches";

interface IBL {
  numero: string;
  montant: string;
  option: string;
  borlette: string;
}

interface Ifiche {
  id: string;
  agent: string;
  Lottery: IBL[];
  gagnant: boolean;
  isPaid: boolean;
  toPaid: number;
  isDeleted: boolean;
  surcussale: string;
  dateCreated?: string;
}

interface IData {
  fiche: number;
  montant: number;
  pertes: number;
  gains: number;
}

/* const ficheGagnant = async () => {
  try {
    const col = collection(db, "lotGagnants");
    const lotGagnants = await getDocs(col);

    const gagnant = await getDocs(collection(db, "fiches"));
    // map over lotGagnants
    const lot = lotGagnants.docs.map((l) => l.data());
    // map fiches for finding the winner
    const data = gagnant.docs.map((doc, index) => {
      const Tirage = doc.data().Tirage;
      const Lottery = doc.data().Lottery[index];
      if (lot.filter((f) => f.Tirage == Tirage).length > 0) {
      }
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}; */

const ficheGagnant = async () => {
  try {
    const col = collection(db, "lotGagnants");
    const lotGagnants = await getDocs(col);
    const lot = lotGagnants.docs.map((f) => f.data());

    const fiches = await getDocs(collection(db, "fiches"));

    const gagnant = fiches.docs.map((doc) => {
      const allLots = lot.find((l) => l.Tirage == doc.data().Tirage);
      // const data =
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const rapportParAgentVente = async (
  agent: string,
  tirage: string,
  dateDebut: CalendarDate,
  dateDefin: CalendarDate,
  setData: React.Dispatch<React.SetStateAction<IData>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if (agent == "tout" && tirage == "tout") {
      const q = query(
        collection(db, "fiches"),
        where("isDeleted", "==", false)
      );
      setLoading(true);
      const data = await getDocs(q);
      if (!data.empty) {
        const rapport = data.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            gagnant: fi.data().isWinning,
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
        const stats = agentRapport.map((ra) => {
          const bank = FicheByDate.filter((f) => f.bank == ra);
          const lottery = bank.map((f) => f.lottery).flat(1);
          const pertes = __.sum(bank.map((f) => f.toPaid)) ?? 0;
          const montants = __.sum(lottery.map((f) => f.montant).map(Number));
          const gains = montants - pertes ?? 0;
          return {
            fiche: __.size(FicheByDate.map((a) => a.bank == ra)),
            montant: montants,
            pertes: pertes,
            gains: gains,
          } as IData;
        });
        const Tfiche = __.size(FicheByDate);
        const vente = __.sum(stats.map((a) => a.montant));
        const TficheGagnant = __.size(FicheByDate.filter((f) => f.gagnant));
        const aPaye = __.sum(FicheByDate.map((a) => a.toPaid).map(Number));

        setData({
          fiche: Tfiche,
          montant: vente,
          pertes: aPaye,
          gains: TficheGagnant,
        });
      } else {
        setLoading(false);
        setData({
          fiche: 0,
          montant: 0,
          pertes: 0,
          gains: 0,
        });
      }
    } else if (tirage == "tout" && agent != "tout") {
      const q = query(
        collection(db, "fiches"),
        where("Bank", "==", `${agent}`),
        where("isDeleted", "==", false)
      );
      setLoading(true);
      const stats = await getDocs(q);
      if (!stats.empty) {
        const fich = stats.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            gagnant: fi.data().isWinning,
            dateCreated: fi.data().dateCreated,
            toPaid: fi.data().toPaid,
          };
        }) as IFi[];

        setLoading(false);
        const FicheByDate = fich.filter(
          (f) =>
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDebut) >=
              0 &&
            toCalendarDate(parseDateTime(f.dateCreated)).compare(dateDefin) <= 0
        );

        const fiches = __.size(FicheByDate);

        const lottery = FicheByDate.map((fi) => fi.lottery).flat(1);

        const montants = __.sum(lottery.map((f) => f.montant).map(Number));
        // pertes
        const pertes = __.sum(FicheByDate.map((f) => f.toPaid)) ?? 0;
        // gains
        const gains = __.size(FicheByDate.filter((f) => f.gagnant));
        setData({
          fiche: fiches,
          montant: montants,
          pertes,
          gains,
        });
      } else {
        setLoading(false);
        setData({
          fiche: 0,
          montant: 0,
          pertes: 0,
          gains: 0,
        });
      }
    } else if (tirage != "tout" && agent == "tout") {
      const q = query(
        collection(db, "fiches"),
        where("isDeleted", "==", false),
        where("Tirage", "==", tirage)
      );
      setLoading(true);
      const data = await getDocs(q);
      if (!data.empty) {
        const rapport = data.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            gagnant: fi.data().isWinning,
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
        const stats = agentRapport.map((ra) => {
          const bank = FicheByDate.filter((f) => f.bank == ra);
          const lottery = bank.map((f) => f.lottery).flat(1);
          const pertes = __.sum(bank.map((f) => f.toPaid)) ?? 0;
          const montants = __.sum(lottery.map((f) => f.montant).map(Number));
          const gains = montants - pertes ?? 0;
          return {
            fiche: __.size(FicheByDate.map((a) => a.bank == ra)),
            montant: montants,
            pertes: pertes,
            gains: gains,
          } as IData;
        });
        const Tfiche = __.size(FicheByDate);
        const vente = __.sum(stats.map((a) => a.montant));
        const TficheGagnant = __.size(FicheByDate.filter((f) => f.gagnant));
        const aPaye = __.sum(FicheByDate.map((a) => a.toPaid).map(Number));

        setData({
          fiche: Tfiche,
          montant: vente,
          pertes: aPaye,
          gains: TficheGagnant,
        });
      } else {
        setLoading(false);
        setData({
          fiche: 0,
          montant: 0,
          pertes: 0,
          gains: 0,
        });
      }
    } else {
      // for the tirage and agent not equal tout
      const q = query(
        collection(db, "fiches"),
        where("Bank", "==", agent),
        where("Tirage", "==", tirage),
        where("isDeleted", "==", false)
      );
      setLoading(true);
      const data = await getDocs(q);
      if (!data.empty) {
        const rapport = data.docs.map((fi) => {
          return {
            id: fi.id,
            tirages: fi.data().Tirage,
            lottery: fi.data().Lottery,
            gagnant: fi.data().isWinning,
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
        const stats = agentRapport.map((ra) => {
          const bank = FicheByDate.filter((f) => f.bank == ra);
          const lottery = bank.map((f) => f.lottery).flat(1);
          const pertes = __.sum(bank.map((f) => f.toPaid)) ?? 0;
          const montants = __.sum(lottery.map((f) => f.montant).map(Number));
          const gains = montants - pertes ?? 0;
          return {
            fiche: __.size(FicheByDate.map((a) => a.bank == ra)),
            montant: montants,
            pertes: pertes,
            gains: gains,
          } as IData;
        });
        const Tfiche = __.size(FicheByDate);
        const vente = __.sum(stats.map((a) => a.montant));
        const TficheGagnant = __.size(FicheByDate.filter((f) => f.gagnant));
        const aPaye = __.sum(FicheByDate.map((a) => a.toPaid).map(Number));

        setData({
          fiche: Tfiche,
          montant: vente,
          pertes: aPaye,
          gains: TficheGagnant,
        });
      } else {
        setLoading(false);
        setData({
          fiche: 0,
          montant: 0,
          pertes: 0,
          gains: 0,
        });
      }
    }
  } catch (error) {
    setLoading(false);
    throw new Error(`${error}`);
  }
};

const allRapport = async (
  setData: React.Dispatch<React.SetStateAction<IData>>
) => {
  try {
    const gdate = toCalendarDate(today(getLocalTimeZone()));
    const d = new Date(gdate.toString());

    const q = query(
      collection(db, "fiches"),
      orderBy("timestamp", "desc"),
      where("timestamp", ">=", d),
      where("isDeleted", "==", false)
    );

    const data = await getDocs(q);
    if (!data.empty) {
      const rapport = data.docs.map((fi) => {
        return {
          id: fi.id,
          tirages: fi.data().Tirage,
          lottery: fi.data().Lottery,
          gagnant: fi.data().isWinning,
          dateCreated: fi.data().dateCreated,
          bank: fi.data().Bank,
          toPaid: fi.data().toPaid,
        } as IFi;
      });

      const agentRapport = __.uniq(rapport.map((d) => d.bank));
      const stats = agentRapport.map((ra) => {
        const bank = rapport.filter((f) => f.bank == ra);
        const lottery = bank.map((f) => f.lottery).flat(1);
        const pertes = __.sum(bank.map((f) => f.toPaid)) ?? 0;
        const montants = __.sum(lottery.map((f) => f.montant).map(Number));
        const gains = montants - pertes ?? 0;
        return {
          fiche: __.size(rapport.map((a) => a.bank == ra)),
          montant: montants,
          pertes: pertes,
          gains: gains,
        } as IData;
      });

      const Tfiche = __.size(rapport);
      const vente = __.sum(stats.map((a) => a.montant));
      const TficheGagnant = __.size(rapport.filter((f) => f.gagnant));
      const aPaye = __.sum(rapport.map((a) => a.toPaid).map(Number));

      setData({
        fiche: Tfiche,
        montant: vente,
        pertes: aPaye,
        gains: TficheGagnant,
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const balanceLogics = async () => {
  try {
    const gdate = toCalendarDate(today(getLocalTimeZone()));

    const q = query(
      collection(db, "fiches"),
      orderBy("timestamp", "desc"),
      where("isDeleted", "==", false)
    );

    const data = {
      balance: 0,
      fiche: 0,
      vente: 0,
      agent: 0,
      superviseur: 0,
      agentInactive: 0,
      agentActive: 0,
      commissions: 0,
      aPaye: 0,
      ficheGagnants: 0,
    };
    const fiches = await getDocs(q);
    if (!fiches.empty) {
      const fich = fiches.docs
        .map((doc) => {
          return {
            id: doc.data().id,
            agent: doc.data().Agent,
            gagnant: doc.data().isWinning,
            Lottery: doc.data().Lottery,
            isPaid: doc.data().isPaid,
            toPaid: doc.data().toPaid,
            isDeleted: doc.data().isDeleted,
            surcussale: doc.data().Surcussale,
            dateCreated: doc.data().dateCreated,
          };
        })
        .filter(
          (f) =>
            toCalendarDate(parseDateTime(f.dateCreated)).compare(gdate) >= 0
        ) as Ifiche[];

      // all agent
      const agentFetch = await getDocs(collection(db, "Vendeur"));
      const superviseurFetch = await getDocs(collection(db, "superviseur"));
      const agents = agentFetch.docs.map((a) => a.data().block);
      const commissions = agentFetch.docs
        .map((c) => c.data().Commision)
        .map(Number);
      const superviseurs = superviseurFetch.docs.map((s) => s.data().block);

      // agent logics
      const playAgent = __.size(__.uniq(fich.map((a) => a.agent)));
      const allAgent = __.size(agents);
      const agentPerPercentage = (playAgent * 100) / allAgent;
      const inactiveAgent = allAgent - playAgent;

      // all tickets
      const allTickets = __.size(fich);
      // winning tickets
      const ficheGagnant = __.size(fich.filter((f) => f.gagnant == true));
      // all sales logics
      const lottery = fich.map((fi) => fi.Lottery).flat(1);

      const vente = __.sum(lottery.map((f) => f.montant).map(Number));
      // money to paid logics
      const aPaye = __.sum(fich.map((p) => p.toPaid).map(Number));
      // supervisor percentage
      const interactedSuper = __.size(__.uniq(fich.map((s) => s.surcussale)));
      const allSuperviseur = __.size(superviseurs);
      const pourcentageSuperviseur = Math.floor(
        (interactedSuper * 100) / allSuperviseur
      );

      data.agent = agentPerPercentage;
      data.fiche = allTickets;
      data.vente = vente;
      data.superviseur = pourcentageSuperviseur;
      data.aPaye = aPaye;
      data.agentInactive = inactiveAgent;
      data.agentActive = playAgent;
      data.commissions = __.sum(commissions) ?? 0;
      data.balance = vente - aPaye;
      data.ficheGagnants = ficheGagnant;
    }
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const aPayeLogics = async (
  agent: string,
  tirage: string,
  borlette: string,
  montant: number
) => {
  try {
    const data = { aPaye: 0 };
    const borletteResult = borlette == "borlette" ? "MariageGratuit" : borlette;
    const firstQuery = query(
      collection(db, "primeAgent"),
      where("Agent", "==", agent),
      where("Tirage", "==", tirage)
    );
    const secondQuery = query(
      collection(db, "primeTirage"),
      where("Tirage", "==", tirage)
    );

    const primeAgent = await getDocs(firstQuery);
    const primeTirage = await getDocs(secondQuery);
    const PrimeGenerale = await getDoc(
      doc(db, "primeGenerale", "gBPDkpE92Qqr9a997uFH")
    );

    if (!primeAgent.empty) {
      const prime = primeAgent.docs.map((pa) => pa.data());
      const giftPrice = prime[0][borletteResult];
      data.aPaye = giftPrice * montant;
    } else if (!primeTirage.empty && primeAgent.empty) {
      console.log("third");
      const prime = primeTirage.docs.map((pt) => pt.data());
      const giftPrice = prime[0][borletteResult];
      data.aPaye = giftPrice * montant;
    } else {
      if (PrimeGenerale.exists()) {
        const giftPrice = PrimeGenerale.data()[borletteResult];
        data.aPaye = giftPrice * montant;
      }
    }
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface Ilotto {
  Lotto3: number;
  Lotto4op1: number;
  Lotto4op2: number;
  Lotto4op3: number;
  Lotto5op1: number;
  Lotto5op2: number;
  Lotto5op3: number;
  Mariage: number;
  tirage1: number;
  tirage2: number;
  tirage3: number;
}

const StatisticsLot = (
  PrimeAgent: Ilotto[],
  PrimeTirage: Ilotto[],
  PrimeGenerale: Ilotto,
  borlette: string,
  montant: number,
  type: string
) => {
  console.log("second");
  const data = { aPaye: 0 };
  if (!__.isEmpty(PrimeAgent) && !__.isUndefined(PrimeAgent)) {
    //  best caculation for borlette result wise
    if (borlette == "borlette") {
      if (type == "1er lot") {
        data.aPaye = PrimeAgent[0].tirage1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeAgent[0].tirage2 * montant;
      }
      if (type == "3er lot") {
        data.aPaye = PrimeAgent[0].tirage3 * montant;
      }
    }
    // best calculation for lotto3
    if (borlette == "lotto3") {
      data.aPaye = PrimeAgent[0].Lotto3 * montant;
    }
    // best calculation for lotto4
    if (borlette == "lotto4") {
      if (type == "1er lot") {
        data.aPaye = PrimeAgent[0].Lotto4op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeAgent[0].Lotto4op2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeAgent[0].Lotto4op3 * montant;
      }
    }
    // best calculation for lotto5
    if (borlette == "lotto5") {
      if (type == "1er lot") {
        data.aPaye = PrimeAgent[0].Lotto5op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeAgent[0].Lotto5op2 * montant;
      }
      if (type == "1er lot") {
        data.aPaye = PrimeAgent[0].Lotto5op3 * montant;
      }
    }
    // best calculation for mariage
    if (borlette == "mariage") {
      data.aPaye = PrimeAgent[0].Mariage * montant;
    }
  } else if (
    (!__.isEmpty(PrimeTirage) &&
      !__.isUndefined(PrimeTirage) &&
      __.isEmpty(PrimeAgent)) ||
    __.isUndefined(PrimeAgent)
  ) {
    //  best caculation for borlette result wise
    console.log("third");
    if (borlette == "borlette") {
      if (type == "1er lot") {
        data.aPaye = PrimeTirage[0].tirage1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeTirage[0].tirage2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeTirage[0].tirage3 * montant;
      }
    }
    // best calculation for lotto3
    if (borlette == "lotto3") {
      data.aPaye = PrimeTirage[0].Lotto3 * montant;
    }
    // best calculation for lotto4
    if (borlette == "lotto4") {
      if (type == "1er lot") {
        data.aPaye = PrimeTirage[0].Lotto4op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeTirage[0].Lotto4op2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeTirage[0].Lotto4op3 * montant;
      }
    }
    // best calculation for lotto5
    if (borlette == "lotto5") {
      if (type == "1er lot") {
        data.aPaye = PrimeTirage[0].Lotto5op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeTirage[0].Lotto5op2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeTirage[0].Lotto5op3 * montant;
      }
    }
    // best calculation for mariage
    if (borlette == "mariage") {
      data.aPaye = PrimeTirage[0].Mariage * montant;
    }
  } else {
    console.log("first");
    if (borlette == "borlette") {
      if (type == "1er lot") {
        data.aPaye = PrimeGenerale.tirage1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeGenerale.tirage2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeGenerale.tirage3 * montant;
      }
    }
    // best calculation for lotto3
    if (borlette == "lotto3") {
      data.aPaye = PrimeGenerale.Lotto3 * montant;
    }
    // best calculation for lotto4
    if (borlette == "lotto4") {
      if (type == "1er lot") {
        data.aPaye = PrimeGenerale.Lotto4op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeGenerale.Lotto4op2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeGenerale.Lotto4op3 * montant;
      }
    }
    // best calculation for lotto5
    if (borlette == "lotto5") {
      if (type == "1er lot") {
        data.aPaye = PrimeGenerale.Lotto5op1 * montant;
      }
      if (type == "2eme lot") {
        data.aPaye = PrimeGenerale.Lotto5op2 * montant;
      }
      if (type == "3eme lot") {
        data.aPaye = PrimeGenerale.Lotto5op3 * montant;
      }
    }
    // best calculation for mariage
    if (borlette == "mariage") {
      data.aPaye = PrimeGenerale.Mariage * montant;
    }
  }
  return data;
};

export {
  aPayeLogics,
  balanceLogics,
  StatisticsLot,
  rapportParAgentVente,
  allRapport,
};
