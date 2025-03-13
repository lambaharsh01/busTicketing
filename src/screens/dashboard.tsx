import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLACEHOLDERS } from "../constants/strings";

import { IoMdSearch } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoTicket, IoTimerOutline } from "react-icons/io5";
import { BsStack, BsPalette2, BsFillSignStopFill } from "react-icons/bs";
import { LiaRouteSolid } from "react-icons/lia";
import { BiSolidCustomize } from "react-icons/bi";
import { FaRegWindowMaximize } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

import Map from "../components/map";
import AllTicketsComponent from "../components/allTicketsComponent";
import Header from "../components/header";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { client } from "../constants/urlPath";

import { setTicketProcessingStatus } from "../utils/setLocalStorage";
import { getTicketStore, getToken } from "../utils/getLocalStorage";
import { busTicketStorageInterface } from "../constants/interfaces";

import { localStorageItems } from "../constants/localStorageDataDictionary";

import axiosInterceptor from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();

  const [lastSource, setLastSource] = useState<string>("");
  const [lastDestination, setLastDestination] = useState<string>("");

  useEffect(() => {
    const token = getToken();
    if (!token) navigate(client.signIn, { replace: true });
  }, [navigate]);

  useEffect(() => {
    setTicketProcessingStatus(false);

    const ticketHistory: busTicketStorageInterface[] = getTicketStore();
    const lastTicket: busTicketStorageInterface | undefined = ticketHistory[0];

    if (lastTicket) {
      setLastSource(lastTicket.startingStop);
      setLastDestination(lastTicket.endingStop);
    }
  }, []);

  // Dragging
  const dragThreshold = 100; // Drag distance to hide the component
  const [allOptionsOpen, setAllOptionsOpen] = useState<boolean>(false);

  // useSpring to control smooth vertical translation
  const [{ y }, api] = useSpring(() => ({ y: 1000 }));

  const bind = useDrag(
    ({ down, movement: [, elementScrolled], cancel }) => {
      // Close when dragged down sufficiently
      if (!down && elementScrolled > dragThreshold) {
        api.start({ y: 1000 });
        cancel && cancel();
        setTimeout(() => {
          setAllOptionsOpen(false);
        }, 300);
        return;
      }

      // Constrain vertical movement during drag
      api.start({
        y: down ? Math.max(0, elementScrolled) : 0,
        immediate: down,
      });
    },
    { axis: "y" }
  );

  const draggableDivStyle: CSSProperties = {
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
  };

  const handleReset = () => {
    api.start({ y: 0 }); // Reset x and y to their initial position
    setAllOptionsOpen(true);
  };

  // LOGOUT

  const [logoutIsActive, setLogoutIsActive] = useState<boolean>(false);

  const logOut = () => {
    localStorage.setItem(localStorageItems.token, "");
    navigate(client.signIn, { replace: true });
  };

  // ADMIN
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(localStorageItems.token);
    if (!token) return;

    axiosInterceptor({
      method: "get",
      url: "/user/me",
    })
      .then((res) => {
        const { userType } = res.data;
        setIsAdmin(userType === "admin");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen creamBackground relative">
        <Header />

        <div className="h-14"></div>
        {/* Where do you wanna go section START */}
        <div className="px-2 pt-0.5">
          <div className="mt-2 p-2 rounded-md border bg-white">
            <div className="relative">
              <IoMdSearch className="absolute left-1.5 text-3xl mt-2" />
              <input
                type="text"
                className="w-100 text-xl ps-9 bg-slate-100 rounded-full h-12"
                placeholder={PLACEHOLDERS.DASHBOARD_SEARCH}
              />
            </div>
            <div className="pt-3 pb-0 inline-flex">
              <MdLocationOn className="text-2xl" />
              <span className="ps-3 font-normal text-xl">{lastSource}</span>
            </div>
            <div className="ps-9">
              <div className="border-top w-full mt-1 bg-slate-700"></div>
            </div>
            <div className="pt-3 pb-0 inline-flex">
              <MdLocationOn className="text-2xl" />
              <span className="ps-3 font-normal text-xl">
                {lastDestination}
              </span>
            </div>
          </div>
        </div>
        {/* Where do you wanna go section END */}

        {/* Operations START */}
        <div className="px-2 pt-0.5">
          <div className="mt-2 pt-2.5 rounded-md border bg-white flex justify-around overflow-visibl">
            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={() => navigate(client.scanBusNumber)}
                >
                  <IoTicket className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">
                  Bus <br /> Ticket
                </h6>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-1.5 w-full text-center">
                <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                  New
                </span>
              </div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionYellow border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={() => navigate(client.route)}
                >
                  <LiaRouteSolid className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">
                  Routes <br /> Info
                </h6>
              </div>
            </div>

            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={() => setLogoutIsActive(true)}
                >
                  <LuLogOut className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">Log Out</h6>
              </div>
            </div>
            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={handleReset}
                >
                  <BsStack className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">See All</h6>
              </div>
            </div>
          </div>
        </div>
        {/* Operations END */}

        {/* Map STARTS */}
        <div className="px-2 pt-0.5">
          <div className="mt-2 p-2 rounded-md border bg-white">
            <h5 className="font-extrabold">You are here</h5>
            <div className=" mt-3 w-full h-full overflow-hidden">
              <Map height="140px" key="mapProp" />
            </div>
          </div>
        </div>
        {/* Map END */}

        {/* Tickets STARTS */}
        <div className="px-2 pt-0.5">
          <div className="mt-4 flex justify-between">
            <h5 className="font-extrabold">Tickets</h5>
            <h6
              className="text-slate-500 pointers"
              onClick={() => navigate(client.allTickets)}
            >
              View all tickets
            </h6>
          </div>
          <div className="rounded-md border bg-white pt-2 px-2 dashboardTicketScreen mb-5">
            <AllTicketsComponent key="allTickets" />
          </div>
        </div>
        {/* Tickets END */}

        {/* All Options Sections START */}
        {allOptionsOpen && (
          <animated.div
            {...bind()}
            className="absolute overflow-y-auto bottom-0 h-3/4 w-full rounded-t-2xl bg-white aThousandZindex"
            style={{
              ...draggableDivStyle,
              y /*bind y animation value to the div*/,
            }}
          >
            <div className="bg-transparent flex justify-center">
              <div className="bg-slate-500 min-h-1 w-10 rounded my-2"></div>
            </div>
            <h4 className="ps-3 font-extrabold mt-2">Bus</h4>
            <div className="max-h-full w-full overflow-y-auto ">
              {/* Operations START */}
              <div className="rounded-md bg-white flex justify-around overflow-visibl">
                <div>
                  <div className="w-20 h-20 p-2">
                    <div
                      className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                      onClick={() => navigate(client.scanBusNumber)}
                    >
                      <IoTicket className="text-4xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h6 className="font-medium text-lg">
                      Bus <br /> Ticket
                    </h6>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-1.5 w-full text-center">
                    <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                      New
                    </span>
                  </div>
                  <div className="w-20 h-20 p-2">
                    <div
                      className="w-full h-full iconSectionYellow border shadow-sm flex justify-center items-center rounded-lg"
                      onClick={() => navigate(client.route)}
                    >
                      <LiaRouteSolid className="text-4xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h6 className="font-medium text-lg">
                      Routes <br /> Info
                    </h6>
                  </div>
                </div>
                <div>
                  <div className="w-20 h-20 p-2">
                    <div
                      className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                      onClick={() => navigate(client.stops)}
                    >
                      <BsFillSignStopFill className="text-4xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h6 className="font-medium text-lg">
                      Bus <br /> Stops
                    </h6>
                  </div>
                </div>

                <div>
                  <div className="w-20 h-20 p-2">
                    <div
                      className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                      onClick={() => navigate(client.initials)}
                    >
                      <FaRegWindowMaximize className="text-4xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h6 className="font-medium text-lg">
                      Bus <br /> Initials
                    </h6>
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <div className="pt-2 rounded-md bg-white flex justify-around overflow-visibl w-1/2">
                  <div>
                    <div className="w-20 h-20 p-2">
                      <div
                        className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                        onClick={() => navigate(client.colors)}
                      >
                        <BsPalette2 className="text-4xl" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h6 className="font-medium text-lg">
                        Bus <br /> Color
                      </h6>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-1.5 w-full text-center">
                      <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                        New
                      </span>
                    </div>
                    <div className="w-20 h-20 p-2">
                      <div className="w-full h-full iconSectionYellow border shadow-sm flex justify-center items-center rounded-lg">
                        <BiSolidCustomize
                          className="text-4xl"
                          onClick={() => navigate(client.customize)}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h6 className="font-medium text-lg">
                        Customize <br /> Ticket
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="pt-2 rounded-md bg-white flex justify-around overflow-visibl w-1/4">
                  <div className="relative">
                    <div className="absolute -top-1.5 w-full text-center">
                      <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                        New
                      </span>
                    </div>
                    <div className="w-20 h-20 p-2">
                      <div
                        className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                        onClick={() => navigate(client.allTickets)}
                      >
                        <IoTimerOutline className="text-4xl" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h6 className="font-medium text-lg">
                        Past <br /> Trips
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <>
                  <h4 className="ps-3 font-extrabold mt-4">Admin Rights</h4>
                  <div className="flex w-full">
                    <div className="pt-2 rounded-md bg-white flex justify-around overflow-visible w-1/2">
                      <div className="relative">
                        <div className="absolute -top-1.5 w-full text-center">
                          <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                            New
                          </span>
                        </div>
                        <div className="w-20 h-20 p-2">
                          <div
                            className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                            onClick={() => navigate(client.sql)}
                          >
                            <FaDatabase className="text-4xl" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="font-medium text-lg">
                            Query
                          </h6>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -top-1.5 w-full text-center">
                          <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                            New
                          </span>
                        </div>
                        <div className="w-20 h-20 p-2">
                          <div
                            className="w-full h-full iconSectionYellow border shadow-sm flex justify-center items-center rounded-lg"
                            onClick={() => navigate(client.permissionAccess)}
                          >
                            <HiMiniUsers className="text-4xl" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="font-medium text-lg">
                            Manage <br/> Users
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 rounded-md bg-white flex justify-around overflow-visible w-1/4">
                      <div className="relative">
                        <div className="absolute -top-1.5 w-full text-center">
                          <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                            New
                          </span>
                        </div>
                        <div className="w-20 h-20 p-2">
                          <div
                            className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                            onClick={() => navigate(client.graphs)}
                          >
                            <TbBrandGoogleAnalytics className="text-4xl" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="font-medium text-lg">
                            Analytics
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Operations END */}
          </animated.div>
        )}
        {/* All Options Sections END */}
      </div>

      {allOptionsOpen && (
        <div className="overlayWhenViewNavigationIsOpen"></div>
      )}

      {logoutIsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want to log out?
            </h2>
            <br />
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
  );
}
