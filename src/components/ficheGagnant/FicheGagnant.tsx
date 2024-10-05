import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from "@nextui-org/react";
import FicheGagnantTable from "./tableFicheGagnant";

export interface IVenteCompProps {}

export function FicheGagnantComp() {
  return (
    <div className='className="flex-1 w-full flex-col"'>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Liste des fiches gagnants</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Fiches gagnants
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
            <div className="mt-5 sm:px-3 pt-3 overflow-auto whitespace-nowrap ">
              <div className="max-w-[300px] md:max-w-full flex-1">
                <FicheGagnantTable />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
