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
} from "@nextui-org/react";
import TableBlockageBoule from "./TableBlocageBoule";
import { IBouleS } from "../../types/bouleBloquer";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { getLocalTimeZone, today } from "@internationalized/date";
import { someBank, someTirage } from "../../utils/mainActions";

export interface ISupervisorCompProps {}
interface ISel {
  key: string;
  label: string;
}

export function BlocageBouleComp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [boule, setBoule] = React.useState<string>("");
  const [selectData, setSelectData] = React.useState<IBouleS>({} as IBouleS);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<ISel[]>([]);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoule(event.target.value);
  };
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData({ ...selectData, [event.target.name]: event.target.value });
  };
  const dateBlock = today(getLocalTimeZone());

  const BBcol = collection(db, "blocageBoule");

  const Ajouter = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(BBcol, { ...selectData, boule, date: dateBlock.toString() });
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
    const showBank = async () => {
      try {
        const bank = await someBank();
        setBank(bank);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showBank();

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
          <span className="text-2xl font-bold">Liste des boules bloque</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Boule block
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
            <span className="text-md text-white">Ajouter Boule</span>
          </Button>
          <ToastContainer />
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    AJouter Boule
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Select
                          label="Tirage"
                          name="Tirage"
                          onChange={onChangeSelect}
                          value={selectData.Tirage}
                          placeholder="Tirage"
                          defaultSelectedKeys={["tout"]}
                          className="max-w-xs"
                        >
                          {tirage.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                        <Select
                          name="Agent"
                          onChange={onChangeSelect}
                          label="Agent"
                          value={selectData.Agent}
                          placeholder="Entrer l'agent"
                          className="max-w-xs"
                        >
                          {bank.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Input
                          name="Boule"
                          onChange={onChange}
                          label="Boule"
                          value={boule}
                          placeholder="Enter Boule"
                          variant="flat"
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Fermé
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
      <div className="w-full flex-1 mt-14">
        <div className="w-full flex-1 border-solid border-slate-100 border-1 rounded-2xl">
          {/* add table */}
          <TableBlockageBoule />
        </div>
      </div>
    </div>
  );
}
