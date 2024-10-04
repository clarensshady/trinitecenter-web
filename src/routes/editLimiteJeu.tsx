import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { borlette } from "../components/limiteJeu/borletteData";
import { someTirage } from "../utils/mainActions";

interface ISel {
  Tirage: string;
  Option: string;
}

interface IDa {
  Min: string;
  Max: string;
  Limite: string;
}
interface ISelN {
  key: string;
  label: string;
}
export function EditLimiteJeu() {
  const [data, setData] = React.useState<IDa>({} as IDa);
  const [selectData, setSelectData] = React.useState<ISel>({} as ISel);
  const [block, setBlock] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [tirage, setTirage] = React.useState<ISelN[]>([]);

  const params = useParams();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData({ ...selectData, [event.target.name]: event.target.value });
  };

  const LBcol = doc(db, "limiteJeu", `${params.id}`);
  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      setFinish(true);
      await updateDoc(LBcol, {
        ...data,
        ...selectData,
        block,
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
    const showData = async () => {
      try {
        const dc = await getDoc(LBcol);
        if (dc.exists()) {
          setData({
            Min: dc.data().Min,
            Max: dc.data().Max,
            Limite: dc.data().Limite,
          });
          setSelectData({ Tirage: dc.data().Tirage, Option: dc.data().Option });
          setBlock(dc.data().block);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showData();

    const showTirage = async () => {
      try {
        const tira = await someTirage();
        setTirage(tira);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
  }, []);

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Limite modifie avec success", {
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
    <div className="px-8 py-8 flex-1 w-full flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Modifier limite des Jeux</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Limite Jeu
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              List
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Edit Limite Jeu
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
                  <div>
                    <div className="flex flex-col gap-5">
                      <div className="flex">
                        <Select
                          name="Tirage"
                          onChange={onChangeSelect}
                          label="Tirage"
                          placeholder="Tirage"
                          defaultSelectedKeys={[
                            selectData.Tirage?.toLowerCase(),
                          ]}
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
                          defaultSelectedKeys={[
                            selectData.Option?.toLowerCase(),
                          ]}
                          placeholder="Entrer Option"
                        >
                          {borlette.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                        <Input
                          name="Min"
                          onChange={onChange}
                          value={data.Min}
                          label="Min"
                          defaultValue={data.Min}
                          placeholder="Min"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          label="Max"
                          name="Max"
                          onChange={onChange}
                          value={data.Max}
                          defaultValue={data.Max}
                          placeholder="Max"
                        />
                        <Input
                          label="Limite"
                          name="Limite"
                          onChange={onChange}
                          value={data.Limite}
                          defaultValue={data.Limite}
                          placeholder="Limite"
                        />
                      </div>
                    </div>
                    <div className="my-4">
                      <Switch
                        color="success"
                        isSelected={block}
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
                        <span>Activation</span>
                      </Switch>
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
                        "Modifier Limite"
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
