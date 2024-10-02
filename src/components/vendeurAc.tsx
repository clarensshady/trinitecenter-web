import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export function VendeurAc() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "newAgent" ? navigate("agent/new") : navigate("agent/list")
        }
      >
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="newAgent"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Ajouter</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="agents"
          className="space-x-3"
        >
          <span className=" text-start text-[0.9rem] text-slate-500">
            Listes
          </span>
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
