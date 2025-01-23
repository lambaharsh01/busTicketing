import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SCREEN } from "../constants/paths";
import { client } from "../constants/urlPath";

import { FaPowerOff, FaHistory, FaDatabase } from "react-icons/fa";
import { IoTicket} from "react-icons/io5";
import { BiSolidCustomize } from "react-icons/bi";

import { localStorageItems } from "../constants/localStorageDataDictionary";
import axiosInterceptor from "../utils/axiosInterceptor";

import { toast } from "react-toastify";
const Header: React.FC  = ()=>{

    const navigate = useNavigate()
    
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [logoutIsActive, setLogoutIsActive] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [ticketGenerationStatus, setTicketGenerationStatus] = useState(200)

    const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    };

    const logOut = () => {
    localStorage.setItem(localStorageItems.token, "")
    navigate(client.signIn, {replace:true})

    } 


    useEffect(()=>{

            axiosInterceptor({
              method: "get",
              url: "/user/me",
            }).then((res) => {
                const  {userEmail, userType, ticketGenerationStatus } =res.data;
                
                setIsAdmin(userType==="admin")
                setUserEmail(userEmail)
                setTicketGenerationStatus(ticketGenerationStatus) 
                // setUserGender(userGender)
                // setUserName(userName)

            }).catch((err) => {
                toast.error(err.message);
            });


    }, [])

  


    return (
        <div className="w-full h-14 px-3 bg-white flex justify-between items-center fixed border-bottom z-10">
            <img
                src={SCREEN.HEADER_ICON.PATH}
                alt={SCREEN.HEADER_ICON.ALT}
                className="h-4"
                />
    
            <img
                src={SCREEN.DEFAULT_PROFILE.PATH}
                alt={SCREEN.DEFAULT_PROFILE.ALT}
                className="h-7"
                onClick={toggleSidebar}
            />

            <div className={`fixed top-0 right-0 h-full bg-gray-800 text-white transition-transform  w-3/4 shadow-lg z-20 
            ${sidebarIsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    onClick={toggleSidebar}
                    className="absolute top-2 right-3 text-xl font-bold"
                > ✕ </button>
                
                <h2 className="text-lg font-bold pt-2 mt-4 ps-3">Profile Menu</h2>
                <h2 className="text-lg font-medium ps-3 -mt-2">{userEmail}</h2>
                <div className="ps-4 ms-2 pt-3 ">

                    <h4 
                        className="pointers text-lg font-medium mb-4 flex"
                        onClick={()=>navigate(client.scanBusNumber)}
                    > 
                    <IoTicket className="text-xl mt-1.5 me-2"/> 
                    <span>Bus Ticket</span>
                    </h4>

                    <h4 
                        className="pointers text-lg font-medium mb-4 flex"
                        onClick={()=>navigate(client.customize)}
                    > 
                    <BiSolidCustomize className="text-xl mt-1.5 me-2"/>
                    <span>Customize Ticket</span>
                    </h4>

                    <h4 
                        className="pointers text-lg font-medium mb-4 flex"
                        onClick={()=>navigate(client.allTickets)}
                    > 
                    <FaHistory className="font-extrabold mt-1.5 me-2"/> <span>Past Trips</span>
                    </h4>


{isAdmin && (<>

    <h4 
        className="pointers text-lg font-medium mb-4 flex"
        onClick={()=>navigate(client.sql)}
    > 
    <FaDatabase className="font-extrabold mt-1.5 me-2"/> <span>SQL Editor</span>
    </h4>

</>)}


                    <h4 
                        className="pointers text-lg font-medium mb-2 flex"
                        onClick={()=>setLogoutIsActive(true)}
                    > 
                    <FaPowerOff className="mt-1.5 me-2"/> <span>Logout</span>
                    </h4>

                </div>

                {ticketGenerationStatus!==200 && (
                    <p className="absolute bottom-1 text-base font-bold ps-3">
                        You Are Not Authorized To Generate Tickets
                        <br />
                        Please Request The Admin For The Permissions
                    </p>
                )}

            </div>

            {sidebarIsOpen && (
            <div className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggleSidebar}></div>
            )}


            {logoutIsActive && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                    <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
                    Are you sure you want to log out?
                    </h2>
                    <div className="flex justify-around space-x-4">
                    <button
                        onClick={() => setLogoutIsActive(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={logOut}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Header