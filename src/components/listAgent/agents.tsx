import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import TableAgent from "./tableAgent";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useMediaQuery } from "@reactuses/core";

export interface ISupervisorCompProps {}

export function Agents() {
  const navigate: NavigateFunction = useNavigate();

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Liste Des Vendeurs</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Vendeur
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/checkbox">
                Liste
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="second">
          <Button
            className="py-0 px-4 rounded-xl text-md"
            variant="shadow"
            color="primary"
            onPress={() => navigate("/dashboard/agent/new")}
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
          >
            <span className="text-md text-white">
              {isTrue ? "Ajouter" : "Ajouter Vendeur"}
            </span>
          </Button>
        </div>
      </div>
      <div className="overflow-auto whitespace-nowrap w-[98%] md:w-full  md:flex-1 mt-14 shadow-xl border-solid border-slate-100 border-1 rounded-2xl">
        <div className="max-w-[300px] md:flex-1 md:max-w-full md:w-full">
          {/* add table */}
          <TableAgent />
        </div>
      </div>
    </div>
  );
}
