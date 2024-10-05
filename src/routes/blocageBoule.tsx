import { BlocageBouleComp } from "../components/blocageBoule/blockageboule";

export interface IListirageProps {}

export function BlocageBoule() {
  return (
    <div className="px-3 sm:px-6 sm:py-10 py-7">
      <BlocageBouleComp />
    </div>
  );
}
