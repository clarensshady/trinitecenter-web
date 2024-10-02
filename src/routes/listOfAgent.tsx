import { Agents } from "../components/listAgent/agents";

export interface IListOfAgentProps {}

export function ListOfAgent() {
  return (
    <div className="px-3 md:px-6 py-10">
      <Agents />
    </div>
  );
}
