import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Switch,
  cn,
} from "@nextui-org/react";
import TableLimiteJeu from "./tableLimiteJeu";
import { borlette } from "./borletteData";
import { ILimitS, IlimitJ } from "../../types/LimiteJeu";
import React from "react";
import { db } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { someTirage } from "../../utils/mainActions";

export interface ISupervisorCompProps {}
interface ISel {
  key: string;
  label: string;
}

export function LimiteJeuComp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [data, setData] = React.useState<IlimitJ>({} as IlimitJ);
  const [selectData, setSelectData] = React.useState<ILimitS>({} as ILimitS);
  const [block, setBlock] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData({ ...selectData, [event.target.name]: event.target.value });
  };

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const LJcol = collection(db, "limiteJeu");
  const Ajouter = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(LJcol, { ...data, block, ...selectData });
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
      toast.success("Limite ajoute avec success", {
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
    const showTirage = async () => {
      try {
        const tirage = await someTirage();
        setTirage(tirage);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
  }, []);

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Liste des limites des jeux</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Limite Jeu
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/checkbox">
                Listes
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="second">
          <Button
            className="py-0 px-4 rounded-xl text-md"
            variant="shadow"
            color="primary"
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
            onPress={onOpen}
          >
            <span className="text-md text-white">Ajouter Limite</span>
          </Button>
          <ToastContainer />
          <Modal
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Ajouter Limite Jeu
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <Select
                          name="Tirage"
                          onChange={onChangeSelect}
                          label="Tirage"
                          value={selectData.Tirage}
                          placeholder="Entrer Tirage"
                          className="w-xs"
                        >
                          {tirage.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <Select
                          value={selectData.Option}
                          label="Options"
                          onChange={onChangeSelect}
                          name="Option"
                          placeholder="Entrer Option"
                        >
                          {borlette.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                        <Input
                          label="Min"
                          name="Min"
                          value={data.Min}
                          onChange={onChange}
                          placeholder="Min"
                          variant="flat"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          value={data.Max}
                          name="Max"
                          onChange={onChange}
                          label="Max"
                          placeholder="Max"
                          variant="flat"
                        />
                        <Input
                          value={data.Limite}
                          name="Limite"
                          label="Limite"
                          onChange={onChange}
                          placeholder="Limite"
                          variant="flat"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Switch
                        checked={block}
                        color="success"
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
                        Activation
                      </Switch>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Ferme
                    </Button>
                    <Button color="primary" onPress={Ajouter}>
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
                        "AJouter Limite"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="overflow-auto whitespace-nowrap w-full sm:flex mt-14 border-solid shadow-xl border-slate-100 border-1 rounded-2xl">
        <div className="max-w-[400px] sm:max-w-full w-full flex-1 ">
          {/* add table */}
          <TableLimiteJeu />
        </div>
      </div>
    </div>
  );
}
