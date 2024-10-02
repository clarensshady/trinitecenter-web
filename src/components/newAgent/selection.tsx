import { Select, SelectItem } from "@nextui-org/react";
import { sex } from "./data";

export default function Selection() {
  return (
    <Select
      label="Favorite Genre"
      placeholder="Selectioner un Sex"
      className="max-w-xs"
    >
      {sex.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
