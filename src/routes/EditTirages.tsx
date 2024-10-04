import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  TimeInput,
  cn,
} from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {} from "react-router-dom";
import { ClockCircleLinearIcon } from "../utils/clockCircleIcon";
import {
  Time,
  ZonedDateTime,
  getLocalTimeZone,
  toTime,
  now,
  parseTime,
} from "@internationalized/date";
import { db } from "../config";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import __ from "lodash";

export function EditTirage() {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);

  const time: ZonedDateTime = now(getLocalTimeZone());
  const params = useParams();

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

  /*  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  }; */
  const tirageRef = doc(db, "Tirages", `${params.id}`);

  const ModifierTirage = async () => {
    try {
      setLoading(true);
      await updateDoc(tirageRef, {
        Nom: __.capitalize(timeInterval.Tirage),
        Ouverture: timeInterval.ouverture.toString(),
        fermeture: timeInterval.fermeture.toString(),
        Block: blocked ? "Bloqué" : "Activé",
      });
      setLoading(false);
      setFinish(true);
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    const showTirage = async () => {
      try {
        const tirage = await getDoc(tirageRef);
        if (tirage.exists()) {
          setTime({
            ouverture: parseTime(tirage.data().Ouverture),
            fermeture: parseTime(tirage.data().fermeture),
            Tirage: tirage.data().Nom,
            listBoule: tirage.data().listBoule,
          });
          setBlock(tirage.data().Block == "Activé" ? false : true);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
  }, []);

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Tirage Modifie avec success", {
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
    <div className="flex-1 w-full py-8 px-10 flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Modifier un Tirage</span>
        </div>
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
            <BreadcrumbItem href="/docs/components/checkbox">
              Editer Tirage
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <ToastContainer />
      </div>
      <div className="mt-10 w-[530px]">
        <Card className="">
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex-1">
                    <Input
                      type="text"
                      label="Entrer Tirage"
                      value={timeInterval.Tirage}
                      onChange={onChange}
                      name="Tirage"
                      placeholder="Entrer Tirage"
                      defaultValue={timeInterval.Tirage}
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <TimeInput
                      hourCycle={24}
                      label="Ouveture"
                      granularity="second"
                      onChange={onChangeOpenTime}
                      value={timeInterval.ouverture}
                      defaultValue={timeInterval.ouverture}
                      endContent={
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <TimeInput
                      hourCycle={24}
                      granularity="second"
                      label="Fermeture"
                      onChange={onChangeCloseTime}
                      value={timeInterval.fermeture}
                      defaultValue={timeInterval.fermeture}
                      endContent={
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                  <div className="flex py-2 px-1 justify-between">
                    <Switch
                      color="success"
                      isSelected={blocked}
                      onValueChange={setBlock}
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
                  <div className="pt-3 justify-end self-end">
                    <Button onClick={ModifierTirage} color="primary">
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
                        "Modifier Tirage"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
