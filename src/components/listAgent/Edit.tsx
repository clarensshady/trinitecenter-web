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
import { CalendarDate, parseDate } from "@internationalized/date";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { sex } from "../newAgent/data";
import { paysdata } from "../newAgent/paysData";
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

export function EditAgent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [data, setData] = React.useState<INewAgent>({} as INewAgent);
  const [selectData, setSelectData] = React.useState<Iselect>({} as Iselect);
  const [birth, setBirth] = React.useState<CalendarDate>();
  const [blocked, setBlock] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<ISel[]>([]);
  const [surcu, setSurcu] = React.useState<ISel[]>([]);

  const params = useParams();

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

  const Ajouter = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "Vendeur", `${params.id}`), {
        ...data,
        dateDeNaissance: birth?.toString(),
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
    const showAgent = async () => {
      try {
        const Agent = await getDoc(doc(db, "Vendeur", `${params.id}`));
        if (Agent.exists()) {
          setSelectData({
            Pays: Agent.data().Pays,
            Genre: Agent.data().Genre,
            Surcussale: Agent.data().Surcussale,
            Bank: Agent.data().Bank,
          });
          setData({
            Pseudoname: Agent.data().Pseudoname,
            NumeroTelephone: Agent.data().NumeroTelephone,
            Prenom: Agent.data().Prenom,
            NomDeFamille: Agent.data().NomDeFamille,
            Ville: Agent.data().Ville,
            AddresseComplete: Agent.data().AddresseComplet,
            MotDePasse: Agent.data().MotDePasse,
            AndroidId: Agent.data().AndroidId,
            Commission: Agent.data().Commision,
          });
          setBirth(parseDate(Agent.data().dateDeNaissance));
          setBlock(Agent.data().block == true ? true : false);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showAgent();
  }, []);

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Vendeur Modifier avec success", {
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
    const showBank = async () => {
      try {
        const bank = await someBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    const showSurcu = async () => {
      try {
        const surc = await someSurcussale();
        setSurcu(surc);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showSurcu();
    showBank();
  }, []);

  return (
    <div className="flex-1 w-full  py-8 px-10 flex-col">
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
              Listes
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Editer Agent
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <ToastContainer />
      <div className="mt-10 w-[580px]">
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
                      value={data.Pseudoname}
                      type="text"
                      label="Pseudoname"
                      placeholder="Entrer votre Pseudoname"
                      className="w-xs"
                      defaultValue={data.Pseudoname}
                    />
                    <Input
                      name="NumeroTelephone"
                      onChange={onChange}
                      isRequired
                      value={data.NumeroTelephone}
                      type="text"
                      label="Numero de telephone"
                      placeholder="Entrer vote Numero de Telephone"
                      className="w-xs"
                      defaultValue={data.NumeroTelephone}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="Prenom"
                      onChange={onChange}
                      isRequired
                      value={data.Prenom}
                      type="text"
                      label="Prénom"
                      placeholder="Entrer votre Prénom"
                      className="w-xs"
                      defaultValue={data.Prenom}
                    />
                    <Input
                      name="NomDeFamille"
                      isRequired
                      onChange={onChange}
                      value={data.NomDeFamille}
                      type="text"
                      label="Nom de famille"
                      placeholder="Entrer votre Nom de famille"
                      className="w-xs"
                      defaultValue={data.NomDeFamille}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      name="Genre"
                      onChange={onChangeSelect}
                      label="Genre"
                      value={selectData.Genre}
                      placeholder="Selectioner un Sex"
                      className="max-w-xs"
                      defaultSelectedKeys={[
                        `${selectData.Genre?.toLowerCase()}`,
                      ]}
                    >
                      {sex.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <DatePicker
                      onChange={onDateChange}
                      value={birth}
                      defaultValue={birth}
                      label="Date de Naissance"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="Commission"
                      onChange={onChange}
                      value={data.Commission}
                      type="text"
                      label="Commission"
                      placeholder="Entrer le Pourcentage"
                      className="w-xs"
                      defaultValue={data.Commission}
                    />
                    <Input
                      isRequired
                      onChange={onChange}
                      name="AndroidId"
                      type="text"
                      value={data.AndroidId}
                      label="AndroidId"
                      placeholder="Entrer l'AndroidId de la machine"
                      className="w-xs"
                      defaultValue={data.AndroidId}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      isRequired
                      name="Pays"
                      onChange={onChangeSelect}
                      label="Pays"
                      value={selectData.Pays}
                      placeholder="Selectioner un pays"
                      className="max-w-xs"
                      defaultSelectedKeys={[
                        `${selectData.Pays?.toLowerCase()}`,
                      ]}
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
                      value={data.Ville}
                      placeholder="Entrer la Ville"
                      defaultValue={data.Ville}
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
                      value={selectData.Surcussale}
                      defaultSelectedKeys={[
                        `${selectData.Surcussale?.toLowerCase()}`,
                      ]}
                    >
                      {surcu.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      name="AddresseComplet"
                      onChange={onChange}
                      isRequired
                      type="text"
                      value={data.AddresseComplete}
                      defaultValue={data.AddresseComplete}
                      label="Addresse complet"
                      placeholder="Entrer votre Address Complet"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="MotDePasse"
                      onChange={onChange}
                      value={data.MotDePasse}
                      isRequired
                      label="Mot de passe"
                      placeholder="Entrer votre mot de passe"
                      type={isVisible ? "text" : "password"}
                      defaultValue={data.MotDePasse}
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
                      // checked={blocked}
                      // defaultChecked={true}
                      isSelected={blocked}
                      onValueChange={setBlock}
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
                        "Modifier L'agent"
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
