import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiChatDeleteFill } from "react-icons/ri";
import { BiSolidCommentEdit } from "react-icons/bi";

import { client } from "../../constants/urlPath";

import { getBusStops } from "../../utils/getLocalStorage";
import useClickOutside from "../../utils/useClickOutside";

import { setBusStops} from "../../utils/setLocalStorage";
import { toast } from "react-toastify";

const Stops: React.FC = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const savedBusStops=getBusStops();
    setBusStopsArray(savedBusStops)
  }, [])

  
  const [busStopsArray, setBusStopsArray]= useState<string[]>([]);
  const [continueLoading, setCountinueLoading]= useState<boolean>(false)

  const upsertValidation = (colorString: string) :string =>{
    const trimmedNewStop=colorString.trim();
    if(trimmedNewStop.length<3 || trimmedNewStop.includes(" ")){
        toast.error("Bus Invalid Bus Stop.")
        return ""
    }

    if(busStopsArray.includes(trimmedNewStop.trim())){
        toast.error("Bus Stop Exists.")
        return ""
    }

    return trimmedNewStop
  }
  
  
  const addStopClass:string = "addModalElement";
  useClickOutside(addStopClass, () => setAddModalOpen(false));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newStop, setNewStop]= useState<string>("")

  useEffect(()=>{
    setNewStop("")
  }, [addModalOpen])

  const addStopFunc= ()=>{
    const trimmedNewStop= upsertValidation(newStop)
    if(trimmedNewStop){
        setAddModalOpen(false)
        setBusStopsArray(prevArray=>[trimmedNewStop, ...prevArray])
        toast.success("Bus Stop Added.")
    }
  }


  const editStopClass:string = "editModalElement"
  useClickOutside(editStopClass, () => setEditModalOpen(false));

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [colorToBeEditedIndex, setStopToBeEditedIndex]= useState<number>(-1)
  const [editedStop, setEditedStop]= useState<string>("")

  const stageEdit = (elemIndex:number)=>{
    setEditedStop(busStopsArray[elemIndex])
    setStopToBeEditedIndex(elemIndex)
    setEditModalOpen(true)
  }

  const editStopFunc= () =>{
    setBusStopsArray(prevArray=>{
        prevArray[colorToBeEditedIndex]= editedStop
        return prevArray
    })
    toast.success("Bus Stop Edited.")
    setEditedStop("")
    setStopToBeEditedIndex(-1)
    setEditModalOpen(false)
    
  }

  
  const deleteStopFunc = (colorString:string) => {
    const deleteStopConfirmation = window.confirm("Please confirm the removal of the selected bus color from the list");
    if(deleteStopConfirmation){
        setBusStopsArray(prevArray=>prevArray.filter(elem=>elem!==colorString))
        toast.success("Bus Stop Removed.")
    }
  }
  

  const handleBusStopSave = () => {
    setCountinueLoading(true)
    
    setBusStops(busStopsArray).then(res=>{
      toast.success("Bus Stops Saved Successfully.")
      setCountinueLoading(false)
    }).catch(err=>{
      toast.error(err.message)
      setCountinueLoading(false)
    })
  }




  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
        <IoArrowBack className="text-2xl me-8 z-10" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">Bus Stops.</span>
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
        {busStopsArray.map((elem, index)=>(
            <div className="w-full flex text-lg font-medium border shadow-sm mb-3 py-2 px-1 rounded">
                <div className="w-3/5">
                    <span>{elem}</span>
                </div>

                <div className="w-2/5 flex justify-around">
                    <BiSolidCommentEdit 
                    className={`text-3xl text-blue-500 ${editStopClass}`}
                    onClick={()=>stageEdit(index)}
                    />
                    <RiChatDeleteFill 
                    className="text-3xl text-red-500"
                    onClick={()=>deleteStopFunc(elem)}
                    />
                </div>
            </div>
        ))}
    <div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-white min-h-16 w-full py-2 border-0 rounded-t-md">
      <div className="w-full px-2">
        <button
        disabled={continueLoading}
          className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
          onClick={handleBusStopSave}
        >
          {continueLoading ? (
            <div className="spinner-border text-white"></div>
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
      </div>


{/* MODALS */}
{addModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${addStopClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
                <h5>Add Stop<span className="text-xs"> (Click outside of modal to close)</span></h5>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Stop Code."
            value={newStop}
            onChange={(e)=>setNewStop(e.currentTarget.value)}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={addStopFunc}
    >Merge Add</button>
</div>
        </div>
      </div>
)}
{editModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${editStopClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
            <h5>Edit Stop<span className="text-xs"> (Click outside of modal to close)</span></h5>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Stop Code."
            value={editedStop}
            onChange={(e)=>setEditedStop(e.currentTarget.value)}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={editStopFunc}
    > Merge Edit </button>
</div>
        </div>
      </div>
)}

    </div>
  );
};

export default Stops;
