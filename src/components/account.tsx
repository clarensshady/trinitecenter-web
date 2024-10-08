import * as React from "react";
import { ListboxWrapper } from "./listBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface IVendeurAcProps {
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Account(props: IVendeurAcProps) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) =>
          key === "My Account"
            ? navigate("user/account")
            : alert("pas encore disponible")
        }
      >
        <ListboxItem
          onClick={() => {
            if (props.setMenuOpen) {
              props.setMenuOpen(false);
            }
          }}
          startContent={
            <span className="text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="My Account"
          className="space-x-3"
        >
          <span className="text-[0.9rem] text-slate-500">Editer Profile</span>
        </ListboxItem>
        <ListboxItem
          onClick={() => {
            if (props.setMenuOpen) {
              props.setMenuOpen(false);
            }
          }}
          startContent={
            <span className=" text-2xl font-bold -mt-3 text-slate-500">.</span>
          }
          key="PrimeTirage"
          className="space-x-3"
        >
          <span className=" text-start text-[0.9rem] text-slate-500">
            tracabilité Du Compagnie
          </span>
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
