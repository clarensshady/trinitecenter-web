import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeNavbar from "../components/homeNavbar";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
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
import { Configuration } from "../components/configurations";
import { VendeurAc } from "../components/vendeurAc";
import { SurveillanceAc } from "../components/surveillanceAc";
import { Rapport } from "../components/rapport";
import { Account } from "../components/account";
import React from "react";
import { Outlet, useNavigate, NavigateFunction } from "react-router-dom";
import { SurcussaleAc } from "../components/surcussale";
import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import useLotteryStore from "../store/GlobalData";
import { useMediaQuery } from "@reactuses/core";

export interface IDashboardProps {}
interface Iselect {
  icon: JSX.Element;
  name: string;
  isDown: boolean;
  content?: JSX.Element;
}

interface Inav {
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

interface IuserInfo {
  Pseudoname: string;
  Prenom: string;
}

export default function Dashboard() {
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
      icon: (
        <FontAwesomeIcon className="text-slate-600" icon={faBusinessTime} />
      ),
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
  const [photo, setPhoto] = React.useState<string>("");
  const [info, setInfo] = React.useState<IuserInfo>({} as IuserInfo);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const { userInfo } = useLotteryStore((state) => ({ userInfo: state.User }));

  const navigate: NavigateFunction = useNavigate();

  const [SIDE_BAR_WIDTH, setSideBarWidth] = React.useState<number>(275);
  const navbar: Inav = {
    setWidth: setSideBarWidth,
  };

  React.useEffect(() => {
    const userProfile = async () => {
      const docRef = doc(db, "Administrator", "RfpQV4TWQqLbEV5BroKV");
      try {
        const user = await getDoc(docRef);
        if (user.exists()) {
          setPhoto(`${user.data().photoUrl}`);
          setInfo({
            Pseudoname: `${user.data().Pseudoname}`,
            Prenom: `${user.data().Prenom}`,
          });
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    userProfile();
    console.log(menuOpen);
  }, []);

  const isTrue = useMediaQuery("(max-width: 790px)");

  return (
    <>
      <div className="flex w-full h-100vh">
        <div
          style={{ width: isTrue ? `${0}px` : `${SIDE_BAR_WIDTH}px` }}
          className=" hidden md:flex sm:flex-col border-slate-200 border-r-1 border-solid fixed z-20"
        >
          {/* start */}
          <div className="max-h-[100vh] hover:whitespace-nowrap hover:overflow-y-auto">
            <div className="flex w-full justify-center mt-6">
              <Badge content="Admin" color="danger" placement="top-left">
                <Avatar
                  className="w-20 h-20 text-large"
                  radius="full"
                  isBordered
                  src={
                    userInfo.Role === "Superviseur" ? photo : userInfo.PhotoUrl
                  }
                />
              </Badge>
            </div>
            <div className="flex w-full justify-center mt-3">
              <div className="flex flex-col items-center ">
                <div>
                  {SIDE_BAR_WIDTH == 120 ? (
                    ""
                  ) : (
                    <span className="font-medium text-1xl">
                      {info.Pseudoname}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400">
                    {SIDE_BAR_WIDTH == 120
                      ? ""
                      : `@${info.Prenom}#administrator`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center mt-7 text-center">
              <span className="font-bold text-2xl font-monserrat">
                Trinite center
              </span>
            </div>
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
                              SIDE_BAR_WIDTH == 120 ? (
                                ""
                              ) : (
                                <span className="text-slate-600 text-sm">
                                  {value.name}
                                </span>
                              )
                            }
                          >
                            {value.name == "Configuration" ? (
                              <Configuration />
                            ) : value.name == "Vendeur" ? (
                              <VendeurAc />
                            ) : value.name == "Surveillance" ? (
                              <SurveillanceAc setMenuOpen={setMenuOpen} />
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
                              : value.name == "Tableau De Bord"
                              ? "flex gap-3 items-center  px-8 py-3 "
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
                              {SIDE_BAR_WIDTH == 120 ? "" : value.name}
                            </span>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            {/* download */}
            {SIDE_BAR_WIDTH == 120 ? (
              ""
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 mb-8 mt-8">
                <div className="w-[170px] text-wrap text-center">
                  <span className="text-sm text-slate-400">
                    Vous avez besoin de l'application pour POS ? Veuillez le
                    télécharger sur le lien ci-dessous
                  </span>
                </div>
                <div>
                  <Button
                    variant="shadow"
                    className="font-semibold"
                    color="primary"
                    size="md"
                  >
                    <a
                      href="../assets/Florida.jpeg"
                      download={"Florida.jpeg"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Télécharger
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ marginLeft: isTrue ? 0 : SIDE_BAR_WIDTH }}
          className="flex-1"
        >
          <div className="w-full">
            <HomeNavbar {...navbar} />

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
