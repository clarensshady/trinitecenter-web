import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import { IprimGen } from "../../types/PrimeGenerale";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";

export interface IPrimeTirageCompProps {}

export function PrimeTirageComp() {
  const [data, setData] = React.useState<IprimGen<string>>(
    {} as IprimGen<string>
  );
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
  };

  const PGdoc = doc(db, "primeGenerale", "slWTegZ0f1uy1l8xJecw");
  const configurer = async () => {
    try {
      setLoading(true);
      await updateDoc(PGdoc, { ...data });
      setFinish(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    const PG = doc(db, "primeGenerale", "slWTegZ0f1uy1l8xJecw");

    const allPrimeGenerale = async () => {
      try {
        const primeGen = await getDoc(PG);
        if (primeGen.exists()) {
          const result = primeGen.data() as IprimGen<string>;
          setData({ ...result });
        } else {
          console.log("undefined");
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    allPrimeGenerale();
  }, []);

  React.useEffect(() => {
    if (isFinished) {
      toast.success("Prime ajoute avec success", {
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
      setLoading(false);
    }
  }, [isFinished]);

  return (
    <div className="flex-1 w-full flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Modifier prime generale</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Prime generale
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Modification {data.tirage1}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <ToastContainer />
      <div className="mt-10 w-[98%] sm:w-[580px]">
        <Card className="">
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="tirage1"
                      type="text"
                      label="Tirage 1"
                      value={data.tirage1}
                      defaultValue={data.tirage1}
                      className="w-xs"
                      onChange={onChange}
                    />
                    <Input
                      isRequired
                      onChange={onChange}
                      name="tirage2"
                      type="text"
                      value={data.tirage2}
                      label="Tirage 2"
                      defaultValue={data.tirage2}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="tirage3"
                      onChange={onChange}
                      isRequired
                      type="text"
                      label="Tirage 3"
                      value={data.tirage3}
                      defaultValue={data.tirage3}
                      className="w-xs"
                    />
                    <Input
                      name="Mariage"
                      isRequired
                      onChange={onChange}
                      type="text"
                      value={data.Mariage}
                      label="Mariage"
                      defaultValue={data.Mariage}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="Lotto3"
                      isRequired
                      type="text"
                      value={data.Lotto3}
                      onChange={onChange}
                      label="Lotto 3"
                      defaultValue={data.Lotto3}
                      className="w-xs"
                    />
                    <Input
                      name="Lotto4op1"
                      isRequired
                      onChange={onChange}
                      value={data.Lotto4op1}
                      type="text"
                      label="Lotto 4 op1"
                      defaultValue={data.Lotto4op1}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="Lotto4op2"
                      isRequired
                      type="text"
                      onChange={onChange}
                      value={data.Lotto4op2}
                      label="Lotto 4 op2"
                      defaultValue={data.Lotto4op2}
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      name="Lotto4op3"
                      onChange={onChange}
                      type="text"
                      value={data.Lotto4op3}
                      label="Lotto 4 op3"
                      defaultValue={data.Lotto4op3}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="Lotto5op1"
                      onChange={onChange}
                      value={data.Lotto5op1}
                      type="text"
                      label="Lotto 5 op1"
                      defaultValue="25000"
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      name="Lotto5op2"
                      onChange={onChange}
                      value={data.Lotto5op2}
                      type="text"
                      label="Lotto 5 op2"
                      defaultValue="25000"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      name="Lotto5op3"
                      isRequired
                      type="text"
                      value={data.Lotto5op3}
                      onChange={onChange}
                      label="Lotto 5 op3"
                      defaultValue="25000"
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      name="MariageGratuit"
                      type="text"
                      onChange={onChange}
                      value={data.MariageGratuit}
                      label="Mariage gratuit"
                      defaultValue="500"
                      className="w-xs"
                    />
                  </div>
                  <div className="self-end">
                    <Button
                      variant="shadow"
                      className={isLoading ? "text-sm px-5" : "text-sm"}
                      color="primary"
                      onClick={configurer}
                      isDisabled={isLoading}
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
                        "Sauvegarder les modifications"
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
