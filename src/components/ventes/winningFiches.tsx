import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../config";
import { IPrime } from "../../types/PrimeGenerale";
import moment from "moment-timezone"

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
  
  type Logagnant = {
    Lotto31eLot: string;
    SecondLot: string;
    ThirdLot: string;
    Tirage: string;
  };
  
  const parseNumber = (value: string) => parseFloat(value || '0');
  
  export async function getWinningReport( fiches: Fiche[]) {
    try {
        const logagnantSnap = await getDocs(collection(db, 'lotGagnants'));
    const logagnants: Logagnant[] = [];
    logagnantSnap.forEach(doc => logagnants.push(doc.data() as Logagnant));
    
  
    // 4. Get primeTirage and primeGeneral
    const primeAgentSnap = await getDocs(collection(db, 'primeAgent'));
    let primeTirageSnap = await getDocs(collection(db, 'primeTirage'));
    const primeGeneraleSnap = await getDocs(collection(db, 'primeGenerale'));
    const primeGenerale = primeGeneraleSnap.empty ? null : primeGeneraleSnap.docs[0].data();
  
    let totalWinningFiches = 0;
    let totalAmountToPay = 0;
    for (const fiche of fiches) {
      // if (fiche.isDeleted) continue;
      let primeAgentFilter: IPrime[] = [];
      if (!primeAgentSnap.empty) {
        primeAgentFilter = primeAgentSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as IPrime))
          .filter(ag => ag.Agent === fiche.Agent);
      }
      
      let primeAgent = primeAgentFilter.find(ag => ag.Tirage === "tout")
        || primeAgentFilter.find(ag => ag.Tirage === fiche.Tirage);
      
      
      let primeTirageFilter: IPrime[] = [];
      if (!primeTirageSnap.empty) {
        primeTirageFilter = primeTirageSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as IPrime));
      }
      
      let primeTirage = primeTirageFilter.find(ag => ag.Tirage === "tout")
        || primeTirageFilter.find(ag => ag.Tirage === fiche.Tirage);
      

      const matchedDraw = logagnants.find(l =>
        l.Tirage.toLowerCase() === fiche.Tirage.toLowerCase()
      );
      // console.log("matched Draw : ", matchedDraw)
      if (!matchedDraw) continue;
      const { Lotto31eLot, SecondLot, ThirdLot, Tirage } = matchedDraw;
  
      // Lotto4 combinations (2-number strings)
      const lotto4Combinations = [
          Lotto31eLot + SecondLot,
          SecondLot + Lotto31eLot,
          Lotto31eLot + ThirdLot,
          ThirdLot + Lotto31eLot,
          SecondLot + ThirdLot,
          ThirdLot + SecondLot,
        ];
    
        // Lotto5 combinations (3-number strings)
        const lotto5Combinations = [
          Lotto31eLot + SecondLot,
          SecondLot + Lotto31eLot,
          Lotto31eLot + ThirdLot,
          ThirdLot + Lotto31eLot
        ];
  
      let hasWinningTicket = false;
      for (const ticket of fiche.Lottery) {
        const numero = ticket.numero;
        const borlette = ticket.borlette;
        const montant = parseNumber(ticket.montant);
        let gain = 0;
  
        let prizeType = '';
        if(borlette === "borlette") {
      
          if (fiche.Tirage === Tirage && numero == Lotto31eLot) prizeType = 'tirage1';
          else if (fiche.Tirage === Tirage && numero === SecondLot) prizeType = 'tirage2';
          else if (fiche.Tirage === Tirage && numero === ThirdLot) prizeType = 'tirage3';
        } else if(borlette === "lotto3") {
          
          const finalDec = numero.toString().startsWith(SecondLot) || numero.toString().endsWith(SecondLot) || numero.toString().startsWith(ThirdLot) || numero.toString().endsWith(ThirdLot)
          if(fiche.Tirage === Tirage && numero === Lotto31eLot) prizeType = "Lotto3"
          if(fiche.Tirage === Tirage && finalDec) prizeType = "tirage1"
        } else if(borlette === "lotto4") {
          // implement lott04 for me, it's a combination of 2 pair number
          if (fiche.Tirage === Tirage && lotto4Combinations.includes(numero) ) {
              prizeType = "Lotto4op1"; // you can adjust this to op2/op3 if needed
          }
        } else {
          // implement lotto5 for me it's a combination of a pair number with a triple number
          if (fiche.Tirage === Tirage && lotto5Combinations.includes(numero)) {
              prizeType = "Lotto5op1"; // adjust as needed
            }
        }
  
        if (prizeType) {
          const primeSource = primeAgent || primeTirage || primeGenerale;
          const multiplier = parseNumber(primeSource?.[prizeType] || '0');
          gain = montant * multiplier;
          // increment the totalwinningFiches only if it's a differente fiche, no duplicate fiche
          if (!hasWinningTicket) {
            totalWinningFiches++;
            hasWinningTicket = true;
          }
          totalAmountToPay += gain;
        }
      }
    }
  
    return {
      totalWinningFiches,
      totalAmountToPay
    };
    } catch (error) {
        throw new Error(`error is : ${error}`)
    }
    
  }

  const AllWinningFiche =  async () => {
    
    try {
      // const today = new Date()
      // const formattedDate = today.toISOString().split('T')[0];
      const timezone = 'America/Port-au-Prince';
      const now = moment.tz(timezone);

// Get the start and end of the day in HAITI time
    const start = now.clone().startOf("day").toDate();
    const end = now.clone().endOf("day").toDate();
      // const start = moment(formattedDate).startOf("day").toDate();
      // const end = moment(formattedDate).endOf("day").toDate();
      const fichesRef = collection(db, "fiches");

      const q = query(
        fichesRef,
        where("timestamp", ">=", Timestamp.fromDate(start)),
        where("timestamp", "<=", Timestamp.fromDate(end)),
      );

      const snapshot = await getDocs(q);
      const agentFetch = await getDocs(collection(db, "Vendeur"));
  
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Fiche)).filter((fiche) => Boolean(fiche.isDeleted) === false)
       
        let totalAmount = 0;
        let totalNumbers = 0;
        console.log("filtered : ", filtered)
    
        filtered.forEach(fiche => {
          fiche.Lottery.forEach((lot: any) => {
            totalAmount += parseFloat(lot.montant);
            totalNumbers++;
          });
        });

        const allAgentPerFiche = [...new Set(filtered.map(fiche => fiche.Agent))];
        const agents = agentFetch.docs.map((a) => a.data().block);
        
        const winnings = await getWinningReport(filtered)
        const report = {
          totalFiches: filtered.length,
          ficheGagnant: winnings.totalWinningFiches,
          activeAgent: `${allAgentPerFiche.length}`,
          inactiveAgent: `${agents.length - allAgentPerFiche.length}`,
          totalAmount: totalAmount.toFixed(),
          totalAmountTopay: winnings.totalAmountToPay.toFixed(),
          totalLeft: (totalAmount - winnings.totalAmountToPay).toFixed(),
        };
        console.log("all winning report", report)

        return report;
        
    } catch (error) {
        throw new Error(`error :${error}`);
    }
  }

  export {AllWinningFiche}