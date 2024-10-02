import { Select, SelectItem } from "@nextui-org/react";
import { tirage } from "./selectData";

export default function SelecTirage() {
  return (
    <Select
      label="Tirage"
      placeholder=""
      defaultSelectedKeys={["tout"]}
      className="max-w-xs"
    >
      {tirage.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
