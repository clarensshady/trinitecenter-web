import { LimiteJeuComp } from "../components/limiteJeu/limiteJeu";

export interface IListirageProps {}

export function LimiteJeu() {
  return (
    <div className="px-6 py-10">
      <LimiteJeuComp />
    </div>
  );
}
