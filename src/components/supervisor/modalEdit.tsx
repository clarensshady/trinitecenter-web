import {
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import * as React from "react";
import { paysdata } from "../newAgent/paysData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { IForm } from "../../types/superviseur";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { db } from "../../config";
import { Genre } from "./genre";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export interface IModalEditProps {
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
  id?: string;
}

interface Iselect {
  Genre: string;
  Pays: string;
}

export function ModalEdit({
  isOpen,
  onClose,
  onOpenChange,
  id,
}: IModalEditProps) {
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

  const configurer = async () => {
    try {
      if (id) {
        const superDoc = doc(db, "superviseur", id);
        setLoading(true);
        setTimeout(() => {}, 2000);
        setFinish(true);
        updateDoc(superDoc, {
          ...data,
          dateDeNaissance: birth.toString(),
          block,
          ...selectData,
        });
        setLoading(false);
        setFinish(false);
      }
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    const Supercol = collection(db, "superviseur");

    const loadData = async () => {
      try {
        const supervi = await getDocs(Supercol);
        supervi.docs.map((doc) => {
          setData({
            Pseudoname: doc.data().Pseudoname,
            NumeroTelephone: doc.data().NumeroTelephone,
            Prenom: doc.data().Prenom,
            NomDeFamille: doc.data().NomDeFamille,
            Commission: doc.data().Commission,
            Email: doc.data().Email,
            Ville: doc.data().Ville,
            AddresseComplete: doc.data().AddresseComplete,
            MotDePasse: doc.data().MotDePasse,
          });
          setSelectData({ Genre: doc.data().Genre, Pays: doc.data().Pays });
          setBirth(parseDate(doc.data().dateDeNaissance));
        });
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    loadData;
  }, []);

  React.useEffect(() => {
    onClose();
    if (isFinished) {
      toast.success("Superviseur Edite avec success", {
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

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      scrollBehavior="inside"
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Ajouter Superviseur
            </ModalHeader>
            <ToastContainer />
            <ModalBody>
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
                    onChange={onChange}
                    defaultValue={data.Prenom}
                  />
                  <Input
                    autoFocus
                    value={data.NomDeFamille}
                    label="Nom de famille"
                    placeholder="Entrer le Nom de Famille"
                    name="NomDeFamille"
                    onChange={onChange}
                    defaultValue={data.NomDeFamille}
                  />
                </div>
                <div className="flex gap-3">
                  <Input
                    autoFocus
                    value={data.Commission}
                    label="Commission"
                    placeholder="Entrer le Commission"
                    name="Commission"
                    onChange={onChange}
                    defaultValue={data.Commission}
                  />
                  <Input
                    autoFocus
                    label="Email"
                    value={data.Email}
                    isRequired
                    placeholder="Entrer Votre Email"
                    onChange={onChange}
                    name="Email"
                    defaultValue={data.Email}
                  />
                </div>
                <div className="flex gap-3">
                  <Select
                    label="Genre"
                    placeholder=""
                    value={selectData.Genre}
                    defaultSelectedKeys={[selectData.Genre.toLowerCase()]}
                    className="max-w-xs"
                    name="Genre"
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
                    label="pays"
                    value={selectData.Pays}
                    placeholder=""
                    defaultSelectedKeys={[selectData.Pays.toLowerCase()]}
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
                    defaultValue={data.AddresseComplete}
                    name="AddresseComplete"
                    onChange={onChange}
                  />
                  <Input
                    isRequired
                    name="MotDePasse"
                    onChange={onChange}
                    label="Mot de passe"
                    value={data.MotDePasse}
                    defaultValue={data.MotDePasse}
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
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex-1 justify-between">
              <div className="justify-start items-center">
                <Switch
                  color="success"
                  checked={block}
                  onValueChange={onValueChange}
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
              <div className="flex gap-2">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fermé
                </Button>
                <Button onClick={configurer} color="primary">
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
                    "Ajouter"
                  )}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
