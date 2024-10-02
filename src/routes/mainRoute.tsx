import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Dashboard } from "./dashboard";
import { Profile } from "./profile";
import { Home } from "./home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        element: <Dashboard />,
        path: "dashboard",
        children: [
          {
            element: <div>configuration</div>,
            path: "configuration",
          },
          {
            element: <div></div>,
            path: "configuration/tirages/listes",
          },
          {
            element: <div></div>,
            path: "configuration/prime_general/modification",
          },
          {
            element: <div>Prime par Agent</div>,
            path: "configuration/prime_par_agent",
          },
          {
            element: <div>Prime par tirages</div>,
            path: "configuration/prime_par_tirage",
          },
          {
            element: <div>Superviseur</div>,
            path: "configuration/superviseur/listes",
          },
        ],
      },
      {
        path: "Products",
        element: <Profile />,
      },
    ],
  },
]);

export default routers;
