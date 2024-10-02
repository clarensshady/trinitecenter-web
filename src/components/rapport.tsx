import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface IConfigurationProps {}

export function Rapport() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "Ventes"
            ? navigate("rapports/root")
            : key === "Control Agent"
            ? navigate("rapports/agent")
            : key === "Fiches Vendu"
            ? navigate("rapports/liste-fiches")
            : key === "Fiches Gagnants"
            ? navigate("rapports/liste-fiches-gagnant")
            : navigate("rapports/liste-fiches-supprimer")
        }
      >
        <ListboxItem
          className="space-x-3"
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Ventes"
        >
          <span className="text-[0.9rem] text-slate-500">Ventes</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Control Agent"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Control Agent</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Fiches Vendu"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Fiches Vendu</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Fiches Gagnants"
          className="space-x-3"
        >
          <span className=" text-start text-[0.9rem] text-slate-500">
            Fiches Gagnants
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Fiche eliminés"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Fiches Eliminés</span>
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
