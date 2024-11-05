import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BusContext } from "../contexts/busContext";
import { IoMdBus } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { leftPad, numberPadding } from "../utils/structures";
import { formatDate } from "../utils/time";
import { getTicketStore } from "../utils/getLocalStorage";
import { busTicketStorageInterface } from "../constants/interfaces";
import { client } from "../constants/urlPath";

const AllTicketsComponent: React.FC = () => {

  const navigate = useNavigate();
  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  useEffect(()=>{
    setAllTickets(getTicketStore())
  },[])

  const [allTickets, setAllTickets]= useState<busTicketStorageInterface[]>([])

  const {
    setBusNumber,
    setBusColor,
    setBusInitials,
    setBusRoute,
    setStartingStop,
    setEndingStop,
    setDiscountedCost,
    setTicketCost,
    setTicketCount,
    setTime
  }= context;

  const setBusContext = (busInfo: busTicketStorageInterface)=>{
  
    setBusNumber(busInfo.busNumber)
    setBusColor(busInfo.busColor)
    setBusInitials(busInfo.busInitials)
    setBusRoute(busInfo.busRoute)
    setStartingStop(busInfo.startingStop)
    setEndingStop(busInfo.endingStop)
    setDiscountedCost(busInfo.discountedCost)
    setTicketCost(busInfo.totalCost)
    setTicketCount(busInfo.ticketCount)
    setTime(busInfo.bookingTime)

    navigate(client.ticket)
  }
  
  return (
    <div className="w-full">
      {allTickets.map((busInfo, index) => (
        <div 
        className="mb-4 w-full shadow-md border rounded-lg pointers"
        onClick={()=>setBusContext(busInfo)}
        key={"ticket-" + index}
        >
          <div
            className="w-full min-h-2 rounded-t-lg bg-blue-300"
            style={{ backgroundColor: busInfo.busColor }}
          ></div>
          <div className="w-full bg-white pt-3 px-3 rounded-b-lg">
            <div className="w-full flex justify-between">
              <div className="flex w-1/2">
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: busInfo.busColor }}
                >
                  <IoMdBus className="text-white" style={{ fontSize: 24 }} />
                </div>

                <div className="ps-2 h-full">
                  <h6 className="font-extrabold -mb-1 mt-0.5">{busInfo.busRoute}</h6>
                  <span className="text-sm text-gray-400">{busInfo.busInitials + busInfo.busNumber}</span>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button className="bg-green-700 text-sm text-white rounded-full px-2.5 py-1">
                  success
                </button>
              </div>
            </div>

            <div className="w-full pt-3 mb-1 text-gray-600 flex"
            style={{fontSize:17, fontWeight:500}}>
              {leftPad(busInfo.startingStop)}
              <FaArrowRightLong className="mt-1 mx-2"/> 
              {leftPad(busInfo.endingStop)}
            </div>

            <div className="border max-h-1 mt-3"></div>

            <div className="flex items-center py-2.5">
              <div className="w-1/2">{formatDate(busInfo.bookingTime)}</div>
              <div className="w-1/2 text-lg flex justify-end font-extrabold">
                
                ₹{numberPadding(busInfo.totalCost)}x{busInfo.ticketCount}=₹{numberPadding(busInfo.discountedCost)}
              </div>
            </div>

            <div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTicketsComponent;
