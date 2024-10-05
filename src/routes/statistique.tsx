import { StatisticsComp } from "../components/statistique/Statistics";

export interface IListirageProps {}

export function Statistics() {
  return (
    <div className=" sm:px-6 px-3 py-7 sm:py-10">
      <StatisticsComp />
    </div>
  );
}
