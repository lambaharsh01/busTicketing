import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Index from "./screens/index";
import Dashboard from "./screens/dashboard";
import ScanBusInitials from "./screens/ticketing/1_scanBusInitials";
import BusInfo from "./screens/ticketing/2_busInfo";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/scan-bus-initials"
            element={
              <BusProvider>
                <ScanBusInitials />
              </BusProvider>
            }
          />
          <Route
            path="/bus-selection"
            element={
              <BusProvider>
                <BusInfo />
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
