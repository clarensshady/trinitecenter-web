import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import Georgia from "../assets/GeorgiaL.png";
import NewYork from "../assets/new_york.png";
import Florida from "../assets/Florida.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import TableLotGagnant from "./gagnant/gagnant";
import { balanceLogics, ficheGagnant } from "./ventes/actions";
import { TirageChart } from "../utils/tirageChart";
import { TirageHistorique } from "../utils/tirageHistorique";
import { GainHistorique } from "../utils/gainHistorique";
import { RapportHistoriques } from "../utils/rapportHistorique";
import { OptionHistorique } from "../utils/optionHistorique";
import { getLocalTimeZone, isToday, parseDate } from "@internationalized/date";

interface IList {
  tirage: string;
  listBoule: string;
  dateCreated: string;
}

interface IStat {
  fiche: number;
  vente: number;
  superviseur: number;
  agent: number;
  agentInactive: number;
  agentActive: number;
  commissions: number;
  aPaye: number;
  balance: number;
  ficheGagnants: number;
}

export function Content() {
  const [boules, setBoule] = React.useState<IList[]>([]);
  const [gagnant, setGagnant] = React.useState<string>("");
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [stats, setStat] = React.useState<IStat>({
    fiche: 0,
    vente: 0,
    superviseur: 0,
    agent: 0,
    agentInactive: 0,
    agentActive: 0,
    commissions: 0,
    aPaye: 0,
    balance: 0,
    ficheGagnants: 0,
  });

  const tirageRef = collection(db, "lotGagnants");

  React.useEffect(() => {
    const allTirages = async () => {
      try {
        // setLoading(true);
        const tirages = await getDocs(tirageRef);
        if (tirages.empty) {
          console.log("error is empty");
          // setLoading(false);
        }
        const numbers = tirages.docs.map((doc) => {
          return {
            tirage: doc.data().Tirage,
            dateCreated: doc.data().dateCreated,
            listBoule: `${doc.data().Lotto31eLot}-${doc.data().SecondLot}-${
              doc.data().ThirdLot
            }`,
          } as IList;
        });

        // setLoading(false);
        setBoule(numbers);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    const showStatistics = async () => {
      try {
        const data = await balanceLogics();
        setStat(data);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    allTirages();
    showStatistics();

    const showFicheGagnant = async () => {
      try {
        await ficheGagnant(setGagnant);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showFicheGagnant();
  }, []);

  console.log("montant is :", gagnant);

  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 py-7 sm:py-10">
        <div className="flex flex-wrap gap-4 ">
          <div className="flex-1">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <Avatar
                      src={NewYork}
                      className="w-[120px] h-[120px] text-medium"
                    />
                  </div>
                  <div>
                    <div className="space-y-2 ">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "new york midi"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujourd'hui Midi"
                            : "Hier Midi"}
                        </span>
                      </div>

                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage == "new york midi"
                              )
                              .map((b) => b.listBoule) //////////////////////////////////////////////////////////////////////////////
                              [0]?.split("-")
                              .map((bou, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {bou}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                    {/* for night */}
                    <div className="space-y-2 ">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "new york soir"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujoud'hui Soir"
                            : "Hier Soir"}
                        </span>
                      </div>

                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage == "new york soir"
                              )
                              .map((b) => b.listBoule) //////////////////////////////////////////////////////////////////////////////
                              [0]?.split("-") ////////////////////////////
                              .map((bou, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {bou}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <Avatar
                      src={Florida}
                      className="w-[120px] h-[120px] text-medium"
                    />
                  </div>
                  <div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "florida midi"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujourd'hui Midi"
                            : "Hier Midi"}
                        </span>
                      </div>
                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage === "florida midi"
                              )
                              .map((lb) => lb.listBoule)[0]
                              ?.split("-")
                              .map((b, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {b}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "florida soir"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujourd'hui soir"
                            : "Hier soir"}
                        </span>
                      </div>
                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage === "florida soir"
                              )
                              .map((lb) => lb.listBoule)[0]
                              ?.split("-")
                              .map((b, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {b}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <Avatar
                      src={Georgia}
                      className="w-[120px] h-[120px] text-medium"
                    />
                  </div>
                  <div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "georgia midi"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujourd'hui Midi"
                            : "Hier Midi"}
                        </span>
                      </div>
                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage === "georgia midi"
                              )
                              .map((lb) => lb.listBoule)[0]
                              ?.split("-")
                              .map((b, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {b}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div>
                        <span className="font-bold text-sm">
                          {boules.length > 1 &&
                          isToday(
                            parseDate(
                              `${
                                boules
                                  .filter(
                                    (boule) => boule.tirage == "georgia soir"
                                  )
                                  .map((b) => b.dateCreated)[0]
                              }`
                            ),
                            getLocalTimeZone()
                          )
                            ? "Aujourd'hui Soir"
                            : "Hier Soir"}
                        </span>
                      </div>
                      <div className="flex gap-[0.17rem]">
                        {boules.length > 1
                          ? boules
                              .filter(
                                (boule) => boule.tirage === "georgia soir"
                              )
                              .map((lb) => lb.listBoule)[0]
                              ?.split("-")
                              .map((b, index) => {
                                const colorClass =
                                  index == 0
                                    ? "px-3 rounded-2xl bg-blue-600"
                                    : index == 1
                                    ? "px-3 rounded-2xl bg-orange-400"
                                    : "px-3 rounded-2xl bg-blue-500";
                                return (
                                  <div key={index}>
                                    <div className={`${colorClass}`}>
                                      <span className="text-white text-sm">
                                        {b}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap w-full gap-4">
          <div className="flex-1 min-w-[170px]">
            <Card shadow="none" className="bg-red-500">
              <CardBody>
                <div className="flex flex-col gap-1 py-3">
                  <div>
                    <span className="text-sm text-white">
                      Total Ventes ( {stats.vente} )
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-white">
                      {stats.vente}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1 min-w-[170px]">
            <Card shadow="none" className="bg-blue-600">
              <CardBody>
                <div className="flex flex-col gap-1 py-3">
                  <div>
                    <span className="text-sm text-white">Montant a paye</span>
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-white">
                      {gagnant}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1 min-w-[170px]">
            <Card shadow="none" className="bg-purple-600">
              <CardBody>
                <div className="flex flex-col gap-1 py-3">
                  <div>
                    <span className="text-sm text-white">Commissions</span>
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-white">0</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1 min-w-[170px]">
            <Card shadow="none" className="bg-teal-500">
              <CardBody>
                <div className="flex flex-col gap-1 py-3">
                  <div>
                    <span className="text-sm text-white">
                      Agent Actifs | Inactifs
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-white">
                      {stats.agentActive} | {stats.agentInactive}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex-1 min-w-[170px]">
            <Card shadow="none" className="bg-blue-500">
              <CardBody>
                <div className="flex flex-col gap-1 py-3">
                  <div>
                    <span className="text-sm text-white">Total Balance</span>
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-red-400">
                      {stats.vente - parseInt(gagnant)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Button
            color="primary"
            variant="shadow"
            className="text-lg font-monserrat px-5 py-5 rounded-lg"
          >
            Rapport Journalier
          </Button>
        </div>
        <div className="flex flex-col w-full bg-blue-400 gap-5 pb-4 mt-4 rounded-2xl">
          <div className="pl-5 pt-5">
            <span className="text-xl text-white">
              Lot Gagnant pour aujourd'hui
            </span>
          </div>
          <div className="w-full text-nowrap overflow-x-auto">
            <div className="max-w-[300px] sm:max-w-full flex-1">
              <TableLotGagnant />
            </div>
          </div>
        </div>
        {/* first report */}
        <div className="w-full flex-wrap flex gap-4 mt-6">
          <div className="flex-1 min-w-[340px]">
            <Accordion fullWidth={true} isCompact variant="splitted">
              <AccordionItem
                disableIndicatorAnimation
                key="1"
                aria-label="Accordion 1"
                title={
                  <div>
                    <div>
                      <span className="font-bold text-lg">
                        Fiches historiques
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 text-sm">
                        nombres de fiches par date
                      </span>
                    </div>
                  </div>
                }
                indicator={
                  <Button
                    startContent={<FontAwesomeIcon icon={faRotateRight} />}
                    color="primary"
                    size="md"
                    className="text-md"
                    variant="shadow"
                  >
                    Refresh
                  </Button>
                }
              >
                <TirageChart />
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex-1 min-w-[340px]">
            <Accordion isCompact variant="splitted">
              <AccordionItem
                disableIndicatorAnimation
                key="1"
                aria-label="Accordion 1"
                title={
                  <div>
                    <div>
                      <span className="font-bold text-lg">
                        Tirages historiques
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 text-sm">
                        montant de fiches par tirages
                      </span>
                    </div>
                  </div>
                }
                indicator={
                  <Button
                    startContent={<FontAwesomeIcon icon={faRotateRight} />}
                    color="primary"
                    size="md"
                    className="text-md"
                    variant="shadow"
                  >
                    Refresh
                  </Button>
                }
              >
                <TirageHistorique />
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* second report */}
        <div className="w-full flex flex-wrap gap-4 mt-6">
          <div className="flex-1 min-w-[340px]">
            <Accordion isCompact variant="splitted">
              <AccordionItem
                disableIndicatorAnimation
                key="1"
                aria-label="Accordion 1"
                title={
                  <div>
                    <div>
                      <span className="font-bold text-lg">
                        Historiques de vos gains
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 text-sm">
                        toutes vos gains de ce mois
                      </span>
                    </div>
                  </div>
                }
                indicator={
                  <Button
                    startContent={<FontAwesomeIcon icon={faRotateRight} />}
                    color="primary"
                    size="md"
                    className="text-md"
                    variant="shadow"
                  >
                    Refresh
                  </Button>
                }
              >
                <GainHistorique />
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex-1 min-w-[340px]">
            <Accordion isCompact variant="splitted">
              <AccordionItem
                disableIndicatorAnimation
                key="1"
                aria-label="Accordion 1"
                title={
                  <div>
                    <div>
                      <span className="font-bold text-lg">
                        Rapports de chaque mois
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 text-sm">
                        toutes vos montants, gains et pertes de l'annee
                      </span>
                    </div>
                  </div>
                }
                indicator={
                  <Button
                    startContent={<FontAwesomeIcon icon={faRotateRight} />}
                    color="primary"
                    size="md"
                    className="text-md"
                    variant="shadow"
                  >
                    Refresh
                  </Button>
                }
              >
                <RapportHistoriques />
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* third report */}
        <div className="w-full flex flex-wrap gap-4 mt-6 md:mt-4">
          <div className="flex-1 min-w-[340px]">
            <Accordion isCompact variant="splitted">
              <AccordionItem
                disableIndicatorAnimation
                key="1"
                aria-label="Accordion 1"
                title={
                  <div>
                    <div>
                      <span className="font-bold text-lg">
                        Options historiques
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 text-sm">
                        toutes les montants par option
                      </span>
                    </div>
                  </div>
                }
                indicator={
                  <Button
                    startContent={<FontAwesomeIcon icon={faRotateRight} />}
                    color="primary"
                    size="md"
                    className="text-md"
                    variant="shadow"
                  >
                    Refresh
                  </Button>
                }
              >
                <OptionHistorique />
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex-1 min-w-[340px]"></div>
        </div>
      </div>
    </div>
  );
}
