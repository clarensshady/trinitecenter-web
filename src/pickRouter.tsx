import { Route, Routes } from "react-router-dom";
import { TableauDeBord } from "./routes/tableauDeBord";
import { Listirage } from "./routes/listeTirage";
import { PrimeGenerale } from "./routes/primeGenerale";
import { PrimeAgent } from "./routes/PrimeAgent";
import { PrimeTirage } from "./routes/primeTirage";
import { Superviseurs } from "./routes/supervisor";
import { NewAgent } from "./routes/newAgent";
import { ListOfAgent } from "./routes/listOfAgent";
import { MyAccount } from "./routes/myAccount";
import { BlocageBoule } from "./routes/blocageBoule";
import { LotsGagnant } from "./routes/lotsGagnant";
import { Statistics } from "./routes/statistique";
import { ListOptions } from "./routes/listeDesOptions";
import { LimiteJeu } from "./routes/limiteJeu";
import { LimiteJeuParAgent } from "./routes/limiteJeuParAgent";
import { LimiteBoule } from "./routes/limiteBoule";
import { LimiteBouleParAgent } from "./routes/limiteBouleParAgent";
import { NewSurccussale } from "./routes/newSurcussale";
import { Ventes } from "./routes/ventes";
import { RapportParAgent } from "./routes/listeDesRapportParAgent";
import { FicheVendu } from "./routes/ficheVendu";
import { FicheGagnants } from "./routes/ficheGangnants";
import { FicheEliminer } from "./routes/ficheElimine";
import { Home } from "./routes/home";
import React from "react";
import { EditLimiteBoule } from "./routes/editLimiteBoule";
import InitiateLimite from "./routes/initiateLimiteBoule";
import { EditLimiteJeu } from "./routes/editLimiteJeu";
import InitiateLimiteJeu from "./routes/initiateLimiteJeu";
import InitiateLotGagnant from "./components/lotsGagnant/initiateLogagnant";
import { EditLogGagnant } from "./components/lotsGagnant/editLotGagnant";
import InitiateAgent from "./routes/initiateAgent";
import { EditAgent } from "./components/listAgent/Edit";
import InitialSuperviseur from "./routes/initialSuperviseur";
import { EditSuperviseur } from "./routes/EditSupervisor";
import ProtectedRoute from "./routes/protectedRoute";
import InitiateTirage from "./routes/initialTirage";
import { EditTirage } from "./routes/EditTirages";
const App = React.lazy(() => import("./App"));
const Dashboard = React.lazy(() => import("./routes/dashboard"));
import AllSurcussales from "./routes/allsurcussales";
import InitiateSurcussale from "./routes/initialEditSurcussale";
import { EditSurcussale } from "./components/surccusale/Edit";
import InitialFicheVendu from "./routes/intialFicheVendu";
import { PayerFiche } from "./components/ficheVendu/payFiche";

const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<TableauDeBord />} />
            <Route
              path="configuration/tirages/listes"
              element={<InitiateTirage />}
            >
              <Route index element={<Listirage />} />
              <Route path="edit/:id" element={<EditTirage />} />
            </Route>
            <Route
              path="configuration/prime_general/modification"
              element={<PrimeGenerale />}
            />
            <Route
              path="configuration/prime_par_agent"
              element={<PrimeAgent />}
            />

            <Route
              path="configuration/prime_par_tirage"
              element={<PrimeTirage />}
            />
            <Route
              path="configuration/superviseur/listes"
              element={<InitialSuperviseur />}
            >
              <Route index element={<Superviseurs />} />
              <Route path="edit/:id" element={<EditSuperviseur />} />
            </Route>
            <Route path="agent/new" element={<NewAgent />} />
            <Route path="agent/list" element={<InitiateAgent />}>
              <Route index element={<ListOfAgent />} />
              <Route path="edit/:id" element={<EditAgent />} />
            </Route>
            <Route path="user/account" element={<MyAccount />} />
            <Route path="tirage/list" element={<InitiateLotGagnant />}>
              <Route index element={<LotsGagnant />} />
              <Route path="edit/:id" element={<EditLogGagnant />} />
            </Route>
            <Route path="borlette/blockage-boule" element={<BlocageBoule />} />
            <Route path="borlette/statistique" element={<Statistics />} />
            <Route path="borlette/lotto" element={<ListOptions />} />
            <Route path="borlette/limite-game" element={<InitiateLimiteJeu />}>
              <Route index element={<LimiteJeu />} />
              <Route path="edit/:id" element={<EditLimiteJeu />} />
            </Route>
            <Route
              path="borlette/limite-game-par-agent"
              element={<LimiteJeuParAgent />}
            />
            <Route path="borlette/limite-boule" element={<InitiateLimite />}>
              <Route index element={<LimiteBoule />} />
              <Route path="edit/:id" element={<EditLimiteBoule />} />
            </Route>
            <Route
              path="borlette/limite-boule-par-agent"
              element={<LimiteBouleParAgent />}
            />

            <Route path="surccussale/new" element={<NewSurccussale />} />
            <Route path="surccusale/listes" element={<InitiateSurcussale />}>
              <Route index element={<AllSurcussales />} />
              <Route path="edit/:id" element={<EditSurcussale />} />
            </Route>
            <Route path="rapports/root" element={<Ventes />} />
            <Route path="rapports/agent" element={<RapportParAgent />} />

            <Route path="rapports/liste-fiches" element={<InitialFicheVendu />}>
              <Route index element={<FicheVendu />} />
              <Route path="pay/:id" element={<PayerFiche />} />
            </Route>
            <Route
              path="rapports/liste-fiches-gagnant"
              element={<FicheGagnants />}
            />
            <Route
              path="rapports/liste-fiches-supprimer"
              element={<FicheEliminer />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default RouteApp;
