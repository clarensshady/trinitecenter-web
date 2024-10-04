import * as React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  DatePicker,
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
import TableGagnant from "./tableGagnant";
import {
  getLocalTimeZone,
  today,
  CalendarDate,
  // fromDate,
} from "@internationalized/date";
import { IAdd } from "../../types/gagnant";
import { db } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { someTirage } from "../../utils/mainActions";
import __ from "lodash";

export interface IListeTiragecompProps {}
interface ISel {
  key: string;
  label: string;
}

export function LotGagnantComp() {
  let defaultDate: CalendarDate = today(getLocalTimeZone());

  // const [dateDebut, setDateDeDebut] = React.useState(defaultDate);
  // const [dateDeFin, setDateDeFin] = React.useState(defaultDate);
  const [dateDuTirage, setDateDuTirage] =
    React.useState<CalendarDate>(defaultDate);
  const [data, setData] = React.useState<IAdd>({} as IAdd);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [tirage, setTirage] = React.useState<ISel[]>([]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };

  // let date = fromDate(new Date(), getLocalTimeZone());

  const LGdoc = collection(db, "lotGagnants");
  const Ajouter = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await addDoc(LGdoc, {
        ...data,
        Tirage: __.toLower(data.Tirage),
        date: dateDuTirage.toString(),
      });
      setLoading(false);
      setFinish(false);
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error();
    }
  };

  React.useEffect(() => {
    onClose();
    if (isFinished) {
      toast.success("Lot ajoute avec success", {
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
          <span className="text-2xl font-bold">Listes des Lots Gagnant</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Tirages
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
            <span className="text-md text-white">Ajouter Tirage </span>
          </Button>
          <ToastContainer />
          {/* for modal */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="xl"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Ajouter Lot Gagnants
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Select
                          label="Tirage"
                          placeholder="Entrer Tirage"
                          className="max-w-xs"
                          value={data.Tirage}
                          name="Tirage"
                          onChange={onChange}
                        >
                          {tirage.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                        <Input
                          name="Lotto31eLot"
                          onChange={onChange}
                          value={data.Lotto31etLot}
                          label="Lotto3 et 1er Lot"
                          placeholder="Entrer Lotto3 et 1er Lot"
                          type="text"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          name="SecondLot"
                          value={data.SecondLot}
                          onChange={onChange}
                          label="2eme Lot"
                          placeholder="Entrer 2eme Lot"
                          type="text"
                        />
                        <Input
                          name="ThirdLot"
                          value={data.ThirdLot}
                          onChange={onChange}
                          label="3eme Lot"
                          placeholder="Entrer 3eme Lot"
                          type="text"
                        />
                      </div>
                      <div className="flex-1">
                        <DatePicker
                          defaultValue={defaultDate}
                          value={dateDuTirage}
                          onChange={setDateDuTirage}
                          label="Date du Tirage"
                          className="w-xs"
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
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
                        "AJouter Tirage"
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
        <div className="w-full flex-1 border-solid border-slate-100 border-1 rounded-2xl shadow-xl ">
          {/* <div className="mx-5 my-4 flex gap-6">
            <div className="flex-1">
              <DatePicker
                defaultValue={defaultDate}
                value={dateDebut}
                onChange={setDateDeDebut}
                label="Date de début"
                className="w-xs"
              />
            </div>
            <div className="flex-1">
              <DatePicker
                defaultValue={defaultDate}
                value={dateDeFin}
                onChange={setDateDeFin}
                label="Date de fin"
                className="w-xs"
              />
            </div>
            <Button
              variant="shadow"
              className="py-7 text-lg rounded-md"
              color="primary"
              onClick={() => console.log("")}
            >
              Filtrer
            </Button>
          </div> */}
          {/* for the table */}
          <div className=" overflow-auto whitespace-nowrap w-full sm:flex mt-7 sm:mx-2">
            <div className="max-w-[400px] sm:max-w-full sm:w-full flex-1 ">
              <TableGagnant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
