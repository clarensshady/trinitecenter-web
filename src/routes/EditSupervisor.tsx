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
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { IForm } from "../types/superviseur";
import { Genre } from "../components/supervisor/genre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { paysdata } from "../components/newAgent/paysData";
import { db } from "../config";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface Iselect {
  Genre: string;
  Pays: string;
}

export function EditSuperviseur() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [block, setBlock] = React.useState<boolean>(false);

  const [birth, setBirth] = React.useState<CalendarDate>(
    today(getLocalTimeZone())
  );

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [data, setData] = React.useState<IForm>({} as IForm);
  const [selectData, setSelectData] = React.useState<Iselect>({} as Iselect);

  const params = useParams();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const onChangeSelect = (value: CalendarDate) => {
    setBirth(value);
  };
  const onChangeSel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    setSelectData({ ...selectData, [name]: event.target.value });
  };

  const EditSuperviseur = async () => {
    try {
      setLoading(true);
      const superRef = doc(db, "superviseur", `${params.id}`);
      await updateDoc(superRef, {
        ...data,
        Genre: selectData.Genre,
        Pays: selectData.Pays,
        block,
        dateDeNaissance: birth.toString(),
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
      toast.success("Superviseur Modifier avec success", {
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
    const superviseurRef = doc(db, "superviseur", `${params.id}`);
    const showSuperviseurs = async () => {
      try {
        const supervi = await getDoc(superviseurRef);
        if (supervi.exists()) {
          setSelectData({
            Genre: supervi.data().Genre,
            Pays: supervi.data().Pays,
          });

          const allData = supervi.data() as IForm;
          setData(allData);
          setBlock(supervi.data().block == true ? true : false);
          setBirth(parseDate(`${supervi.data().dateDeNaissance}`));
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showSuperviseurs();
  }, []);

  return (
    <div className="flex-1 w-full flex-col px-10 py-10 ">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Modifier Superviseur</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Superviseurs
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Listes
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Modifier
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <ToastContainer />
      </div>
      <div className="mt-10 w-[530px]">
        <Card className="">
          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Input
                  autoFocus
                  label="Pseudoname"
                  placeholder="Entrer le Pseudoname"
                  name="Pseudoname"
                  onChange={onChange}
                  value={data.Pseudoname}
                  defaultValue={data.Pseudoname}
                />
                <Input
                  autoFocus
                  value={data.NumeroTelephone}
                  label="Numéro de téléphone"
                  placeholder="Entrer le Numéro de téléphone"
                  name="NumeroTelephone"
                  onChange={onChange}
                  defaultValue={data.NumeroTelephone}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  value={data.Prenom}
                  autoFocus
                  label="Prénom"
                  placeholder="Entrer le Prénom"
                  name="Prenom"
                  defaultValue={data.Prenom}
                  onChange={onChange}
                />
                <Input
                  autoFocus
                  value={data.NomDeFamille}
                  label="Nom de famille"
                  placeholder="Entrer le Nom de Famille"
                  name="NomDeFamille"
                  defaultValue={data.NomDeFamille}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  autoFocus
                  value={data.Commission}
                  label="Commission"
                  placeholder="Entrer le Commission"
                  name="Commission"
                  defaultValue={data.Commission}
                  onChange={onChange}
                />
                <Input
                  autoFocus
                  label="Email"
                  value={data.Email}
                  isRequired
                  placeholder="Entrer Votre Email"
                  defaultValue={data.Email}
                  onChange={onChange}
                  name="Email"
                />
              </div>
              <div className="flex gap-3">
                <Select
                  label="Genre"
                  value={selectData.Genre}
                  defaultSelectedKeys={[selectData.Genre]}
                  className="max-w-xs"
                  name="Genre"
                  placeholder="Genre"
                  onChange={onChangeSel}
                >
                  {Genre.map((s) => (
                    <SelectItem key={s.key}>{s.label}</SelectItem>
                  ))}
                </Select>
                <DatePicker
                  label="Date de naissance"
                  value={birth}
                  className="w-xs"
                  defaultValue={birth}
                  onChange={onChangeSelect}
                />
              </div>
              <div className="flex gap-3">
                <Select
                  label="Pays"
                  value={selectData.Pays}
                  placeholder="Pays"
                  defaultSelectedKeys={[selectData.Pays]}
                  className="w-xs"
                  name="Pays"
                  onChange={onChangeSel}
                >
                  {paysdata.map((s) => (
                    <SelectItem key={s.key}>{s.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  label="Ville"
                  value={data.Ville}
                  placeholder="Entrer la Ville"
                  type="text"
                  name="Ville"
                  defaultValue={data.Ville}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  label="Address Complete"
                  value={data.AddresseComplete}
                  placeholder="Entrer L'addresse Complète"
                  type="text"
                  name="AddresseComplete"
                  defaultValue={data.AddresseComplete}
                  onChange={onChange}
                />
                <Input
                  isRequired
                  name="MotDePasse"
                  onChange={onChange}
                  label="Mot de passe"
                  value={data.MotDePasse}
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
              </div>
            </div>
            <div className="pt-5">
              <Switch
                color="success"
                isSelected={block}
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
            <div className="flex w-full justify-end py-2">
              <Button onClick={EditSuperviseur} color="primary">
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
                  "Modifier Superviseur"
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
