import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Index from "./screens/index";
import Dashboard from "./screens/dashboard";
import ScanBusInitials from "./screens/ticketing/scanBusInitials";

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
          <Route path="/scanBusInitials" element={<ScanBusInitials />} />
          {/* <Route path="/viewVisit/:visitId" element={<ViewVisit />} /> */}
          {/* <Route path="/viewVisit/:visitId" element={<ViewVisit />} /> */}
          {/* <Route path="/signIn" element={<SignIn />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
