import { useContext } from "react";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { getBusColors } from "../../constants/getLocalStorage";

const BusSelection: React.FC=()=>{

    const context= useContext(BusContext)
    if(!context){
        throw new Error("This Component must be used within a BusProvider to access the values of it.")
    }
    const {busNumber}= context;

    const busColors= getBusColors();

    return(
        <div className="h-screen relative">
                  <div className="pt-2 ps-1 flex items-inline font-bold text-lg absolute top-0 bg-transparent">
        <IoArrowBack 
        className="text-2xl me-8 z-50"
        onClick={()=>{}}
        /> 
        <span className="text-xl">Scan QR present In the bus.</span>
      </div>


        </div>
    )

}

export default BusSelection;

