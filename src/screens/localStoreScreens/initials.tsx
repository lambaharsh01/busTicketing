import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiChatDeleteFill } from "react-icons/ri";
import { BiSolidCommentEdit } from "react-icons/bi";

import { client } from "../../constants/urlPath";

import { getBusInitials } from "../../utils/getLocalStorage";
import useClickOutside from "../../utils/useClickOutside";

import { setBusInitials} from "../../utils/setLocalStorage";
import { toast } from "react-toastify";

const Initials: React.FC = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const savedBusInitials=getBusInitials();
    setBusInitialsArray(savedBusInitials)
  }, [])

  
  const [busInitialsArray, setBusInitialsArray]= useState<string[]>([]);
  const [continueLoading, setCountinueLoading]= useState<boolean>(false)

  const upsertValidation = (colorString: string) :string =>{
    const trimmedNewInitial=colorString.trim();
    if(trimmedNewInitial.length<3 || trimmedNewInitial.includes(" ")){
        toast.error("Bus Invalid Bus Initial.")
        return ""
    }

    if(busInitialsArray.includes(trimmedNewInitial.trim())){
        toast.error("Bus Initial Exists.")
        return ""
    }

    return trimmedNewInitial
  }
  
  
  const addInitialClass:string = "addModalElement";
  useClickOutside(addInitialClass, () => setAddModalOpen(false));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newInitial, setNewInitial]= useState<string>("")

  useEffect(()=>{
    setNewInitial("")
  }, [addModalOpen])

  const addInitialFunc= ()=>{
    const trimmedNewInitial= upsertValidation(newInitial)
    if(trimmedNewInitial){
        setAddModalOpen(false)
        setBusInitialsArray(prevArray=>[trimmedNewInitial, ...prevArray])
        toast.success("Bus Initial Added.")
    }
  }


  const editInitialClass:string = "editModalElement"
  useClickOutside(editInitialClass, () => setEditModalOpen(false));

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [colorToBeEditedIndex, setInitialToBeEditedIndex]= useState<number>(-1)
  const [editedInitial, setEditedInitial]= useState<string>("")

  const stageEdit = (elemIndex:number)=>{
    setEditedInitial(busInitialsArray[elemIndex])
    setInitialToBeEditedIndex(elemIndex)
    setEditModalOpen(true)
  }

  const editInitialFunc= () =>{
    setBusInitialsArray(prevArray=>{
        prevArray[colorToBeEditedIndex]= editedInitial
        return prevArray
    })
    toast.success("Bus Initial Edited.")
    setEditedInitial("")
    setInitialToBeEditedIndex(-1)
    setEditModalOpen(false)
    
  }

  
  const deleteInitialFunc = (colorString:string) => {
    const deleteInitialConfirmation = window.confirm("Please confirm the removal of the selected bus color from the list");
    if(deleteInitialConfirmation){
        setBusInitialsArray(prevArray=>prevArray.filter(elem=>elem!==colorString))
        toast.success("Bus Initial Removed.")
    }
  }
  

  const handleBusInitialSave = () => {
    setCountinueLoading(true)
    const setBusInitialValue= setBusInitials(busInitialsArray)
    if(setBusInitialValue.success){
        toast.success("Bus Initials Saved Successfully.")
    }else{
        toast.error(setBusInitialValue.error)
    }
    setCountinueLoading(false)
  }




  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
        <IoArrowBack className="text-2xl me-8 z-10" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">Bus Initials.</span>
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
        {busInitialsArray.map((elem, index)=>(
            <div className="w-full flex text-lg font-medium border shadow-sm mb-3 py-2 px-1 rounded">
                <div className="w-3/5">
                    <span>{elem}</span>
                </div>

                <div className="w-2/5 flex justify-around">
                    <BiSolidCommentEdit 
                    className={`text-3xl text-blue-500 ${editInitialClass}`}
                    onClick={()=>stageEdit(index)}
                    />
                    <RiChatDeleteFill 
                    className="text-3xl text-red-500"
                    onClick={()=>deleteInitialFunc(elem)}
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
          onClick={handleBusInitialSave}
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
      className={`absolute top-0 w-full flex justify-center p-2 ${addInitialClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
                <h5>Add Initial<span className="text-xs"> (Click outside of modal to close)</span></h5>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Initial Code."
            value={newInitial}
            onChange={(e)=>setNewInitial(e.currentTarget.value)}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={addInitialFunc}
    >Merge Add</button>
</div>
        </div>
      </div>
)}
{editModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${editInitialClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
            <h5>Edit Initial<span className="text-xs"> (Click outside of modal to close)</span></h5>
        <input 
            type="text" 
            className="w-full border font-semibold text-slate-400 ps-3 py-2 rounded-md mb-3 mt-2"
            placeholder="Enter Initial Code."
            value={editedInitial}
            onChange={(e)=>setEditedInitial(e.currentTarget.value)}
            />
<div className="flex justify-end">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={editInitialFunc}
    > Merge Edit </button>
</div>
        </div>
      </div>
)}

    </div>
  );
};

export default Initials;
