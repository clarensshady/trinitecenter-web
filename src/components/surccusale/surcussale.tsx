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
import { ISurC } from "../../types/surcussale";
import { paysdata } from "../newAgent/paysData";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { allSuperviseur } from "../../utils/mainActions";
import __ from "lodash";

interface ISel {
  key: string;
  label: string;
}

export function NewSurcussaleComp() {
  const [data, setData] = React.useState<ISurC>({} as ISurC);
  const [block, setBlock] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [superviseur, setSuperviseur] = React.useState<ISel[]>([]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const Surcol = collection(db, "surcussale");
  const configurer = async () => {
    try {
      setLoading(true);
      await addDoc(Surcol, {
        ...data,
        NomCentral: __.toLower(data.NomCentral),
        block,
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

  React.useEffect(() => {
    const showSuperviseur = async () => {
      try {
        const supervi = await allSuperviseur();
        setSuperviseur(supervi);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showSuperviseur();
  }, []);
  return (
    <div className="flex-1 w-full flex-col">
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
              Surcussale
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Nouvel surcussale
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <ToastContainer />
      </div>
      <div className="mt-10 w-full  sm:w-[530px]">
        <Card className="">
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4"></div>
                  <div className="flex gap-4">
                    <Select
                      label="Pays"
                      placeholder="Selectioner un pays"
                      className="max-w-xs"
                      name="Pays"
                      onChange={onChange}
                      value={data.Pays}
                    >
                      {paysdata.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      name="Ville"
                      onChange={onChange}
                      value={data.Ville}
                      isRequired
                      type="text"
                      label="Ville"
                      placeholder="Choisir la Ville"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      isRequired
                      name="Superviseur"
                      onChange={onChange}
                      value={data.Superviseur}
                      label="Superviseur"
                      placeholder="Selectioner un pays"
                      className="max-w-xs"
                    >
                      {superviseur.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      isRequired
                      name="NomCentral"
                      onChange={onChange}
                      value={data.NomCentral}
                      type="text"
                      label="Nom Central"
                      placeholder="Entrer le Nom du Central"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      isRequired
                      name="NumeroTelephone"
                      onChange={onChange}
                      value={data.NumeroTelephone}
                      type="text"
                      label="NumeroTelephone"
                      placeholder="Entrer le numero de telephone"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex justify-start">
                    <Switch
                      checked={block}
                      onValueChange={onValueChange}
                      color="success"
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
                        "Créer un surccusale"
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
