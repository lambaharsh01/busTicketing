import { useContext, useEffect, useState } from "react";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { getBusColors, getBusInitials } from "../../constants/getLocalStorage";
import DropdownSearch from "../../components/dropdownSearch";
import DropdownColorSelect from "../../components/dropdownColorSelect";
import converArrayIntoSearchStream from "../../utils/converArrayIntoSearchStream";
import { toast } from "react-toastify";

const BusInfo: React.FC = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }
  const { busNumber } = context;

  useEffect(() => {
    if (!busNumber) {
      toast.error("Bus number is inaccessable, Please re-initial the process");
      // IMPORTANT: CHANGE AFTER DEVELOPMENT(ADD RELOCATION TO DASBOARD)
    }
  }, [busNumber]);

  const busColors = getBusColors();
  const [busInitials, setBusInitials] = useState<string>("");
  const [busColor, setBusColor]= useState<string>("");

  return (
    <div className="h-screen">
      <div className=" mb-2 pt-2 ps-1 flex items-inline font-bold text-lg bg-transparent">
        <IoArrowBack className="text-2xl me-8 z-50" onClick={() => {}} />
        <span className="text-xl">Route Selection.</span>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Initials</span>
        <div>
          <DropdownSearch
            options={converArrayIntoSearchStream(getBusInitials())}
            placeholder="Select Bus Initials"
            onSelect={(selected: { label: string; value: string }) =>{
              setBusInitials(selected.value)
            }}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Color</span>

        <DropdownColorSelect
        key={busInitials}
        options={converArrayIntoSearchStream(busColors)}
        busColor={busColor || undefined}
        placeholder={()=>{
          // passing a functional prop instead of ternary operated string due to procedural complixity in the earlier stages
          if(!busColor) return "Select Bus Color";
          return `${busInitials || "(Initials not selected)"} ${busNumber || "(Bus number not accessable)"}`
        } 
      }
        onSelect={(string)=>{
          setBusColor(string)
        }}/>
      </div>

      {/* <div className="w-100">hELLO WORLD</div>
      <div className="w-100">hELLO WORLD</div>
      <div className="w-100">hELLO WORLD</div> */}
    </div>
  );
};

export default BusInfo;
