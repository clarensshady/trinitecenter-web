import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  CalendarDate,
  Card,
  CardBody,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useParams } from "react-router-dom";
import { IAdd } from "../../types/gagnant";
import { someTirage } from "../../utils/mainActions";
import __ from "lodash";

interface ISel {
  key: string;
  label: string;
}

export function EditLogGagnant() {
  let defaultDate: CalendarDate = today(getLocalTimeZone());
  const [dateDuTirage, setDateDuTirage] = React.useState<CalendarDate>();
  const [data, setData] = React.useState<IAdd>({} as IAdd);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [tirage, setTirage] = React.useState<ISel[]>([]);
  const [date] = React.useState<CalendarDate>(defaultDate);

  const params = useParams();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };
  const configurer = async () => {
    try {
      const docRef = doc(db, "lotGagnants", `${params.id}`);
      setLoading(true);
      const day = date.day.toString();
      const nd = day.length == 1 ? `0${day}` : day;
      await updateDoc(docRef, {
        ...data,
        Tirage: __.toLower(data.Tirage),
        date: `${dateDuTirage?.toString()}`,
        dateCreated: `${date.year}-${date.month}-${nd}`,
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
    const showLotGagnants = async () => {
      try {
        const gagnants = await getDoc(doc(db, "lotGagnants", `${params.id}`));
        if (gagnants.exists()) {
          setData({
            Tirage: gagnants.data().Tirage,
            Lotto31eLot: gagnants.data().Lotto31eLot,
            SecondLot: gagnants.data().SecondLot,
            ThirdLot: gagnants.data().ThirdLot,
          });
          setDateDuTirage(parseDate(gagnants.data().date));
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    showLotGagnants();
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

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Surcussale ajoute avec success", {
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
    <div className="flex-1 w-full flex-col px-10 py-8">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Créer un nouvel surcussale</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Tirages Gagnant
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              listes
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
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Select
                        label="Tirage"
                        placeholder="Entrer Tirage"
                        className="max-w-xs"
                        defaultSelectedKeys={[`${data.Tirage}`]}
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
                        value={data.Lotto31eLot}
                        defaultValue={data.Lotto31eLot}
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
                        defaultValue={data.SecondLot}
                        type="text"
                      />
                      <Input
                        name="ThirdLot"
                        value={data.ThirdLot}
                        onChange={onChange}
                        defaultValue={data.ThirdLot}
                        label="3eme Lot"
                        placeholder="Entrer 3eme Lot"
                        type="text"
                      />
                    </div>
                    <div className="flex-1">
                      <DatePicker
                        defaultValue={dateDuTirage}
                        value={dateDuTirage}
                        onChange={setDateDuTirage}
                        label="Date du Tirage"
                        className="w-xs"
                      />
                    </div>
                  </div>
                  <div className="self-end">
                    <Button
                      variant="shadow"
                      className="text-sm"
                      color="primary"
                      onPress={configurer}
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
                        "Modifier Lot"
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
