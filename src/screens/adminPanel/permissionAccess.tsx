import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiExchangeLine } from "react-icons/ri";
import { userInfo } from "../../constants/interfaces";
import { client } from "../../constants/urlPath";

import { toast } from "react-toastify";

import InfiniteScroll from "react-infinite-scroll-component";
import Switch from "../../components/switch";

import { IoArrowBack } from "react-icons/io5";
import axiosInterceptor from "../../utils/axiosInterceptor";



const PermissionAccess: React.FC = () => {

  const navigate = useNavigate();

  useEffect(()=>{

    fetchMoreData()
    
  },[])



  const [items, setItems] = useState<userInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);

//   const [offset, setOffset] = useState<number>(5)
  const offset: number = 7
  const [page, setPage] = useState<number>(0)

  const [totalItems, setTotalItems]= useState<number>(Infinity)


  const fetchMoreData = () => {

    if (items.length >= totalItems) {
      setHasMore(false);
      return;
    }


    axiosInterceptor({
        url:"/admin/get-all-users",
        method:"post",
        data:{offset, page}
    }).then(res=>{
        const users = res.data || []

        setPage(prevCount => prevCount + 1)
        setItems(prevItems=> [...prevItems, ...users])
        setTotalItems(res.total)

    }).catch(err=>{
        toast.error(err.message)
    })

  };


  const handleTicketGenerationStatusChange = (ticketGenerationStatus: boolean, userEmail: string, index: number)=>{

    axiosInterceptor({
      url:"/admin/permission-access",
      method:"put",
      data:{ticketGenerationStatus, userEmail}
    }).then(res=>{

      const updatedTicketGenerationStatus:number = res.ticketGenerationStatus

      setItems(prevArray => {
        prevArray[index].ticketGenerationStatus = updatedTicketGenerationStatus
        return [...prevArray]
      })

    }).catch(err=>{
      toast.error(err.message)
    })

  }

  
  return (

    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
          <IoArrowBack
            className="text-2xl me-8 z-10"
            onClick={() => navigate(client.dashboard, { replace: true })}
          />
          <span className="text-xl">All Users</span>
        </span>
      </div>

      <div className="w-full px-2 pt-1">
        <div className="w-full">

          <InfiniteScroll
              dataLength={items.length} 
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<div className="w-100 text-center mb-2">
                  <div className="spinner-border spinner-border text-slate-400"></div>
              </div>}
              // endMessage={<p style={{ textAlign: "center" }}>No more data to display</p>}
          >

          {items.map((item, index) => (
            <div 
            className="mb-4 w-full shadow-md border rounded-lg pointers"
            key={"ticket-" + index}
            >
            <div className="w-full min-h-2 rounded-t-lg"
            style={{backgroundColor:"#355ba6"}}></div>
            <div className="w-full bg-white pt-3 px-3 rounded-b-lg">
              
                <div className="w-full flex justify-between">
                  <div className="flex">
                      <div className="h-full">
                        <h6 className="font-medium text-lg -mb-1 mt-0.5">{item.name}</h6>
                        <span className="text-sm text-gray-400">{item.email}</span>
                      </div>
                  </div>

                  <div className="flex justify-end items-center">
                    {item.ticketGenerationStatus === 200 ? (
                      <button className="bg-green-700 text-sm text-white rounded-lg font-medium px-2.5 py-1">
                        Permitted
                      </button>
                    ):(
                      <button className="bg-red-700 text-sm text-white rounded-lg font-medium px-2.5 py-1">
                        Not Permitted
                      </button>
                    )}
                  </div>
                </div>

                {item.openEditSection && (
                  <div className="my-4 w-full font-normal">

                    <div className="w-full my-3 flex justify-between">
                      <span className="text-base">Phone </span>
                      <span className="text-base">{item.phoneNumber}</span>
                    </div>

                    <div className="w-full my-3 flex justify-between">
                      <span className="text-base">Gender </span>
                      <span className="text-base">{item.gender}</span>
                    </div>
                    
                    <div className="w-full my-3 flex justify-between">
                      <span className="text-base">Allowed To Generate Tickets </span>
                      <Switch 
                        checked={item.ticketGenerationStatus === 200}
                        onChange={(bool: boolean)=>handleTicketGenerationStatusChange(bool, item.email, index)}
                      />
                    </div>
                    
                  </div>          
                )}

                <div className="border max-h-1 mt-3"></div>

                <div className="flex items-center py-2.5">
                <div className="w-1/2">{item.createdAt}</div>
                <div className="w-1/2 flex justify-end">
                <RiExchangeLine className={`text-2xl ${!Boolean(item.openEditSection) && "text-blue-500"}`}
                  onClick={()=>{
                    setItems(prevArray => {
                      prevArray[index].openEditSection= !Boolean(prevArray[index].openEditSection)
                      return [...prevArray]
                    })
                  }}
                />
                </div>
                </div>

                <div>

                </div>
            </div>
            </div>
          ))}
          </InfiniteScroll>
       
        </div>
      </div>
    </div>

  );
};

export default PermissionAccess;
