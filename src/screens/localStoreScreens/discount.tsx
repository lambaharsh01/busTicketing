import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { client } from "../../constants/urlPath";

import { getDiscount } from "../../constants/getLocalStorage";
import { setDiscount} from "../../constants/setLocalStorage";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";


const Discount: React.FC = () => {
  const navigate = useNavigate()
  const savedDiscount=getDiscount();

  useEffect(()=>{
    setDiscountValue(savedDiscount)
  }, [savedDiscount])

  const [continueLoading, setCountinueLoading]= useState<boolean>(false)
  const [discountValue, setDiscountValue]= useState<number>(0);

  const handleDiscountSave = () => {
    setCountinueLoading(true)
    const setDiscountValue= setDiscount(discountValue);
    if(setDiscountValue.success){
        toast.success("Discount Saved Successfully.")
    }else{
        toast.error(setDiscountValue.error)
    }
    setCountinueLoading(false)
  }


  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 ps-1 flex items-inline font-bold text-lg bg-transparent">
        <IoArrowBack className="text-2xl me-8 z-50" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">Discount.</span>
      </div>

    <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Ticket Discount</span>
        <div>
            <input 
            type="number" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md"
            placeholder="Enter ticket discount."
            value={discountValue}
            onChange={(e)=>setDiscountValue(Number(e.currentTarget.value))}
            />
        </div>
      </div>
      <div className="absolute bottom-8 w-full px-2 ">
        <button
        disabled={continueLoading}
          className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
          onClick={handleDiscountSave}
        >
          {continueLoading ? (
            <div className="spinner-border text-white"></div>
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Discount;
