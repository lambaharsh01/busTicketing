import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { client } from "./constants/urlPath";

import Index from "./screens/index";
import Dashboard from "./screens/dashboard";
import ScanBusNumber from "./screens/ticketing/1_scanBusNumber";
import BusSelection from "./screens/ticketing/2_busSelection";
import RouteSelection from "./screens/ticketing/3_routeAndFairSelection";

import { BusProvider } from "./contexts/busContext";

function Routing() {
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        draggablePercent={20}
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path={client.dashboard} element={<Dashboard />} />
          <Route
            path="/scan-bus-number"
            element={
              <BusProvider>
                <ScanBusNumber />
              </BusProvider>
            }
          />

          <Route
            path={client.busSelection}
            element={
              <BusProvider>
                <BusSelection />
              </BusProvider>
            }
          />

          <Route
            path={client.routeSelection}
            element={
              <BusProvider>
                <RouteSelection />
              </BusProvider>
            }
          />
          {/* <Route path="/viewVisit/:visitId" element={<ViewVisit />} /> */}
          {/* <Route path="/viewVisit/:visitId" element={<ViewVisit />} /> */}
          {/* <Route path="/signIn" element={<SignIn />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
