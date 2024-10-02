import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface IConfigurationProps {}

export function Configuration() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "Tirages"
            ? navigate("configuration/tirages/listes")
            : key === "Prime Generale"
            ? navigate("configuration/prime_general/modification")
            : key === "Prime Agent"
            ? navigate("configuration/prime_par_agent")
            : key === "Prime Tirage"
            ? navigate("configuration/prime_par_tirage")
            : navigate("configuration/superviseur/listes")
        }
      >
        <ListboxItem
          className="space-x-3"
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Tirages"
        >
          <span className="text-[0.9rem] text-slate-500">Tirages</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Prime Generale"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Prime Generale</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Prime Agent"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Prime Agent</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Prime Tirage"
          className="space-x-3"
        >
          <span className=" text-start text-[0.9rem] text-slate-500">
            Prime Tirages
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Superviseur"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Superviseur</span>
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
