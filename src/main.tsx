import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { Home } from "./routes/home";
//import { Dashboard } from "./routes/dashboard";
import RouteApp from "./pickRouter";
import Loading from "./components/Loading/LoadingFallback";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <RouteApp />
        </React.Suspense>
      </BrowserRouter>
      {/* <RouterProvider router={routers} /> */}
    </NextUIProvider>
  </StrictMode>
);
