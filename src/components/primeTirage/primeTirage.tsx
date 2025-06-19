import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import * as React from "react";
import AgentTableTirage from "./agentTableTirage";
import { IParTirage } from "../../types/PrimeGenerale";
import { db } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { allTirage } from "../../utils/mainActions";
import { useMediaQuery } from "@reactuses/core";

export interface IPrimeParAgentProps {}
interface ISel {
  key: string;
  label: string;
}

export function PrimeParTirage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [data, setData] = React.useState<IParTirage>({} as IParTirage);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const PTcol = collection(db, "primeTirage");
  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(PTcol, data);
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
      toast.success("Prime ajoute avec success", {
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
    // const PG = doc(db, "primeTirage", "MKUTpZScG5WQKDuLdK7j");

    /* const allPrimeGenerale = async () => {
      try {
        const primeGen = await getDoc(PG);
        if (primeGen.exists()) {
          const result = {
            ...primeGen.data(),
            Tirage: "",
          } as IParTirage;
          setData({ ...result });
        } else {
          console.log("undefined");
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allPrimeGenerale(); */

    const showTirage = async () => {
      try {
        const tirage = await allTirage();
        setTirage(tirage);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showTirage();
  }, []);

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex-1 w-full flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-2xl font-bold">Prime Par Tirage</span>
          </div>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Prime Par Tirage
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div>
          <Button
            className="py-0 px-4 rounded-xl text-md"
            variant="shadow"
            color="primary"
            onPress={onOpen}
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
          >
            <span className="text-md text-white">
              {isTrue ? "Ajouter " : "Ajouter Tirage"}
            </span>
          </Button>
          <ToastContainer />
          {/* for modal */}
          <Modal
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Ajouter un Tirage
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex-1 px-3 py-4 w-full">
                      <div className="flex flex-col gap-5">
                        <div className="flex-1">
                          <Select
                            label="Tirage"
                            name="Tirage"
                            value={data.Tirage}
                            onChange={onChange}
                            placeholder="Entrer Tirage"
                            className="w-xs"
                          >
                            {tirage.map((s) => (
                              <SelectItem key={s.key}>{s.label}</SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex gap-4">
                          <Input
                            name="tirage1"
                            onChange={onChange}
                            isRequired
                            type="text"
                            label="Tirage 1"
                            /* defaultValue="50" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="tirage2"
                            isRequired
                            type="text"
                            label="Tirage 2"
                            /* defaultValue="20" */
                            className="w-xs"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Input
                            onChange={onChange}
                            name="tirage3"
                            isRequired
                            type="text"
                            label="Tirage 3"
                            /*  defaultValue="10" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="Mariage"
                            isRequired
                            type="text"
                            label="Mariage"
                            /* defaultValue="1000" */
                            className="w-xs"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Input
                            onChange={onChange}
                            name="Lotto3"
                            isRequired
                            type="text"
                            label="Lotto 3"
                            /* defaultValue="500" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="Lotto4op1"
                            isRequired
                            type="text"
                            label="Lotto 4 op1"
                            /* defaultValue="5000" */
                            className="w-xs"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Input
                            onChange={onChange}
                            name="Lotto4op2"
                            isRequired
                            type="text"
                            label="Lotto 4 op2"
                            /* defaultValue="5000" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="Lotto4op3"
                            isRequired
                            type="text"
                            label="Lotto 4 op3"
                            /* defaultValue="5000" */
                            className="w-xs"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Input
                            onChange={onChange}
                            name="Lotto5op1"
                            isRequired
                            type="text"
                            label="Lotto 5 op1"
                            /* defaultValue="25000" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="Lotto5op2"
                            isRequired
                            type="text"
                            label="Lotto 5 op2"
                            /* defaultValue="25000" */
                            className="w-xs"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Input
                            onChange={onChange}
                            name="Lotto5op3"
                            isRequired
                            type="text"
                            label="Lotto 5 op3"
                            /* defaultValue="25000" */
                            className="w-xs"
                          />
                          <Input
                            onChange={onChange}
                            name="MariageGratuit"
                            isRequired
                            type="text"
                            label="Mariage gratuit"
                            /* defaultValue="500" */
                            className="w-xs"
                          />
                        </div>
                      </div>
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
                        "Ajouter"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="w-full flex-1 mt-14">
        <div className="w-full flex-1 shadow-xl border-solid border-slate-100 border-1 rounded-2xl ">
          <div className="mx-5 my-4 flex items-center">
            <div>
              <Button
                variant="shadow"
                className="py-7 text-lg rounded-md"
                color="primary"
              >
                Rafraîchir
              </Button>
            </div>
          </div>
          {/* for the table */}
          <div className=" overflow-auto whitespace-nowrap md:flex-1  mt-7 mx-2">
            <div className="max-w-[300px] sm:max-w-full">
              <AgentTableTirage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
