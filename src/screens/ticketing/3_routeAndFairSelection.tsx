import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { getBusStops } from "../../constants/getLocalStorage";
import DropdownSearch from "../../components/dropdownSearch";
import converArrayIntoSearchStream from "../../utils/converArrayIntoSearchStream";
import { toast } from "react-toastify";
import { client } from "../../constants/urlPath";

const RouteSelection: React.FC = () => {

  const navigate= useNavigate()

  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  // INITIALIZATION START
  const { 
    busNumber, 
    busInitials,
    busColor, 
    busRoute,

    startingStop:startingStopContext, 
    setStartingStop:setStartingStopContext,
    endingStop:endingStopContext, 
    setEndingStop:setEndingStopContext,
    ticketCost:ticketCostContext, 
    setTicketCost:setTicketCostContext,
    ticketCount:ticketCountContext, 
    setTicketCount:setTicketCountContext,
    discount:discountContext, 
    setDiscount:setDiscountContext,
 } = context;

  useEffect(() => {
    if (!busNumber || !busInitials || !busColor || !busRoute) {
      toast.error("Essential information for ticket generation is inaccessable, Please re-initial the process");
      navigate(client.dashboard, {replace: true})
    }
  }, [busNumber, busInitials, busColor, busRoute, navigate]);
  // INITIALIZATION END

  const busStops = getBusStops();
  const [startingStop, setStartingStop]= useState<string>("")
  const [endStop, setEndStop]= useState<string>("")
  const [startingStopKey, setStartingStopKey]= useState<number>(0);
  const [endStopKey, setEndStopKey]= useState<number>(0);

  const startingStops:string[] = busStops.filter(elem=>elem!==endStop);
  const endStops:string[] = busStops.filter(elem=>elem!==startingStop);

  const [continueLoading, setCountinueLoading] = useState<boolean>(false)

  const handleStartingStopSelect = (selected: { label: string; value: string }) =>{
    setStartingStop(selected.value)
  }
  
  const handleEndStopSelect = (selected: { label: string; value: string }) =>{
    setEndStop(selected.value)
  }
  
  const handleContine = () => {
    setCountinueLoading(true)

    // if(!busInitial) {
    //   toast.error("Please Select Bus Initials")  
    //   setCountinueLoading(false)
    //   return
    // }
       
    // if(!busColor) {
    //   toast.error("Please Select Bus Color")
    //   setCountinueLoading(false)  
    //   return
    // }
       
    // if(!busRoute) {
    //   toast.error("Please Select Bus Route")  
    //   setCountinueLoading(false)
    //   return
    // }

    // setBusInitialsContext(busInitial)
    // setBusColorContext(busColor)
    // setBusRouteContext(busRoute)

    // toast.info("Bus Information Validated")

    setCountinueLoading(false)
  }

  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 ps-1 flex items-inline font-bold text-lg bg-transparent">
        <IoArrowBack className="text-2xl me-8 z-50" onClick={() => {}} />
        <span className="text-xl">Route Selection.</span>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Starting Stop</span>
        <div>
          <DropdownSearch
            key={"SelectStartingStop"+startingStopKey}
            options={converArrayIntoSearchStream(startingStops)}
            placeholder={startingStop || "Select Your Starting Stop"}
            onSelect={handleStartingStopSelect}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select End Stop</span>
        <div>
          <DropdownSearch
            key={"SelectEndStop"+endStopKey}
            options={converArrayIntoSearchStream(endStops)}
            placeholder={ endStop || "Select Your End Stop"}
            onSelect={handleEndStopSelect}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select End Stop</span>
{/* 
        <DropdownColorSelect
        key={busInitial}
        options={converArrayIntoSearchStream(busColors)}
        busColor={busColor || undefined}
        placeholder={()=>{
          // passing a functional prop instead of ternary operated string due to procedural complixity in the earlier stages
          if(!busColor) return "Select Bus Color";
          return `${busInitial || "(Initials not selected)"} ${busNumber || "(Bus number not accessable)"}`
        } 
      }
        onSelect={handleBusColorSelection}/> */}
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Route</span>
        <div>
          {/* <DropdownSearch
            key={"SelectRoute"}
            options={converArrayIntoSearchStream(busRoutes)}
            placeholder="Select Bus Route"
            onSelect={handleBusRouteSelection}
          /> */}
        </div>
      </div>
      
  
<div className="absolute bottom-8 w-full px-2 ">
  <button 
  className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
  onClick={handleContine}
  disabled={continueLoading}
  >
    {
    continueLoading ? 
    (<div className="spinner-border text-white"></div>):
    (<span>Continue</span>)
    }
    </button>
</div>


    </div>
  );
};

export default RouteSelection;
