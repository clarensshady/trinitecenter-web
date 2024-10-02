import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from "@nextui-org/react";
import FicheElimineTable from "./tableFicheElimine";

export interface IVenteCompProps {}

export function FicheEliminerComp() {
  return (
    <div className='className="flex-1 w-full flex-col"'>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Liste des fiches supprimés</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Fiches supprimés
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Listes
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div className="mt-10">
        <Card shadow="none" className="shadow-xl">
          <CardBody>
            <div className="mt-5 px-3 pt-3 overflow-auto whitespace-nowrap ">
              <div className="max-w-[400px] md:max-w-full flex-1">
                <FicheElimineTable />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
