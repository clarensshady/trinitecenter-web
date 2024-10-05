import { LotGagnantComp } from "../components/lotsGagnant/lotsGagnant";

export interface IListirageProps {}

export function LotsGagnant() {
  return (
    <div className="px-3 sm:py-10 sm:px-6 py-7">
      <LotGagnantComp />
    </div>
  );
}
