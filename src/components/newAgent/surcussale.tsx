import { Select, SelectItem } from "@nextui-org/react";
import { surcuData } from "./surcu";

export default function Surcussale() {
  return (
    <Select
      label="Surcussale"
      placeholder="Entrer le Surcussale"
      className="max-w-xs"
    >
      {surcuData.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
