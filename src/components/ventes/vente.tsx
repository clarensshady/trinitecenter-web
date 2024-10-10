import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  CalendarDate,
  Card,
  CardBody,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import __ from "lodash";
import { allRapport, rapportParAgentVente } from "./actions";
import { allBank, allTirage } from "../../utils/mainActions";
import { ClipLoader } from "react-spinners";

interface IStat {
  fiche: number;
  montant: number;
  pertes: number;
  gains: number;
}

interface IData {
  Tirage: string;
  Agent: string;
}

interface ISel {
  key: string;
  label: string;
}

export function VenteComp() {
  let defaultDate: CalendarDate = today(getLocalTimeZone());

  const [dateDebut, setDateDeDebut] = React.useState(defaultDate);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dateDeFin, setDateDeFin] = React.useState(defaultDate);
  const [stats, setStat] = React.useState<IStat>({
    fiche: 0,
    montant: 0,
    pertes: 0,
    gains: 0,
  });
  const [data, setData] = React.useState<IData>({} as IData);
  const [tirage, setTirage] = React.useState<ISel[]>([]);
  const [bank, setBank] = React.useState<ISel[]>([]);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const showRapport = React.useCallback(() => {
    const showRapport = async () => {
      try {
        await rapportParAgentVente(
          `${data.Agent}`,
          `${data.Tirage}`,
          dateDebut,
          dateDeFin,
          setStat,
          setLoading
        );
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showRapport();
  }, [data, dateDebut, dateDeFin]);

  React.useEffect(() => {
    const showTirage = async () => {
      try {
        const tira = await allTirage();
        setTirage(tira);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    const showBank = async () => {
      try {
        const bank = await allBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
    showBank();
    const showStatistics = async () => {
      try {
        await allRapport(setStat);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showStatistics();
  }, []);

  return (
    <div className='className="flex-1 w-full flex-col"'>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Liste des rapports</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Rapports
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div className="mt-10">
        <Card>
          <CardBody>
            <div className="flex gap-3 px-2 py-4">
              <Select
                label="Tirage"
                name="Tirage"
                value={data.Tirage}
                onChange={onChangeSelect}
                placeholder="Selectionner un Tirage"
                className="hidden md:max-w-xs md:flex"
              >
                {tirage.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
              <Select
                label="Agent"
                placeholder="Selectionner un Agent"
                className="hidden md:flex md:max-w-xs"
                name="Agent"
                onChange={onChangeSelect}
              >
                {bank.map((ba) => (
                  <SelectItem className="capitalize" key={ba.key}>
                    {ba.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex-1">
                <DatePicker
                  defaultValue={defaultDate}
                  value={dateDebut}
                  onChange={setDateDeDebut}
                  label="Date de début"
                  className="w-xs"
                />
              </div>
              <div className="flex-1">
                <DatePicker
                  defaultValue={defaultDate}
                  value={dateDeFin}
                  onChange={setDateDeFin}
                  label="Date de fin"
                  className="w-xs"
                />
              </div>
              <Button
                variant="shadow"
                className="py-7 text-lg rounded-md"
                color="primary"
                onPress={showRapport}
              >
                {loading ? (
                  <ClipLoader
                    color="white"
                    loading={loading}
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Filtrer"
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-6">
        <div className="flex-1 bg-blue-400 rounded-tl-3xl rounded-tr-3xl">
          <div className="flex-1 px-6 py-6">
            <span className="text-xl font-meduim text-white">Agent</span>
          </div>
          <div className="bg-slate-100 rounded-tl-2xl rounded-tr-2xl">
            <div className="flex w-full justify-between gap-2 px-5 py-3">
              {Array.from(
                [
                  "Agent",
                  "Tfiches",
                  "Tfiches gagnants",
                  "Vente",
                  "A payé",
                  "%Agent",
                  "balance sans %agent",
                  "balance avec agent",
                ],
                (value, index) => {
                  return (
                    <div key={index}>
                      <span className="font-bold text-slate-500 text-[0.9rem]">
                        {value}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Card>
          <CardBody>
            <div className="flex justify-between">
              <div className="flex flex-col gap-5">
                {Array.from(
                  ["Tfiche", "Tfiche gagnants", "vente", "A paye"],
                  (value, index) => {
                    return (
                      <div key={index}>
                        <span className="text-[0.9rem]">
                          {value}:{" "}
                          {value == "Tfiche"
                            ? stats.fiche
                            : value == "Tfiche gagnants"
                            ? stats.gains
                            : value == "vente"
                            ? stats.montant
                            : stats.pertes}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-col gap-5">
                {Array.from(
                  ["%Agent", "balance sans %agent", "balance avec agent"],
                  (value, index) => {
                    return (
                      <div key={index}>
                        {value && (
                          <span className="text-[0.9rem]">
                            {value}:{" "}
                            {value == "%Agent"
                              ? 0
                              : value == "balance avec agent"
                              ? 0
                              : 0}
                          </span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-col gap-5">
                {Array.from(
                  [
                    "%Superviseur",
                    "balance sans %superviseur",
                    "balance avec superviseur",
                  ],
                  (value, index) => {
                    return (
                      <div key={index}>
                        <span className="text-[0.9rem]">
                          {value}:{" "}
                          {value == "%Superviseur"
                            ? 0
                            : value == "balance avec superviseur"
                            ? 0
                            : 0}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
