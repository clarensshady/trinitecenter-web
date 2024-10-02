/* import { Logo } from "./Logo";
import "../../styles/loading.css";

export function Loading() {
  return (
    <div className="load">
      <span className="second" />
      <Logo />
    </div>
  );
} */

import { HashLoader } from "react-spinners";

export interface ILoadingProps {}

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <HashLoader
        color="blue"
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
