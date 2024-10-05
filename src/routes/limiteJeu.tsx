import { LimiteJeuComp } from "../components/limiteJeu/limiteJeu";

export interface IListirageProps {}

export function LimiteJeu() {
  return (
    <div className="px-3 py-7 sm:px-6 sm:py-10">
      <LimiteJeuComp />
    </div>
  );
}
