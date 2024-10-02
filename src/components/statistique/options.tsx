import { Select, SelectItem } from "@nextui-org/react";
import { Option } from "./optionsData";

export default function SelectOptions() {
  return (
    <Select label="Options" defaultSelectedKeys={["tout"]} className="max-w-xs">
      {Option.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
