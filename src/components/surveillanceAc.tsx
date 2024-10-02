import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface IConfigurationProps {}

export function SurveillanceAc() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "LotGagnants"
            ? navigate("tirage/list")
            : key === "Blocage Boule"
            ? navigate("borlette/blockage-boule")
            : key === "Statistiques"
            ? navigate("borlette/statistique")
            : key === "Listes Options"
            ? navigate("borlette/lotto")
            : key === "Limite Jeu"
            ? navigate("borlette/limite-game")
            : key === "Limite Jeu Par Agent"
            ? navigate("borlette/limite-game-par-agent")
            : key === "Limite Boule"
            ? navigate("borlette/limite-boule")
            : key === "Limite Boule par Agent"
            ? navigate("borlette/limite-boule-par-agent")
            : alert("Pas encore disponible")
        }
      >
        <ListboxItem
          className="space-x-3"
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="LotGagnants"
        >
          <span className="text-[0.9rem] text-slate-500">Lot Gagnants</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Blocage Boule"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Blocage Boule</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Statistiques"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Statistiques</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Listes Options"
          className="space-x-3"
        >
          <span className=" text-start text-[0.9rem] text-slate-500">
            Listes Options
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Limite Jeu"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Limite Jeu</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Limite Jeu Par Agent"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">
            Limite Jeu Par Agent
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Limite Boule"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Limite Boule</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Limite Boule par Agent"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">
            Limite Boule par Agent
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Tracabilite Agents"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">
            Tracabilite Agents
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="edit"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">
            Tracabilite Superviseur
          </span>
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
