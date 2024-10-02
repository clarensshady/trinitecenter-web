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
import { AgentData } from "../statistique/agentData";
import RapportTable from "./tablerapportParAgent";
import { ClipLoader } from "react-spinners";
import { allBank } from "../../utils/mainActions";

interface IRapport {
  Agent: string;
  dateDebut: CalendarDate;
  dateDefin: CalendarDate;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISel {
  key: string;
  label: string;
}

export function RapportComp() {
  let defaultDate: CalendarDate = today(getLocalTimeZone());

  const [dateDebut, setDateDeDebut] = React.useState(defaultDate);
  const [dateDeFin, setDateDeFin] = React.useState(defaultDate);
  const [agent, setAgent] = React.useState<string>("");
  const [data, setData] = React.useState<IRapport>({} as IRapport);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<ISel[]>([]);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    setAgent(target.value);
  };

  const filterAgent = () => {
    setData({
      ...data,
      Agent: agent,
      dateDebut,
      dateDefin: dateDeFin,
      setLoading,
    });
  };

  React.useEffect(() => {
    const showAgent = async () => {
      try {
        const bank = await allBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showAgent();
  }, []);
  return (
    <div className='className="flex-1 w-full flex-col"'>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">
            Liste des rapports par agent
          </span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Rapports agent
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div className="mt-10">
        <Card>
          <CardBody>
            <div className="flex gap-5 px-2 py-4">
              <Select
                label="Agent"
                placeholder="Selectionner un agent"
                className="hidden sm:flex sm:max-w-xs"
                value={agent}
                onChange={onChangeSelect}
              >
                {bank.map((surcu) => (
                  <SelectItem key={surcu.key}>{surcu.label}</SelectItem>
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
                onClick={filterAgent}
              >
                {isLoading ? (
                  <ClipLoader
                    color="white"
                    loading={isLoading}
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Filtrer"
                )}
              </Button>
            </div>
            <div className="flex-1 mt-4 mx-2 overflow-auto whitespace-nowrap">
              <div className="flex-1 max-w-[400px] sm:max-w-full">
                <RapportTable {...data} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
