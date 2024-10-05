import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
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
  useDisclosure,
} from "@nextui-org/react";
import TableOptions from "./TableOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import { Bounce, toast } from "react-toastify";
import { colorSelect } from "./color";
import { someSurcussale } from "../../utils/mainActions";
import __ from "lodash";
import { useMediaQuery } from "@reactuses/core";

interface IData {
  Bank: string;
  Surcussale: string;
  Color: string;
}

interface ISel {
  key: string;
  label: string;
}

export function ListOptionsComp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [blocked, setBlock] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IData>({} as IData);
  const [surcussale, setSurcussale] = React.useState<ISel[]>([]);

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const onChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const optionRef = collection(db, "listOptions");

  const Ajouter = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 3000);
      setFinish(true);
      await addDoc(optionRef, {
        ...data,
        Bank: __.capitalize(data.Bank),
        block: blocked,
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
    if (isFinished) {
      onClose();
      toast.success("Option ajoute avec success", {
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
    const showSurcu = async () => {
      try {
        const surcu = await someSurcussale();
        setSurcussale(surcu);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showSurcu();
  }, []);

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full flex-1 flex-col">
      {/*  */}
      <div className="flex justify-between">
        <div className="flex w-full items-center">
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold">List des Options</span>
            <div>
              <Breadcrumbs>
                <BreadcrumbItem href="/docs/components/button">
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/breadcrumbs">
                  Options
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/checkbox">
                  Listes
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
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
              {isTrue ? "Ajouter" : "Ajouter Option"}
            </span>
          </Button>
          {/* just code for opening option add-on */}
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
                    Ajouter un Option
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex-1">
                      <Input
                        name="Bank"
                        onChange={onChangeData}
                        label="Bank"
                        value={data.Bank}
                        placeholder="Enter Bank"
                        variant="flat"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Select
                        label="Color"
                        placeholder="Entrer couleur"
                        value={data.Color}
                        name="Color"
                        className="w-xs"
                        onChange={onChangeData}
                      >
                        {colorSelect.map((s) => (
                          <SelectItem key={s.key}>{s.label}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        label="Surcussale"
                        placeholder="Entrer Surcussale"
                        value={data.Surcussale}
                        name="Surcussale"
                        className="w-xs"
                        onChange={onChangeData}
                      >
                        {surcussale.map((s) => (
                          <SelectItem className="capitalize" key={s.key}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex py-2 px-1 justify-between">
                      <Switch
                        color="success"
                        defaultSelected={blocked}
                        onValueChange={onValueChange}
                        classNames={{
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
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
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
      <div className="overflow-auto whitespace-nowrap w-full flex-1 mt-14 border-solid border-slate-100 border-1 rounded-2xl shadow-xl">
        <div className="max-w-[300px] sm:max-w-full w-full flex-1  ">
          {/* add table */}
          <TableOptions />
        </div>
      </div>
    </div>
  );
}
