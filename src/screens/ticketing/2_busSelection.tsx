import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { BsArrowLeftRight } from "react-icons/bs";
import { LiaRouteSolid } from "react-icons/lia";
import {
  getBusColors,
  getBusInitials,
  getBusRoutes,
  getBusRoutesInfo,
} from "../../utils/getLocalStorage";
import DropdownSearch from "../../components/dropdownSearch";
import DropdownColorSelect from "../../components/dropdownColorSelect";
import converArrayIntoSearchStream from "../../utils/converArrayIntoSearchStream";
import { toast } from "react-toastify";
import { client } from "../../constants/urlPath";
import { busRouteInterface } from "../../constants/interfaces";
import { getTicketProcessingStatus } from "../../utils/getLocalStorage";
import { selectLaterOption } from "../../constants/strings";

const BusSelection: React.FC = () => {
  const navigate = useNavigate();

  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  useEffect(()=>{
    const startedProcessing= getTicketProcessingStatus()
    if(!startedProcessing){
      navigate(client.dashboard, {replace:true})
    }
  }, [navigate])

  const busColors = getBusColors();
  const busInitials = getBusInitials();
  const busRoutes = getBusRoutes(); // messed up configuration because of later configuration/ logic change
  const allBusRoutes = getBusRoutesInfo(); // messed up configuration because of later configuration/ logic change

  const [busInitial, setBusInitial] = useState<string>("");
  const [busColor, setBusColor] = useState<string>("");
  const [busRoute, setBusRoute] = useState<string>("");

  const [busTerminals, setBusTerminals] = useState<busRouteInterface>({ route:"", terminalA:"", terminalB:""})

  const [continueLoading, setCountinueLoading] = useState<boolean>(false);
  const [busCountComponent, setBusCountComponent] = useState<number>(0);

  // INITIALIZATION PAST DATA START
  const {
    busNumber,
    busInitials: busInitialsContext,
    setBusInitials: setBusInitialsContext,
    busColor: busColorContext,
    setBusColor: setBusColorContext,
    busRoute: busRouteContext,
    setBusRoute: setBusRouteContext,
  } = context;

  useEffect(() => {
    if (!busNumber) {
      toast.error("Bus number is inaccessable, Please re-initial the process");
      navigate(client.dashboard, { replace: true });
    }
  }, [busNumber, navigate]);

  useEffect(() => {
    if (busInitialsContext) setBusInitial(busInitialsContext);
  }, [busInitialsContext]);

  useEffect(() => {
    if (busColorContext) setBusColor(busColorContext);
  }, [busColorContext]);

  useEffect(() => {
    if (busRouteContext) setBusRoute(busRouteContext);
    setBusCountComponent((prevCount) => prevCount + 1);
  }, [busRouteContext]);
  
  // INITIALIZATION PAST DATA END

  const handleBusInitialsSelection = (selected: {
    label: string;
    value: string;
  }) => {
    setBusInitial(selected.value);
  };

  const handleBusColorSelection = (string: string) => {
    setBusColor(string);
  };

  const handleBusRouteSelection = (selected: {
    label: string;
    value: string;
  }) => {
    setBusRoute(selected.value);
    setBusTerminals(allBusRoutes.filter(elem=> elem.route===selected.value)[0])
  };

  const handleContinue = () => {
    setCountinueLoading(true);

    if (!busInitial) {
      toast.error("Please Select Bus Initials");
      setCountinueLoading(false);
      return;
    }

    if (!busColor) {
      toast.error("Please Select Bus Color");
      setCountinueLoading(false);
      return;
    }

    if (!busRoute) {
      toast.error("Please Select Bus Route");
      setCountinueLoading(false);
      return;
    }

    setBusInitialsContext(busInitial);
    setBusColorContext(busColor);
    setBusRouteContext(busRoute);

    toast.info("Bus Information Validated");

    navigate(client.routeSelection);

    setCountinueLoading(false);
  };

  const handleAddRouteRedirection = () =>{

    setBusInitialsContext(busInitial);
    setBusColorContext(busColor);
    // setBusRouteContext(busRoute);

    navigate(client.route)
  }

  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 ps-1 flex items-inline font-bold text-lg bg-transparent">
        <IoArrowBack className="text-2xl me-8 z-50" onClick={() => {}} />
        <span className="text-xl">Bus Selection.</span>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Initials</span>
        <div>
          <DropdownSearch
            key={"SelectInitials"}
            options={converArrayIntoSearchStream(busInitials)}
            placeholder={busColorContext || "Select Bus Initials"}
            onSelect={handleBusInitialsSelection}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Color</span>

        <DropdownColorSelect
          key={busInitial}
          options={converArrayIntoSearchStream(busColors)}
          busColor={busColor || undefined}
          placeholder={() => {
            // passing a functional prop instead of ternary operated string due to procedural complixity in the earlier stages
            if (!busColor) return "Select Bus Color";
            return `${busInitial || "(Initials not selected)"} ${
              busNumber || "(Bus number not accessable)"
            }`;
          }}
          onSelect={handleBusColorSelection}
        />
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Route</span>
        {busTerminals.route && (<div className="flex justify-between pb-1.5 w-full">
        <div className="flex">
          <span className="text-md font-medium text-slate-400">{busTerminals.terminalA}</span>
          <BsArrowLeftRight className="mx-3"/>
          <span className="text-md font-medium text-slate-400">{busTerminals.terminalB}</span>
        </div>
        { (busTerminals.terminalA === selectLaterOption || busTerminals.terminalB === selectLaterOption) && (
          <div 
          className="flex pointers"
          onClick={handleAddRouteRedirection}
          >
          <span className="text-sm font-medium text-blue-400">Add Route</span>
          <LiaRouteSolid className="text-xl me-1 text-blue-400"/> 
          </div>
        )}
        </div>)}
        <div>
          <DropdownSearch
            key={"SelectRoute" + busCountComponent}
            options={converArrayIntoSearchStream(busRoutes)}
            placeholder={busRoute || "Select Bus Route"}
            onSelect={handleBusRouteSelection}
          />
        </div>
      </div>

      <div className="absolute bottom-8 w-full px-2 ">
        <button
          className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
          onClick={handleContinue}
        >
          {continueLoading ? (
            <div className="spinner-border text-white"></div>
          ) : (
            <span>Continue</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BusSelection;
