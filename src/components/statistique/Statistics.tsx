import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  DatePicker,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import {
  getLocalTimeZone,
  today,
  CalendarDate,
  Time,
  ZonedDateTime,
  now,
  toTime,
} from "@internationalized/date";
import TableStatistics from "./tableStatistics";
import { ClockCircleLinearIcon } from "../../utils/clockCircleIcon";
import { ClipLoader } from "react-spinners";
import { someSurcussale, someBank, someTirage } from "../../utils/mainActions";

interface IData {
  Tirage: string;
  Agent: string;
  Surcussale: string;
  DateDuFiche: CalendarDate;
  HeureDuFiche: Time;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISelect {
  Tirage: string;
  Surcussale: string;
  Agent: string;
}

interface ISel {
  key: string;
  label: string;
}

export function StatisticsComp() {
  let defaultDate: CalendarDate = today(getLocalTimeZone());
  const time: ZonedDateTime = now(getLocalTimeZone());

  const [dateDebut, setDateDeDebut] = React.useState<CalendarDate>(defaultDate);
  const [data, setData] = React.useState<IData>({} as IData);
  const [ticketTime, setTicketTime] = React.useState<Time>(toTime(time));
  const [selectData, setSelectData] = React.useState<ISelect>({} as ISelect);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [surcussale, setSurcussale] = React.useState<ISel[]>([]);
  const [bank, setBank] = React.useState<ISel[]>([]);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const onChangeOpenTime = (value: Time) => {
    setTicketTime(value);
  };

  const onSelectData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData({
      ...selectData,
      [event.target.name]: event.target.value,
    });
  };

  const refreshMethod = () => {
    setData({
      ...data,
      Tirage: selectData.Tirage,
      Agent: selectData.Agent,
      Surcussale: selectData.Surcussale,
      DateDuFiche: dateDebut,
      HeureDuFiche: ticketTime,
      setLoading,
    });
  };

  React.useEffect(() => {
    const showSurcu = async () => {
      try {
        const surcu = await someSurcussale();
        setSurcussale(surcu);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    const showBank = async () => {
      try {
        const bank = await someBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    const showTirage = async () => {
      try {
        const tira = await someTirage();
        setTirage(tira);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showSurcu();
    showBank();
    showTirage();
  }, []);

  // console.log("surcubank", surcussale, bank);

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Statistiques des Fiches</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Statistics
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 mt-14 shadow-xl rounded-2xl ">
        <div className="w-full flex-1 border-solid border-slate-100 border-1 rounded-2xl ">
          <div className="mx-5 my-4 flex gap-4">
            <Select
              label="Tirage"
              defaultSelectedKeys={["tout"]}
              name="Tirage"
              placeholder="Tirage"
              onChange={onSelectData}
              className="hidden md:max-w-xs md:flex"
              value={selectData.Tirage}
            >
              {tirage.map((s) => (
                <SelectItem key={s.key}>{s.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="Surcussale"
              className="hidden md:max-w-xs md:flex "
              name="Surcussale"
              placeholder="Surcussale"
              value={selectData.Surcussale}
              onChange={onSelectData}
            >
              {surcussale.map((s) => (
                <SelectItem className="capitalize" key={s.key}>
                  {s.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Agent"
              className="hidden md:max-w-xs md:flex"
              onChange={onSelectData}
              placeholder="Entrer l'agent"
              name="Agent"
              value={selectData.Agent}
            >
              {bank.map((s) => (
                <SelectItem key={s.key}>{s.label}</SelectItem>
              ))}
            </Select>
            <div className="flex">
              <DatePicker
                defaultValue={defaultDate}
                value={dateDebut}
                onChange={setDateDeDebut}
                label="Date du fiche"
                className="w-xs"
              />
            </div>
            <div className="flex">
              <TimeInput
                hourCycle={24}
                granularity="second"
                label="Heure du fiche"
                onChange={onChangeOpenTime}
                defaultValue={new Time(time.hour, time.minute, time.second)}
                endContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <Button
              variant="shadow"
              className="py-7 text-lg rounded-md hidden sm:flex"
              color="primary"
              onClick={refreshMethod}
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
          {/* for the table */}
          <div className="overflow-auto whitespace-nowrap w-[98%] md:w-full md:flex-1 mt-7 mx-2">
            <div className="max-w-[300px] md:max-w-full md:w-full md:flex-1">
              <TableStatistics {...data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
