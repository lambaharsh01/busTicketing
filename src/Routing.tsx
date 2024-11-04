import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { client } from "./constants/urlPath";

// import Index from "./screens/index";
import Dashboard from "./screens/dashboard";

import ScanBusNumber from "./screens/ticketing/1_scanBusNumber";
import BusSelection from "./screens/ticketing/2_busSelection";
import RouteSelection from "./screens/ticketing/3_routeAndFairSelection";
import Ticket from "./screens/ticketing/4_ticket";

import Discount from "./screens/localStoreScreens/discount";
import Colors from "./screens/localStoreScreens/colors";
import Initials from "./screens/localStoreScreens/initials";
import BusRoute from "./screens/localStoreScreens/route";
import Stops from "./screens/localStoreScreens/stops";
import Customize from "./screens/localStoreScreens/customize";

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
          {/* <Route path={client.dashboard} element={<Index />} /> */}
          <Route path={client.dashboard} element={<Dashboard />} />

          <Route
            path={client.scanBusNumber}
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

          <Route
            path={client.ticket}
            element={
              <BusProvider>
                <Ticket />
              </BusProvider>
            }
          />

          <Route path={client.discount} element={<Discount />} />

          <Route path={client.colors} element={<Colors />} />

          <Route path={client.initials} element={<Initials />} />

          <Route path={client.route} element={<BusRoute />} />

          <Route path={client.stops} element={<Stops />} />
          <Route path={client.customize} element={<Customize />} />

          {/* <Route path="/viewVisit/:visitId" element={<ViewVisit />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
