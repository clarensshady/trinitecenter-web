import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import * as React from "react";
import AgentTable from "./agentTable";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IPrime } from "../../types/PrimeGenerale";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { someBank, allTirage } from "../../utils/mainActions";
import { useMediaQuery } from "@reactuses/core";

export interface IPrimeParAgentProps {}
interface ISel {
  key: string;
  label: string;
}

export function PrimeParAgent() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [data, setData] = React.useState<IPrime>({} as IPrime);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<ISel[]>([]);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };

  const PAcol = collection(db, "primeAgent");
  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(PAcol, data);
      setFinish(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isFinished) {
      onClose();
      toast.success("Prime Agent ajoute avec success", {
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
    // const PG = doc(db, "PrimeAgent", "4BujtRhd1jM7I0cIep9G");

    /* const allPrimeGenerale = async () => {
      try {
        const primeAgent = await getDoc(PG);
        if (primeAgent.exists()) {
          const result = {
            ...primeAgent.data(),
            Agent: "",
            Tirage: "",
          } as IPrime;
          setData({ ...result });
        } else {
          console.log("undefined");
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allPrimeGenerale(); */

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
        const tirage = await allTirage();
        setTirage(tirage);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showBank();
    showTirage();
  }, []);

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex-1 w-full flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-2xl font-bold">Prime Par Agent</span>
          </div>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Prime Par Agent
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
              {isTrue ? "Ajouter" : "Ajouter Prime"}
            </span>
          </Button>
          <ToastContainer />
          {/* code for modal */}
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
                    Ajouter Prime Par Agent
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex-1 px-3 py-4 w-full">
                      <form>
                        <div className="flex flex-col gap-5">
                          <div className="flex-1">
                            <Select
                              label="Agent"
                              onChange={onChange}
                              name="Agent"
                              value={data.Agent}
                              placeholder="Entrer l'Agent"
                              className="w-xs"
                            >
                              {bank.map((s) => (
                                <SelectItem key={s.key}>{s.label}</SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Select
                              onChange={onChange}
                              value={data.Tirage}
                              label="Tirage"
                              name="Tirage"
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
                              isRequired
                              value={data.tirage1}
                              onChange={onChange}
                              name="tirage1"
                              type="text"
                              label="Tirage 1"
                              className="w-xs"
                            />
                            <Input
                              isRequired
                              value={data.tirage2}
                              name="tirage2"
                              onChange={onChange}
                              type="text"
                              label="Tirage 2"
                              className="w-xs"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Input
                              onChange={onChange}
                              name="tirage3"
                              value={data.tirage3}
                              isRequired
                              type="text"
                              label="Tirage 3"
                              className="w-xs"
                            />
                            <Input
                              name="Mariage"
                              value={data.Mariage}
                              onChange={onChange}
                              isRequired
                              type="text"
                              label="Mariage"
                              className="w-xs"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Input
                              name="Lotto3"
                              value={data.Lotto3}
                              onChange={onChange}
                              isRequired
                              type="text"
                              label="Lotto 3"
                              className="w-xs"
                            />
                            <Input
                              onChange={onChange}
                              name="Lotto4op1"
                              value={data.Lotto4op1}
                              isRequired
                              type="text"
                              label="Lotto 4 op1"
                              className="w-xs"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Input
                              onChange={onChange}
                              value={data.Lotto4op2}
                              name="Lotto4op2"
                              isRequired
                              type="text"
                              label="Lotto 4 op2"
                              className="w-xs"
                            />
                            <Input
                              onChange={onChange}
                              name="Lotto4op3"
                              value={data.Lotto4op3}
                              isRequired
                              type="text"
                              label="Lotto 4 op3"
                              className="w-xs"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Input
                              onChange={onChange}
                              value={data.Lotto5op1}
                              name="Lotto5op1"
                              isRequired
                              type="text"
                              label="Lotto 5 op1"
                              className="w-xs"
                            />
                            <Input
                              onChange={onChange}
                              name="Lotto5op2"
                              value={data.Lotto5op2}
                              isRequired
                              type="text"
                              label="Lotto 5 op2"
                              className="w-xs"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Input
                              value={data.Lotto5op3}
                              onChange={onChange}
                              name="Lotto5op3"
                              isRequired
                              type="text"
                              label="Lotto 5 op3"
                              className="w-xs"
                            />
                            <Input
                              onChange={onChange}
                              name="MariageGratuit"
                              value={data.MariageGratuit}
                              isRequired
                              type="text"
                              label="Mariage gratuit"
                              className="w-xs"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Fermé
                    </Button>
                    <Button
                      color="primary"
                      onPress={!isFinished ? configurer : onClose}
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
                        "Ajouter Prime"
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
          <div className="w-full overflow-auto whitespace-nowrap mt-7 mx-2 md:flex-1">
            <div className="max-w-[300px] sm:max-w-full">
              <AgentTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
