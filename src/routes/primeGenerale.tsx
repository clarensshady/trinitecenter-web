import { PrimeTirageComp } from "../components/primeGenerale/primeGenerale";

export interface IPrimeTirageProps {}

export function PrimeGenerale(props: IPrimeTirageProps) {
  return (
    <div className="px-6 py-10">
      <PrimeTirageComp />
    </div>
  );
}
