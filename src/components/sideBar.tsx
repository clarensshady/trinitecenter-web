import * as React from "react";
import {
  faBusinessTime,
  faChartLine,
  faDollarSign,
  faHouseUser,
  faLink,
  faSackDollar,
  faSliders,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Configuration } from "./configurations";
import { VendeurAc } from "./vendeurAc";
import { SurveillanceAc } from "./surveillanceAc";
import { Rapport } from "./rapport";
import { SurcussaleAc } from "./surcussale";
import { Account } from "./account";
import { useNavigate } from "react-router-dom";

interface Iselect {
  icon: JSX.Element;
  name: string;
  isDown: boolean;
  content?: JSX.Element;
}

const sections: Iselect[] = [
  {
    icon: <FontAwesomeIcon icon={faLink} />,
    name: "Tableau De Bord",
    isDown: false,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faSliders} />,
    name: "Configuration",
    isDown: true,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faUsers} />,
    name: "Vendeur",
    isDown: true,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faBusinessTime} />,
    name: "Surveillance",
    isDown: true,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faHouseUser} />,
    name: "Succursale",
    isDown: true,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faChartLine} />,
    name: "Rapports",
    isDown: true,
    content: <div>first one</div>,
  },
  {
    icon: <FontAwesomeIcon icon={faDollarSign} />,
    name: "Transactions",
    isDown: false,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faSackDollar} />,
    name: "Facturation",
    isDown: false,
  },
  {
    icon: <FontAwesomeIcon className="text-slate-600" icon={faUser} />,
    name: "Mon Compte",
    isDown: true,
    content: <div>second one</div>,
  },
];

export function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col justify-center mt-5">
      {sections.map((value, index) => {
        return (
          <div key={index} className="w-full">
            {value.isDown ? (
              <div className="px-7">
                <Accordion>
                  <AccordionItem
                    startContent={value.icon}
                    key="1"
                    aria-label="Accordion 1"
                    title={
                      <span className="text-slate-600 text-sm">
                        {value.name}
                      </span>
                    }
                  >
                    {value.name == "Configuration" ? (
                      <Configuration />
                    ) : value.name == "Vendeur" ? (
                      <VendeurAc />
                    ) : value.name == "Surveillance" ? (
                      <SurveillanceAc />
                    ) : value.name == "Rapports" ? (
                      <Rapport />
                    ) : value.name === "Succursale" ? (
                      <SurcussaleAc />
                    ) : value.name == "Mon Compte" ? (
                      <Account />
                    ) : (
                      "first one"
                    )}
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <label
                onClick={() => {
                  value.name === "Tableau De Bord"
                    ? navigate("/dashboard")
                    : value.name == "Transactions"
                    ? alert("not available yet")
                    : alert("not availble yet");
                }}
              >
                <div
                  className={
                    value.name == "Tableau De Bord" &&
                    location.pathname.split("/").length < 3
                      ? "flex w-full items-center px-9 gap-3 mb-1 border-solid py-3 bg-blue-100 border-blue-600 border-r-4"
                      : value.name == "Transactions"
                      ? "flex gap-3 items-center px-9 mt-3 mb-6"
                      : value.name == "Facturation"
                      ? "flex gap-3 items-center px-9 mb-2"
                      : "flex gap-3 items-center  px-9 "
                  }
                >
                  <div>
                    <span
                      className={
                        value.name == "Tableau De Bord" &&
                        location.pathname.split("/").length < 3
                          ? "text-blue-700 font-bold"
                          : "text-slate-600"
                      }
                    >
                      {value.icon}
                    </span>
                  </div>
                  <div>
                    <span
                      className={
                        value.name == "Tableau De Bord" &&
                        location.pathname.split("/").length < 3
                          ? "text-blue-600 text-sm font-bold"
                          : "text-slate-600 text-sm"
                      }
                    >
                      {value.name}
                    </span>
                  </div>
                </div>
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
