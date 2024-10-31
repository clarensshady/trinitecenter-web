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
  Input,
  Select,
  SelectItem,
  cn,
  Switch,
} from "@nextui-org/react";
import TableLimiteBoule from "./tableLimiteBoule";
import { ILimiteBoule } from "../../types/LimiteBoule";
import React from "react";
import { db } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useMediaQuery } from "@reactuses/core";
import { allTirage } from "../../utils/mainActions";

export interface ISupervisorCompProps {}
interface ISel {
  key: string;
  label: string;
}

export function LimiteBouleComp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [data, setData] = React.useState<ILimiteBoule>({} as ILimiteBoule);
  const [Tirage, setTirage] = React.useState<string>("");
  const [block, setBlock] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [tirage, setNTirage] = React.useState<ISel[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTirage(event.target.value);
  };

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const LBcol = collection(db, "limiteboule");
  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(LBcol, { ...data, Tirage, block });
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
        const tirage = await allTirage();
        setNTirage(tirage);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
  }, []);

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">
            Liste des limites des boules
          </span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Limite des boules
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
            onPress={onOpen}
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
          >
            <span className="text-md text-white">
              {isTrue ? "Ajouter" : "Ajouter Limite"}
            </span>
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
                    Creer un Nouvel Limite
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-5">
                      <div className="flex">
                        <Select
                          name="Tirage"
                          onChange={onChangeSelect}
                          value={Tirage}
                          label="Tirage"
                          placeholder=""
                          defaultSelectedKeys={["tout"]}
                          className="w-xs"
                        >
                          {tirage.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <Input
                          label="Boule"
                          name="Boule"
                          onChange={onChange}
                          value={data.Boule}
                          placeholder="Entrer boule"
                        />
                        <Input
                          name="Min"
                          onChange={onChange}
                          value={data.Min}
                          label="Min"
                          placeholder="Min"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          label="Max"
                          name="Max"
                          onChange={onChange}
                          value={data.Max}
                          placeholder="Max"
                        />
                        <Input
                          label="Limite"
                          name="Limite"
                          onChange={onChange}
                          value={data.Limite}
                          placeholder="Limite"
                        />
                      </div>
                    </div>
                    <div className="my-4">
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
                        <span>Activation</span>
                      </Switch>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Fermé
                    </Button>
                    <Button color="primary" onPress={configurer}>
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
                        "AJouter Boule"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="overflow-auto whitespace-nowrap w-full flex-1 mt-14 shadow-xl border-solid border-slate-100 border-1 rounded-2xl">
        <div className="w-full max-w-[300px] sm:max-w-full sm:flex-1 ">
          {/* add table */}
          <TableLimiteBoule />
        </div>
      </div>
    </div>
  );
}
