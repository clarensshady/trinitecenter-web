import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Switch,
  TimeInput,
  cn,
} from "@nextui-org/react";
import Tiragetable from "./tirageTable";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import {
  Time,
  ZonedDateTime,
  getLocalTimeZone,
  now,
  toTime,
} from "@internationalized/date";
import { ClockCircleLinearIcon } from "../utils/clockCircleIcon";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { ClipLoader, HashLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@reactuses/core";
import __ from "lodash";

export function ListeTiragecomp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isLagged, setLag] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);

  const time: ZonedDateTime = now(getLocalTimeZone());

  const [timeInterval, setTime] = React.useState<{
    ouverture: Time;
    fermeture: Time;
    Tirage: string;
    listBoule: string;
  }>({
    ouverture: toTime(time),
    fermeture: toTime(time),
    Tirage: "",
    listBoule: "",
  });

  const [blocked, setBlock] = React.useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setTime({ ...timeInterval, Tirage: target.value });
  };
  const onChangeOpenTime = (value: Time) => {
    setTime({ ...timeInterval, ouverture: value });
  };
  const onChangeCloseTime = (value: Time) =>
    setTime({ ...timeInterval, fermeture: value });

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };
  const tirageCol = collection(db, "Tirages");

  const Ajouter = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 3000);
      setFinish(true);
      await addDoc(tirageCol, {
        Nom: __.toLower(timeInterval.Tirage),
        Ouverture: timeInterval.ouverture.toString(),
        fermeture: timeInterval.fermeture.toString(),
        Block: blocked ? "Bloqué" : "Activé",
      });
      setLoading(false);
      setFinish(false);
    } catch (error) {
      setLoading(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    if (isFinished) {
      onClose();
      toast.success("Tirage ajoute avec success", {
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
    <div>
      {isLagged ? (
        <div className="flex-1 justify-center text-center">
          <div className="m-auto">
            <HashLoader
              color="blue"
              loading={true}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div className=" flex-1 flex-col justify-center">
          <div
            style={{ width: isTrue ? "98%" : "100%" }}
            className="flex justify-between sm:w-full items-center"
          >
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-bold">Listes des tirages</span>
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
                startContent={
                  <FontAwesomeIcon className="pr-1" icon={faPlus} />
                }
              >
                <span className="text-md text-white">
                  {isTrue ? "Ajouter" : "Ajouter un Tirage"}
                </span>
              </Button>
              <ToastContainer />
              {/* for tirage modal */}
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
                        AJouter Tirage
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex-1">
                          <Input
                            type="text"
                            label="Entrer Tirage"
                            value={timeInterval.Tirage}
                            onChange={onChange}
                            name="Tirage"
                            placeholder="Entrer Tirage"
                          />
                        </div>
                        <div className="flex gap-3 mt-4">
                          <TimeInput
                            hourCycle={24}
                            label="Ouveture"
                            granularity="second"
                            onChange={onChangeOpenTime}
                            defaultValue={
                              new Time(time.hour, time.minute, time.second)
                            }
                            endContent={
                              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                          />
                          <TimeInput
                            hourCycle={24}
                            granularity="second"
                            label="Fermeture"
                            onChange={onChangeCloseTime}
                            defaultValue={
                              new Time(time.hour, time.minute, time.second)
                            }
                            endContent={
                              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                          />
                        </div>
                        <div className="flex py-2 px-1 justify-between">
                          <Switch
                            color="success"
                            defaultSelected={blocked}
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
                          <Link color="primary" href="#" size="sm">
                            Liste des tirages
                          </Link>
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
          <div className="mt-14 ">
            <div className="shadow-xl  md:flex-1 md:w-full  overflow-x-auto whitespace-nowrap mt-1 border-solid border-slate-100 border-1 rounded-2xl ">
              <div className="flex max-w-[300px] sm:max-w-full">
                <Tiragetable setLag={setLag} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
