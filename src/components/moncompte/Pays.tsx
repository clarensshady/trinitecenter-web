import { Select, SelectItem } from "@nextui-org/react";
import { paysdata } from "../newAgent/paysData";

export default function PaysMonCompte() {
  return (
    <Select
      label="Pays"
      placeholder="Selectioner un pays"
      defaultSelectedKeys={["haiti"]}
      className="max-w-xs"
    >
      {paysdata.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
