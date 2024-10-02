import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export function SurcussaleAc() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "new Surccursale"
            ? navigate("surccussale/new")
            : key === "Surccusales"
            ? navigate("surccusale/listes")
            : alert("Pas encore disponible")
        }
      >
        <ListboxItem
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="new Surccursale"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Ajouter</span>
        </ListboxItem>
        <ListboxItem
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="Surccusales"
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
