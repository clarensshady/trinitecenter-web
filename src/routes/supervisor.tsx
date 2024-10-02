import { SupervisorComp } from "../components/supervisor/supervisorComp";

export interface IListirageProps {}

export function Superviseurs() {
  return (
    <div className="px-3 sm:px-6 py-10">
      <SupervisorComp />
    </div>
  );
}
