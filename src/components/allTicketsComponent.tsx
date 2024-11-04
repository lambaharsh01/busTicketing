// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
// import { RiChatDeleteFill } from "react-icons/ri";
// import { BiSolidCommentEdit } from "react-icons/bi";

import { client } from "../constants/urlPath";
// import { toast } from "react-toastify";

const AllTicketsComponent: React.FC = () => {
const navigate = useNavigate()

//   const [busInitialsArray, setBusInitialsArray]= useState<string[]>([]);
//   const [continueLoading, setCountinueLoading]= useState<boolean>(false)

 
  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
        <IoArrowBack className="text-2xl me-8 z-10" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">All Tickets</span>
        </span>
      </div>
      <div className="mt-4 w-full px-3">      
      <div>
        </div>
      </div>
    </div>
  );
};

export default AllTicketsComponent;
