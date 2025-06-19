
import __ from "lodash";
import {
  CalendarDate,
} from "@internationalized/date";

import { getAllAgentsReport } from "./ winningAgent";
import { getReportByAgent } from "./getReportByAgent";

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
        setData(win);
        setLoading(false)
      
    } else {
       console.log("agent: ")
        setLoading(true)
        console.log("not win")
        const win = await  getReportByAgent(dateDebut.toString(), dateDefin.toString(), `${agent.toLowerCase()}`); 
        setData([win]);
        setLoading(false)
    }
  } catch (error) {
    setLoading(false);
    throw new Error(`${error}`);
  }
};

export { rapportParAgent };
