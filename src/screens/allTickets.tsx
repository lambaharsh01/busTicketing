import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { client } from "../constants/urlPath";
import AllTicketsComponent from "../components/allTicketsComponent";

const AllTickets: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
          <IoArrowBack
            className="text-2xl me-8 z-10"
            onClick={() => navigate(client.dashboard, { replace: true })}
          />
          <span className="text-xl">All Tickets</span>
        </span>
      </div>

      <div className="w-full px-2 pt-1">
          <AllTicketsComponent key="allTickets"/>
      </div>
    </div>
  );
};

export default AllTickets;
