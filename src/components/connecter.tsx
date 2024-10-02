import * as React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Isel } from "../types/administrateur";
import AdminForm from "./admistrateur";
import SuperviseurForm from "./superviseur";

export default function Authentication() {
  const [selected, setSelected] = React.useState<any>("Se connecter");
  const [tabHeight, setHeight] = React.useState<number>(400);

  React.useEffect(() => {
    if (selected === "Se connecter as Admin") {
      setHeight(400);
    } else {
      setHeight(440);
    }
  }, [selected]);

  const adminData: Isel = {
    selected,
    setSelected,
  };

  return (
    <div>
      <Card
        style={{ height: `${tabHeight}px` }}
        className="max-w-full w-[450px] transition-all"
      >
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="Se connecter as Admin" title="Se connecter as Admin">
              <AdminForm {...adminData} />
            </Tab>
            <Tab key="Se connecter as Super" title="Se connecter as Super">
              <SuperviseurForm {...adminData} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
