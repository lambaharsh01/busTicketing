import { useContext, useEffect, useState } from "react";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { getBusColors, getBusInitials } from "../../constants/getLocalStorage";
import DropdownSearch from "../../components/dropdownSearch";
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
    }
  }, [busNumber]);

  const busColors = getBusColors();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [busInitials, setBusInitials] = useState<string>("");

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
            onSelect={(selected: { label: string; value: string }) =>
              setBusInitials(selected.value)
            }
          />
        </div>
      </div>
      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select Bus Color</span>
        {busColors.map((elem, index) => (
          <div
            style={{ backgroundColor: elem }}
            className={`min-h-10 mb-2 px-2 rounded-md flex items-center`}
            onClick={() => setSelectedIndex(index)}
          >
            {selectedIndex === index && (
              <div className="min-h-6 w-100 bg-transparent text-white text-sm flex items-center px-1 rounded-sm font-bold">
                {busInitials || "(Initials not selected)"}
                {busNumber || " (Bus number not accessable)"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="w-100">hELLO WORLD</div>
      <div className="w-100">hELLO WORLD</div>
      <div className="w-100">hELLO WORLD</div> */}
    </div>
  );
};

export default BusInfo;
