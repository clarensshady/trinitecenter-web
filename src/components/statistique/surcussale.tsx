import { Select, SelectItem } from "@nextui-org/react";
import { Surcussal } from "./surcussaleData";

export default function SelectSurcusal() {
  return (
    <Select
      label="Surcussale"
      defaultSelectedKeys={["tout"]}
      className="max-w-xs"
    >
      {Surcussal.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
