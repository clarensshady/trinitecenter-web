import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import TableSurcussale from "./tableSurcussale";
import { useMediaQuery } from "@reactuses/core";

export interface ISupervisorCompProps {}

export function ListOfSurcussale() {
  const navigate: NavigateFunction = useNavigate();

  const isTrue = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full flex-1 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Liste Des Surcussales</span>
          <div>
            <Breadcrumbs>
              <BreadcrumbItem href="/docs/components/button">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/breadcrumbs">
                Surcussale
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs/components/checkbox">
                liste
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="second">
          <Button
            className="py-0 px-4 rounded-xl text-md"
            variant="shadow"
            color="primary"
            onPress={() => navigate("/dashboard/surccussale/new")}
            startContent={<FontAwesomeIcon className="pr-1" icon={faPlus} />}
          >
            <span className="text-md text-white">
              {isTrue ? "Ajouter" : "Ajouter Surcussale"}
            </span>
          </Button>
        </div>
      </div>
      <div className="w-full overflow-auto whitespace-nowrap flex-1 mt-14 border-solid shadow-xl border-slate-100 border-1 rounded-2xl">
        <div className="w-full max-w-[400px] sm:max-w-full flex-1 ">
          {/* add table */}
          <TableSurcussale />
        </div>
      </div>
    </div>
  );
}
