import { Select, SelectItem } from "@nextui-org/react";
import { SuperviseurData } from "./supervisordata";

export default function SuperviseurSelect() {
  return (
    <Select
      isRequired
      label="Superviseur"
      placeholder="Selectioner un pays"
      className="max-w-xs"
    >
      {SuperviseurData.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
