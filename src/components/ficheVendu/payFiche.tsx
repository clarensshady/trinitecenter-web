import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { ficheGagnant } from "./actions";

export function PayerFiche() {
  const [montant, setMontant] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isFinished, setFinish] = React.useState<boolean>(false);
  const params = useParams();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMontant(event.target.value);
  };

  const configurer = async () => {
    try {
      setLoading(true);
      await ficheGagnant(`${params.id}`, montant);
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
      toast.success("Montant Ajouter avec success", {
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
    <div className="flex-1 w-full flex-col px-8 py-10">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Ajouter un Montant</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Fiche Vendus
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Listes
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/checkbox">
              Ajouter Montant
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <ToastContainer />
      </div>
      <div className="mt-10 w-full  sm:w-[400px]">
        <Card>
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4"></div>
                  <div className="flex-1">
                    <Input
                      isRequired
                      name="montant"
                      onChange={onChange}
                      value={montant}
                      defaultValue={montant}
                      type="number"
                      label="Montant"
                      placeholder="Ajouter Montant"
                      className="w-xs"
                    />
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
                        "Ajouter Montant"
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
