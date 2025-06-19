import __ from "lodash";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  orderBy,
  // Timestamp,
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
import { AllWinningFichePerAgent } from "./winningByAgent";

interface IBL {
  numero: string;
  montant: string;
  option: string;
  borlette: string;
}

interface Ifiche {
  id: string;
  agent: string;
  Tirage?: string;
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

const ficheGagnant = async (
  setResult: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    let TotalWinning = 0;
    let borlette = 0;
    let lotto3 = 0;
    let lotto4 = 0;
    let lotto5 = 0;
    let mariage = 0;
    let first = 0;
    let second = 0;
    let third = 0;
    const gdate = toCalendarDate(today(getLocalTimeZone()));
    const col = collection(db, "lotGagnants");
    const lotGagnants = await getDocs(col);
    const lot = lotGagnants.docs
      .map((doc) => doc.data())
      .filter(
        (l) =>
          toCalendarDate(parseDateTime(`${l.dateCreated}`)).compare(gdate) >= 0
      );

    const fiches = await getDocs(collection(db, "fiches"));
    const allFiches = fiches.docs.map((d) => d.data()) as Ifiche[];
    const PGdoc = doc(db, "primeGenerale", "slWTegZ0f1uy1l8xJecw");
    const primeGen = await getDoc(PGdoc);

    allFiches
      .filter(
        (f) =>
          toCalendarDate(parseDateTime(`${f.dateCreated}`)).compare(gdate) >= 0
      )
      .map((fiche) => {
        const isMatched = lot.find((l: any) => l.Tirage == fiche.Tirage);

        if (isMatched) {
          fiche.Lottery.map((fi) => {
            if (fi.borlette == "borlette" && primeGen.exists()) {
              if (fi.numero == isMatched["Lotto31eLot"]) {
                first = parseInt(fi.montant) * primeGen.data().tirage1;
              }
              if (fi.numero === isMatched["SecondLot"]) {
                second += parseInt(fi.montant) * primeGen.data().tirage2;
              }
              if (fi.numero == isMatched["ThirdLot"]) {
                third += parseInt(fi.montant) * primeGen.data().tirage3;
              }
            }

            if (
              fi.borlette == "lotto3" &&
              fi.numero === isMatched["Lotto31eLot"] &&
              primeGen.exists()
            ) {
              lotto3 += parseInt(fi.montant) * primeGen.data().Lotto3;
            }
            if (
              fi.borlette == "lotto4" &&
              (fi.numero.substring(0, 2) ===
                isMatched["Lotto31eLot"].substring(1) ||
                fi.numero.substring(0, 2) === isMatched["SecondLot"] ||
                fi.numero.substring(0, 2) === isMatched["ThirdLot"]) &&
              (fi.numero.substring(2) ===
                isMatched["Lotto31eLot"].substring(1) ||
                fi.numero.substring(2) === isMatched["SecondLot"] ||
                fi.numero.substring(2) === isMatched["ThirdLot"]) &&
              primeGen.exists()
            ) {
              lotto4 += parseInt(fi.montant) * primeGen.data().Lotto4op1;
            }
            if (
              fi.borlette == "lotto5" &&
              fi.numero.substring(0, 3) === isMatched["Lotto31eLot"] &&
              (fi.numero.substring(3) === isMatched["SecondLot"] ||
                fi.numero.substring(3) === isMatched["ThirdLot"]) &&
              primeGen.exists()
            ) {
              lotto5 += parseInt(fi.montant) * primeGen.data().Lotto5op1;
            }
            if (
              fi.borlette == "mariage" &&
              (fi.numero.substring(0, 2) ==
                isMatched["Lotto31eLot"].substring(1) ||
                fi.numero.substring(0, 2) === isMatched["SecondLot"] ||
                fi.numero.substring(0, 2) === isMatched["ThirdLot"]) &&
              (fi.numero.substring(2) ===
                isMatched["Lotto31eLot"].substring(1) ||
                fi.numero.substring(2) === isMatched["SecondLot"] ||
                fi.numero.substring(2) === isMatched["ThirdLot"]) &&
              primeGen.exists()
            ) {
              mariage += parseInt(fi.montant) * primeGen.data().Mariage;
            }
          });
        }
        borlette = first + second + third;
        TotalWinning = borlette + lotto3 + lotto4 + lotto5 + mariage;
        setResult(`${TotalWinning}`);
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
      console.log("first")
      setLoading(true)
      const winning = await AllWinningFichePerAgent(dateDebut.toString(), dateDefin.toString(), agent, tirage)
      setLoading(false)
        setData({
          fiche: winning.totalFiches || 0,
          montant: parseInt(winning.totalAmount) || 0,
          pertes: parseInt(winning.totalAmountTopay) || 0,
          gains: winning.ficheGagnant || 0,
        });
    } else if (tirage == "tout" && agent != "tout") {
      console.log("second")
      setLoading(true)
      const winning = await AllWinningFichePerAgent(dateDebut.toString(), dateDefin.toString(), agent, tirage)
      setLoading(false)
        setData({
          fiche: winning.totalFiches || 0,
          montant: parseInt(winning.totalAmount) || 0,
          pertes: parseInt(winning.totalAmountTopay) || 0,
          gains: winning.ficheGagnant || 0,
        });
    } else if (tirage != "tout" && agent == "tout") {
      console.log("third")
      setLoading(true)
      const winning = await AllWinningFichePerAgent(dateDebut.toString(), dateDefin.toString(), agent, tirage)
      setLoading(false)
        setData({
          fiche: winning.totalFiches || 0,
          montant: parseInt(winning.totalAmount) || 0,
          pertes: parseInt(winning.totalAmountTopay) || 0,
          gains: winning.ficheGagnant || 0,
        });
    } else {
      // for the tirage and agent not equal tout
      console.log("fourth")
      setLoading(true)
      const winning = await AllWinningFichePerAgent(dateDebut.toString(), dateDefin.toString(), agent, tirage)
      setLoading(false)
        setData({
          fiche: winning.totalFiches || 0,
          montant: parseInt(winning.totalAmount) || 0,
          pertes: parseInt(winning.totalAmountTopay) || 0,
          gains: winning.ficheGagnant || 0,
        });  
    }
    console.log("okay it's outside")
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
        const gains = montants - pertes || 0;
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
  ficheGagnant,
};
