import { Select, SelectItem } from "@nextui-org/react";
import { AgentData } from "./agentData";

export default function SelectAgent() {
  return (
    <Select label="Agent" defaultSelectedKeys={["tout"]} className="max-w-xs">
      {AgentData.map((s) => (
        <SelectItem key={s.key}>{s.label}</SelectItem>
      ))}
    </Select>
  );
}
