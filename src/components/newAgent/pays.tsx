import { Select, SelectItem } from "@nextui-org/react";
import { paysdata } from "./paysData";

export default function Pays() {
  return (
    <Select
      isRequired
      label="Pays"
      placeholder="Selectioner un pays"
      className="max-w-xs"
    >
      {paysdata.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
