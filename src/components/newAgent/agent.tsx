import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { INewAgent } from "../../types/agent";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { paysdata } from "./paysData";
import { sex } from "./data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { someBank, someSurcussale } from "../../utils/mainActions";

interface Iselect {
  Pays: string;
  Genre: string;
  Surcussale: string;
  Bank: string;
}

interface ISel {
  key: string;
  label: string;
}

export function Agent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [data, setData] = React.useState<INewAgent>({} as INewAgent);
  const [selectData, setSelectData] = React.useState<Iselect>({} as Iselect);
  const [birth, setBirth] = React.useState<CalendarDate>();
  const [blocked, setBlock] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [surcussale, setSurcussale] = React.useState<ISel[]>([]);
  const [bank, setBank] = React.useState<ISel[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };
  const onDateChange = (value: CalendarDate) => {
    setBirth(value);
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    setSelectData({ ...selectData, [name]: event.target.value });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onValueCheck = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const NAcol = collection(db, "Vendeur");

  const Ajouter = async () => {
    try {
      setLoading(true);
      console.log("let us go");
      await addDoc(NAcol, {
        ...data,
        dateDeNaissance: `${birth?.toString()}`,
        ...selectData,
        block: blocked,
      });
      setLoading(false);
      setFinish(true);
    } catch (error) {
      setFinish(false);
      setLoading(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Vendeur Créer avec success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        type: "success",
      });
      setFinish(false);
    }
  }, [isFinished]);

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
    showSurcu();
    showBank();
  }, []);

  return (
    <div className="flex-1 w-full flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Créer un nouvel agent</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Agent
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Nouvel Agent
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <ToastContainer />
      <div className="mt-10 w-full sm:w-[580px] ">
        <Card className="">
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4">
                    <Input
                      name="Pseudoname"
                      onChange={onChange}
                      isRequired
                      type="text"
                      label="Pseudoname"
                      placeholder="Entrer votre Pseudoname"
                      className="w-xs"
                    />
                    <Input
                      name="NumeroTelephone"
                      onChange={onChange}
                      isRequired
                      type="text"
                      label="Numero de telephone"
                      placeholder="Entrer vote Numero de Telephone"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="Prenom"
                      onChange={onChange}
                      isRequired
                      type="text"
                      label="Prénom"
                      placeholder="Entrer votre Prénom"
                      className="w-xs"
                    />
                    <Input
                      name="NomDeFamille"
                      isRequired
                      onChange={onChange}
                      type="text"
                      label="Nom de famille"
                      placeholder="Entrer votre Nom de famille"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      name="Genre"
                      onChange={onChangeSelect}
                      label="Genre"
                      placeholder="Selectioner un Sex"
                      className="max-w-xs"
                    >
                      {sex.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <DatePicker
                      onChange={onDateChange}
                      defaultValue={today(getLocalTimeZone())}
                      label="Date de Naissance"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="Commission"
                      onChange={onChange}
                      type="text"
                      label="Commission"
                      placeholder="Entrer le Pourcentage"
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      onChange={onChange}
                      name="AndroidId"
                      type="text"
                      label="AndroidId"
                      placeholder="Entrer l'AndroidId de la machine"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      isRequired
                      name="Pays"
                      onChange={onChangeSelect}
                      label="Pays"
                      placeholder="Selectioner un pays"
                      className="max-w-xs"
                    >
                      {paysdata.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      isRequired
                      name="Ville"
                      onChange={onChange}
                      type="text"
                      label="Ville"
                      placeholder="Entrer la Ville"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      label="Surcussale"
                      name="Surcussale"
                      onChange={onChangeSelect}
                      placeholder="Entrer le Surcussale"
                      className="max-w-xs"
                    >
                      {surcussale.map((s) => (
                        <SelectItem className="capitalize" key={s.key}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      name="AddresseComplet"
                      onChange={onChange}
                      isRequired
                      type="text"
                      label="Addresse complet"
                      placeholder="Entrer votre Address Complet"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="MotDePasse"
                      onChange={onChange}
                      isRequired
                      label="Mot de passe"
                      placeholder="Entrer votre mot de passe"
                      type={isVisible ? "text" : "password"}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <FontAwesomeIcon icon={faEye} />
                          ) : (
                            <FontAwesomeIcon icon={faEyeSlash} />
                          )}
                        </button>
                      }
                    />
                    <Select
                      name="Bank"
                      onChange={onChangeSelect}
                      label="Bank"
                      placeholder="Selectioner un Bank"
                      className="max-w-xs"
                    >
                      {bank.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex justify-start gap-5">
                    <Switch
                      color="success"
                      checked={blocked}
                      onValueChange={onValueCheck}
                      classNames={{
                        /* base: cn(
                          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary"
                        ), */
                        wrapper: "p-0 h-4 overflow-visible",
                        thumb: cn(
                          "w-6 h-6 border-2 shadow-lg",
                          "group-data-[hover=true]:border-success",
                          //selected
                          "group-data-[selected=true]:ml-6",
                          // pressed
                          "group-data-[pressed=true]:w-7",
                          "group-data-[selected]:group-data-[pressed]:ml-4"
                        ),
                      }}
                    >
                      <span>Block</span>
                    </Switch>
                  </div>
                  <div className="self-end">
                    <Button
                      variant="shadow"
                      className="text-sm"
                      color="primary"
                      onClick={Ajouter}
                    >
                      {isLoading ? (
                        <div>
                          <ClipLoader
                            color="white"
                            loading={isLoading}
                            size={16}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      ) : (
                        "Créer L'agent"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
