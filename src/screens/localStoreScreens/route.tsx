import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiChatDeleteFill } from "react-icons/ri";
import { BiSolidCommentEdit } from "react-icons/bi";
import { BsArrowLeftRight, BsFillSignStopFill} from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { client } from "../../constants/urlPath";

import { getBusStops, getBusRoutesInfo } from "../../utils/getLocalStorage";
import { busRouteInterface } from "../../constants/interfaces";
import useClickOutside from "../../utils/useClickOutside";
import DropdownSearch from "../../components/dropdownSearch";
import {converArrayIntoSearchStream} from "../../utils/converArrayIntoSearchStream";
import { toast } from "react-toastify";

import { setBusRoutesInfo} from "../../utils/setLocalStorage";
import { selectLaterOption } from "../../constants/strings";

const BusRoute: React.FC = () => {

  const navigate = useNavigate()
  const busStopsString: string[] = [...getBusStops(), selectLaterOption];

  const [busRoutesArray, setBusRoutesArray]= useState<busRouteInterface[]>([]);
  const [continueLoading, setCountinueLoading]= useState<boolean>(false);

  const [showInfo, setShowInfo]= useState<boolean>(true)

  useEffect(()=>{
    const busRouteInfo: busRouteInterface[]= getBusRoutesInfo()
    setBusRoutesArray(busRouteInfo)
    setTimeout(()=>{
      setShowInfo(false)
    }, 8000)
  }, [])
  
  
  const addRouteClass:string = "addModalElement";
  const editRouteClass:string = "editModalElement"


  useClickOutside(addRouteClass, () => setAddModalOpen(false));
  useClickOutside(editRouteClass, () => setEditModalOpen(false));


  const [routeAttr, setRouteAttr]= useState<string>("")
  const [terminalAAttr, setTerminalAAttr] = useState<string>("")
  const [terminalBAttr, setTerminalBAttr] = useState<string>("")

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [activeModal, setActiveModal] = useState<string>("add");
  
  const validateChange= (src:string):null | busRouteInterface =>{
    if(!routeAttr){
      toast.error("Enter Bus Route")
      return null
    }
    if(!terminalAAttr || !terminalBAttr){

      let continueWithoutTerminals= window.confirm("It is recommended to add bus terminals for the future ticketing convenience and accuracy.\nDo you still want to contine without terminals?")
      if(!continueWithoutTerminals) return null
      // toast.error("Select Bus Terminal A")
      // return null
    }
    // if(!terminalBAttr){
    //   toast.error("Select Bus Terminal B")
    //   return null
    // }
    if(busRoutesArray.some((elem, index)=>{
      if(src==="edit" && index===editStagedIndex){
        return false;
      }
      return elem.route===routeAttr
    })){
      toast.error(`Route ${routeAttr} already exists.`)
      return null
    }

    return {route:routeAttr, terminalA:terminalAAttr, terminalB:terminalBAttr}
  }

  const handleShowAddRouteModal = () =>{
    setRouteAttr("")
    setTerminalAAttr("")
    setTerminalBAttr("")
    setAddModalOpen(true)
    setActiveModal("add")
  }

  const handleBusTerminalASelection = (selected: {
    label: string;
    value: string;
  }) =>{
    setTerminalAAttr(selected.value);

    setTimeout(()=>{
      if(activeModal==="add"){
        setAddModalOpen(true)
      }else{
        setEditModalOpen(true)
      }
    }, 0)
  }

  const handleBusTerminalBSelection = (selected: {
    label: string;
    value: string;
  }) =>{
    setTerminalBAttr(selected.value);

    setTimeout(()=>{
      if(activeModal==="add"){
        setAddModalOpen(true)
      }else{
        setEditModalOpen(true)
      }
    }, 0)
  }

  const addRouteFunc= ()=>{

    const newRoute= validateChange("add")
    if(newRoute){
      setBusRoutesArray(prevArray=>[...prevArray, newRoute])
      toast.success("Bus Route Added Successfully")
      setAddModalOpen(false)
    }
  }


  const deleteRouteFunc = (index:number) =>{
    const confimDelete= window.confirm(`Are you sure you want to delete ${busRoutesArray[index].route}?`)
    if(confimDelete){
      setBusRoutesArray(prevArray=> [...prevArray.slice(0, index), ...prevArray.slice((index+1))])
      toast.success("Route Info Deleted.")
    }
  }


  const [editStagedIndex, setEditStagedIndex] = useState<number>(-1); 

  const stageEdit = (index:number) =>{
    setRouteAttr(busRoutesArray[index].route)
    setTerminalAAttr(busRoutesArray[index].terminalA)
    setTerminalBAttr(busRoutesArray[index].terminalB)
    setEditStagedIndex(index)
    setEditModalOpen(true)
    setActiveModal("edit")
  }


  const editRouteFunc = () =>{
    const editedRoute= validateChange("edit")
    if(editedRoute){
      setBusRoutesArray(prevArray=>{
        prevArray[editStagedIndex] = editedRoute 
        return prevArray
      })
      toast.success("Bus Route Edited Successfully")  
      setEditModalOpen(false)
    }
  }


  const handleBusRouteSave=()=>{
    setCountinueLoading(true)

    setBusRoutesInfo(busRoutesArray).then(res=>{
      toast.success("Bus Routes info has been saved")
      setCountinueLoading(false)
    }).catch(err=>{
      toast.error(err.message)
      setCountinueLoading(false)
    })
  }


  const handleAddStop = () =>{
    navigate(client.stops)
  }


  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
        <IoArrowBack className="text-2xl me-8 z-10" onClick={() => navigate(client.dashboard, {replace:true})} />
        <span className="text-xl">Bus Routes.</span>
        </span>
        <span className="text-2xl pe-2">
            <button className="cayanBackground p-0.5 rounded-md">
                <IoMdAdd 
                className={`text-white ${addRouteClass}`}
                onClick={handleShowAddRouteModal}
                />
            </button>
        </span>
      </div>

      {showInfo && (
        <div className="alert alert-info py-1">
          Make sure you add the bus stops for the terminal stations for more accuracy and convenience.
        </div>
      )}


{/* Add Stop */}

    <div className="mt-4 w-full px-3">      
        {busRoutesArray.map((elem, index)=>(
            <div className="w-full flex text-lg font-medium border shadow-sm mb-3 py-2 px-1 rounded">
                <div className="w-4/6 flex">
                    <span className="text-md ps-1 font-bold">{elem.route}</span>

                    <div className="flex ms-2 mt-1 font-semibold text-sm">[
                      <span className="">{elem.terminalA.substring(0, 4)}</span>
                      <BsArrowLeftRight className="mx-1 mt-1 text-xs"/>
                      <span className="">{elem.terminalB.substring(0, 4)}</span>
                    ]</div>

                </div>

                <div className="w-2/6 flex justify-around">
                    <BiSolidCommentEdit 
                    className={`text-3xl text-blue-500 ${editRouteClass}`}
                    onClick={()=>stageEdit(index)}
                    />
                    <RiChatDeleteFill 
                    className="text-3xl text-red-500"
                    onClick={()=>deleteRouteFunc(index)}
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
          onClick={handleBusRouteSave}
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
      className={`absolute top-0 w-full flex justify-center p-2 ${addRouteClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">
          <div className="flex justify-between">
          <h5>Add Route<span className="text-xs"> (Click outside of modal to close)</span></h5>
          <RxCross2 className="text-xl mt-1" onClick={()=>setAddModalOpen(false)}/>
          </div>
          
          <div className="mt-10 w-full px-3">
          <span className="text-lg font-medium">Select Bus Initials</span>
          <div>
            <input 
              type="text" 
              className="w-full border font-semibold text-slate-400 ps-3 py-2.5 shadow-md creamBackground rounded-md mb-2"
              placeholder="Enter Route Code."
              value={routeAttr}
              onChange={(e)=>setRouteAttr(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="mt-4 me-3">            
            <div className="w-full flex justify-end"
            onClick={handleAddStop}>
            <span className="text-sm font-medium text-blue-400 me-1">Add </span>
            <BsFillSignStopFill className="text-xl text-blue-400 "/>
            </div>
          </div>

        <div className="mt-0 w-full px-3">
          <span className="text-lg font-medium">Terminal Stop A</span>
          <div>
              <DropdownSearch
                key={"SelectTerminalStopA"}
                options={converArrayIntoSearchStream(busStopsString.filter(elem=>((elem!==terminalAAttr && elem!==terminalBAttr) || elem===selectLaterOption )))}
                placeholder={terminalAAttr || "Select Terminal Stop A"}
                onSelect={handleBusTerminalASelection}
              />
          </div>
        </div>
        <div className="mt-3 w-full px-3">
          <span className="text-lg font-medium">Terminal Stop B</span>
          <div>
              <DropdownSearch
                key={"SelectTerminalStopB"}
                options={converArrayIntoSearchStream(busStopsString.filter(elem=>((elem!==terminalAAttr && elem!==terminalBAttr) || elem===selectLaterOption)))}
                placeholder={terminalBAttr || "Select Terminal Stop B"}
                onSelect={handleBusTerminalBSelection}
              />
          </div>
        </div>

<div className="flex justify-end mt-16">
    <button 
    className="mt-2 py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={addRouteFunc}
    >Merge Add</button>
</div>
        </div>
      </div>
)}
 
{editModalOpen && (<div 
      className={`absolute top-0 w-full flex justify-center p-2 ${editRouteClass}`}
      >
        <div className="w-full creamBackground rounded-md border-2 shadow-md z-20 p-2">

        <div className="flex justify-between">
          <h5>Edit Route<span className="text-xs"> (Click outside of modal to close)</span></h5>
          <RxCross2 className="text-xl mt-1" onClick={()=>setEditModalOpen(false)}/>
        </div>


          <div className="mt-10 w-full px-3">
          <span className="text-lg font-medium">Select Bus Initials</span>
          <div>
            <input 
              type="text" 
              className="w-full border font-semibold text-slate-400 ps-3 py-2.5 shadow-md creamBackground rounded-md mb-2"
              placeholder="Enter Route Code."
              value={routeAttr}
              onChange={(e)=>setRouteAttr(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="mt-4 me-3">            
            <div className="w-full flex justify-end"
            onClick={handleAddStop}>
            <span className="text-sm font-medium text-blue-400 me-1">Add </span>
            <BsFillSignStopFill className="text-xl text-blue-400 "/>
            </div>
          </div>

        <div className="mt-0 w-full px-3">
          <span className="text-lg font-medium">Terminal Stop A</span>
          <div>
              <DropdownSearch
                key={"SelectTerminalStopA"}
                options={converArrayIntoSearchStream(busStopsString.filter(elem=>(elem!==terminalAAttr && elem!==terminalBAttr)))}
                placeholder={terminalAAttr || "Select Terminal Stop A"}
                onSelect={handleBusTerminalASelection}
              />
          </div>
        </div>
        <div className="mt-1 w-full px-3">
          <span className="text-lg font-medium">Terminal Stop B</span>
          <div>
              <DropdownSearch
                key={"SelectTerminalStopB"}
                options={converArrayIntoSearchStream(busStopsString.filter(elem=>(elem!==terminalAAttr && elem!==terminalBAttr)))}
                placeholder={terminalBAttr || "Select Terminal Stop B"}
                onSelect={handleBusTerminalBSelection}
              />
          </div>
        </div>

<div className="flex justify-end mt-16">
    <button 
    className="py-1 px-3 cayanBackground font-medium rounded-md text-white text-lg"
    onClick={editRouteFunc}
    > Merge Edit </button>
</div>
        </div>
      </div>
)} 

    </div>
  );
};

export default BusRoute;
