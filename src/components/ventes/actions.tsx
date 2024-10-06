import __ from "lodash";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config";
import {
  getLocalTimeZone,
  toCalendarDate,
  today,
} from "@internationalized/date";

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
}

const balanceLogics = async () => {
  try {
    const gdate = toCalendarDate(today(getLocalTimeZone()));
    const d = new Date(gdate.toString());

    const q = query(
      collection(db, "fiches"),
      where("timestamp", ">=", d),
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
      const fich = fiches.docs.map((doc) => {
        return {
          id: doc.data().id,
          agent: doc.data().Agent,
          gagnant: doc.data().isWinning,
          Lottery: doc.data().Lottery,
          isPaid: doc.data().isPaid,
          toPaid: doc.data().toPaid,
          isDeleted: doc.data().isDeleted,
          surcussale: doc.data().Surcussale,
        };
      }) as Ifiche[];

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
      data.commissions = __.sum(commissions);
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

export { aPayeLogics, balanceLogics, StatisticsLot };
