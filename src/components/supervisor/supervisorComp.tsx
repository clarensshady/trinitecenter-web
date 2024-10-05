import { faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  CalendarDate,
  DatePicker,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import TableSupervisor from "./tableSupervisor";
import { Genre } from "./genre";
import { paysdata } from "../newAgent/paysData";
import React from "react";
import { IForm } from "../../types/superviseur";
import { getLocalTimeZone, today } from "@internationalized/date";
import { db } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useMediaQuery } from "@reactuses/core";

export interface ISupervisorCompProps {}
interface Iselect {
  Genre: string;
  Pays: string;
}

export function SupervisorComp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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

  const Supercol = collection(db, "superviseur");

  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(Supercol, {
        ...data,
        dateDeNaissance: birth?.toString(),
        Genre: selectData.Genre,
        Pays: selectData.Pays,
        block,
        photUrl: "",
      });
      setLoading(false);
      setFinish(false);
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    onClose();
    if (isFinished) {
      toast.success("Superviseur ajoute avec success", {
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

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Listes des superviseurs</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Superviseur
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/checkbox">
                Liste
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="second">
          <Button
            className="py-0 px-4 rounded-xl text-md"
            variant="shadow"
            color="primary"
            onPress={onOpen}
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
          >
            <span className="text-md text-white">
              {isTrue ? "Ajouter" : "Ajouter Superviseur"}
            </span>
          </Button>
          <ToastContainer />
          {/* for modal */}
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
                        />
                        <Input
                          autoFocus
                          value={data.NumeroTelephone}
                          label="Numéro de téléphone"
                          placeholder="Entrer le Numéro de téléphone"
                          name="NumeroTelephone"
                          onChange={onChange}
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
                        />
                        <Input
                          autoFocus
                          value={data.NomDeFamille}
                          label="Nom de famille"
                          placeholder="Entrer le Nom de Famille"
                          name="NomDeFamille"
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
                          onChange={onChange}
                        />
                        <Input
                          autoFocus
                          label="Email"
                          value={data.Email}
                          isRequired
                          placeholder="Entrer Votre Email"
                          onChange={onChange}
                          name="Email"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Select
                          label="Genre"
                          placeholder=""
                          value={selectData.Genre}
                          defaultSelectedKeys={["other"]}
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
                          defaultValue={today(getLocalTimeZone())}
                          onChange={onChangeSelect}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Select
                          label="pays"
                          value={selectData.Pays}
                          placeholder=""
                          defaultSelectedKeys={["haiti"]}
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
        </div>
      </div>
      <div className="overflow-auto md:w-full whitespace-nowrap md:flex mt-14 border-solid shadow-xl border-slate-100 border-1 rounded-2xl">
        <div className="max-w-[300px]  md:max-w-full  md:flex-1 ">
          {/* add table */}
          <TableSupervisor />
        </div>
      </div>
    </div>
  );
}
