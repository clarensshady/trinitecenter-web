import { NavbarScreen } from "../components/navbar";
import Authentication from "../components/connecter";
import { Navigate } from "react-router-dom";
import useLotteryStore from "../store/GlobalData";

export function Home() {
  const { isAuthenticated } = useLotteryStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <>
      {isAuthenticated ? (
        Navigate({ to: "/dashboard" })
      ) : (
        <div>
          <NavbarScreen />
          <div className="flex h-[100vh] w-full justify-center items-center ">
            <Authentication />
          </div>
        </div>
      )}
    </>
  );
}
