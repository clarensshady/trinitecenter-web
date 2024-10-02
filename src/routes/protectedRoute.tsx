// internal imports of ressources
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import __ from "lodash";
import useLotteryStore from "../store/GlobalData";

const ProtectedRoute = () => {
  const token = useLotteryStore((state) => state.isAuthenticated);

  let isAuthenticated: boolean = false;

  if (token) {
    isAuthenticated = true;
  }
  if (typeof window === "undefined") {
    // if end user out of the window, set authenticated to false
    isAuthenticated = false;
  }

  const isAuth: React.ReactElement | null =
    __.isBoolean(isAuthenticated) && isAuthenticated ? (
      <Outlet />
    ) : (
      Navigate({ to: "/" })
    );

  return isAuth;
};

export default ProtectedRoute;

// this page makes the majority routes of the project protected and gives access to
// only authenticated users to all routes of the project
