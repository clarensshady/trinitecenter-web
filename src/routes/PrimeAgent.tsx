import { PrimeParAgent } from "../components/primeAgent/primeParAgent";

export interface IPrimeAgentProps {}

export function PrimeAgent() {
  return (
    <div className="px-3 py-7 sm:px-6 sm:py-10">
      <PrimeParAgent />
    </div>
  );
}
