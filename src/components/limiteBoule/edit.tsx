import {
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
} from "@nextui-org/react";
import * as React from "react";
import { ILimiteBoule } from "../../types/LimiteBoule";
import { ClipLoader } from "react-spinners";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config";
import { Bounce, toast } from "react-toastify";
import { someTirage } from "../../utils/mainActions";

export interface IEditLimiteBouleProps {
  id?: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface ISel {
  key: string;
  label: string;
}

export function EditLimiteBoule({
  isOpen,
  onOpenChange,
  id,
  onClose,
}: IEditLimiteBouleProps) {
  const [data, setData] = React.useState<ILimiteBoule>({} as ILimiteBoule);
  const [Tirage, setTirage] = React.useState<string>("");
  const [block, setBlock] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [pending, setPending] = React.useState<boolean>(false);
  const [tirage, setNTirage] = React.useState<ISel[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTirage(event.target.value);
  };

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const LBcol = doc(db, "limiteboule", `${id}`);
  const configurer = async () => {
    try {
      setLoading(true);
      setTimeout(() => {}, 2000);
      await updateDoc(LBcol, {
        ...data,
        Tirage,
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
    const showData = async () => {
      try {
        setPending(true);
        const dc = await getDoc(LBcol);
        if (dc.exists()) {
          setTirage(dc.data().Tirage);
          setData({
            ...data,
            Boule: dc.data().Boule,
            Min: dc.data().Min,
            Max: dc.data().Max,
            Limite: dc.data().Limite,
          });
          setBlock(dc.data().block);
          setPending(false);
        }
        setPending(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    const showTirage = async () => {
      try {
        const tirage = await someTirage();
        setNTirage(tirage);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    showTirage();
    showData();
  }, []);

  React.useEffect(() => {
    onClose();
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
    <>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Creer un Nouvel Limite
              </ModalHeader>
              <ModalBody>
                {pending ? (
                  <div className="flex justify-center py-12 w-full">
                    <div>
                      <ClipLoader
                        color="blue"
                        loading={isLoading}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-5">
                      <div className="flex">
                        <Select
                          name="Tirage"
                          onChange={onChangeSelect}
                          value={Tirage}
                          label="Tirage"
                          placeholder="Tirage"
                          defaultSelectedKeys={[`${Tirage?.toLowerCase()}`]}
                          className="w-xs"
                        >
                          {tirage.map((s) => (
                            <SelectItem key={s.key}>{s.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <Input
                          label="Boule"
                          name="Boule"
                          onChange={onChange}
                          value={data.Boule}
                          defaultValue={data.Boule}
                          placeholder="Entrer boule"
                        />
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
                        checked={block}
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
                        <span>Activation</span>
                      </Switch>
                    </div>
                  </div>
                )}
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
                    "Limite Boule"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
