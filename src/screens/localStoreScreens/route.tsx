import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiChatDeleteFill } from "react-icons/ri";
import { BiSolidCommentEdit } from "react-icons/bi";

import { client } from "../../constants/urlPath";

import { getBusColors } from "../../constants/getLocalStorage";
import useClickOutside from "../../utils/useClickOutside";

import { setBusColor} from "../../constants/setLocalStorage";
import { toast } from "react-toastify";

const BusRoute: React.FC = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const savedBusColors=getBusColors();
    setBusColorsArray(savedBusColors)
  }, [])

  
  const [busColorsArray, setBusColorsArray]= useState<string[]>([]);
  const [continueLoading, setCountinueLoading]= useState<boolean>(false)

  const upsertValidation = (colorString: string) :string =>{
    const trimmedNewColor=colorString.trim();
    if(trimmedNewColor.length<3 || trimmedNewColor.includes(" ")){
        toast.error("Bus Invalid Bus Color.")
        return ""
    }

    if(busColorsArray.includes(trimmedNewColor.trim())){
        toast.error("Bus Color Exists.")
        return ""
    }

    return trimmedNewColor
  }
  
  
  const addColorClass:string = "addModalElement";
  useClickOutside(addColorClass, () => setAddModalOpen(false));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newColor, setNewColor]= useState<string>("")

  useEffect(()=>{
    setNewColor("")
  }, [addModalOpen])

  const addColorFunc= ()=>{
    const trimmedNewColor= upsertValidation(newColor)
    if(trimmedNewColor){
        setAddModalOpen(false)
        setBusColorsArray(prevArray=>[trimmedNewColor, ...prevArray])
        toast.success("Bus Color Added.")
    }
  }


  const editColorClass:string = "editModalElement"
  useClickOutside(editColorClass, () => setEditModalOpen(false));

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [colorToBeEditedIndex, setColorToBeEditedIndex]= useState<number>(-1)
  const [editedColor, setEditedColor]= useState<string>("")

  const stageEdit = (elemIndex:number)=>{
    setEditedColor(busColorsArray[elemIndex])
    setColorToBeEditedIndex(elemIndex)
    setEditModalOpen(true)
  }

  const editColorFunc= () =>{
    setBusColorsArray(prevArray=>{
        prevArray[colorToBeEditedIndex]= editedColor
        return prevArray
    })
    toast.success("Bus Color Edited.")
    setEditedColor("")
    setColorToBeEditedIndex(-1)
    setEditModalOpen(false)
    
  }

  
  const deleteColorFunc = (colorString:string) => {
    const deleteColorConfirmation = window.confirm("Please confirm the removal of the selected bus color from the list");
    if(deleteColorConfirmation){
        setBusColorsArray(prevArray=>prevArray.filter(elem=>elem!==colorString))
        toast.success("Bus Color Removed.")
    }
  }
  

  const handleBusColorSave = () => {
    setCountinueLoading(true)
    const setBusColorValue= setBusColor(busColorsArray)
    if(setBusColorValue.success){
        toast.success("Bus Colors Saved Successfully.")
    }else{
        toast.error(setBusColorValue.error)
    }
    setCountinueLoading(false)
  }




  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
        <IoArrowBack className="text-2xl me-8 z-10" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">Bus Color.</span>
        </span>
        <span className="text-2xl pe-2">
            <button className="cayanBackground p-0.5 rounded-md">
                <IoMdAdd 
                className="text-white addModalElement"
                onClick={()=>setAddModalOpen(true)}
                />
            </button>
        </span>
      </div>

    <div className="mt-4 w-full px-3">      
        {busColorsArray.map((elem, index)=>(
            <div className="w-full flex text-lg font-medium border shadow-sm mb-3 py-2 px-1 rounded">
                <div className="w-3/5">
                    <span>{elem}</span>
                </div>

                <div className="w-2/5 flex justify-around">
                    <div 
                    className="min-h-3 max-h-7 min-w-7 rounded-md" 
                    style={{background:elem}}></div>
                    <BiSolidCommentEdit 
                    className={`text-3xl text-blue-500 ${editColorClass}`}
                    onClick={()=>stageEdit(index)}
                    />
                    <RiChatDeleteFill 
                    className="text-3xl text-red-500"
                    onClick={()=>deleteColorFunc(elem)}
                    />
                </div>
            </div>
        ))}
    <div>
        </div>
      </div>
      <div className="absolute bottom-8 w-full px-2 ">
        <button
        disabled={continueLoading}
          className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
          onClick={handleBusColorSave}
        >
          {continueLoading ? (
            <div className="spinner-border text-white"></div>
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>


{/* MODALS */}
{addModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${addColorClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
            <div className="flex justify-between">
                <h5>Add Color</h5>
                <span className="min-w-7 min-h-7 rounded-md" style={{backgroundColor:newColor}}></span>
            </div>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Color Code."
            value={newColor}
            onChange={(e)=>setNewColor(e.currentTarget.value.toLowerCase())}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={addColorFunc}
    >Merge Add</button>
</div>
        </div>
      </div>
)}
{editModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${editColorClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
            <div className="flex justify-between">
                <h5>Edit Color</h5>
                <span className="min-w-7 min-h-7 rounded-md" style={{backgroundColor:editedColor}}></span>
            </div>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Color Code."
            value={editedColor}
            onChange={(e)=>setEditedColor(e.currentTarget.value.toLowerCase())}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={editColorFunc}
    > Merge Edit </button>
</div>
        </div>
      </div>
)}

    </div>
  );
};

export default BusRoute;
