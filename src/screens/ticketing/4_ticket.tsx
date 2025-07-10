import { RxCross2 } from "react-icons/rx";
import { LiaQrcodeSolid } from "react-icons/lia";
import { IoWarning } from "react-icons/io5";
import { SCREEN } from "../../constants/paths";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../constants/urlPath";
import { ticketStyleInterface } from "../../constants/interfaces";
// import { getTicketStyling } from "../../utils/getLocalStorage";

import { BusContext } from "../../contexts/busContext";
import { toast } from "react-toastify"
import { formatDate } from "../../utils/time";
import { setTicketProcessingStatus } from "../../utils/setLocalStorage";

const Ticket: React.FC = () => {

  useEffect(() => {
    setTicketProcessingStatus(false)
  }, [])


  const navigate = useNavigate();
  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  const [idDate, setIdDate] = useState<string>("04112024")
  const [ticketInfo, setTicketInfo] = useState({
    busColor: "",
    busInitialsPlusNumber: "",
    busRoute: "",
    startingStop: "",
    endingStop: "",
    totalCost: "",
    ticketCount: "",
    discountedCost: "",
    bookingTime: "",
  });

  useEffect(() => {
    const {
      busNumber,
      busColor,
      busInitials,
      busRoute,
      startingStop,
      endingStop,
      discountedCost,
      ticketCost,
      ticketCount,
      time,
    } = context;

    if (!busColor || !busInitials || !busNumber || !busRoute || !startingStop || !endingStop || !discountedCost || !ticketCost || !ticketCount || !time) {
      toast.error("Missing base dependencies.")
      navigate(client.dashboard)
      return
    }

    setTicketInfo({
      busColor,
      busInitialsPlusNumber: busInitials + busNumber.toString(),
      busRoute,
      startingStop,
      endingStop,
      totalCost: `₹${(Math.floor(ticketCost * 10) / 10).toFixed(1)}`,
      ticketCount: ticketCount.toString(),
      discountedCost: `₹${discountedCost.toFixed(2)}`,
      bookingTime: formatDate(time),
    });

    const [IdTime,] = time.split(" ")
    setIdDate(IdTime.split("-").reverse().join(""))

  }, [context, navigate])

  useEffect(() => {
    // setTicketStyle(getTicketStyling());
  }, []);

  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  // const [ticketStyle, setTicketStyle] = useState<ticketStyleInterface>({
  const [ticketStyle] = useState<ticketStyleInterface>({
    ticketInfoHeight: 60.6,
    ticketHeaderMargin: 18,
    headerLeftFontSize: 22,
    headerRightFontSize: 16.6,
    mainHeaderFontSize: 22,
    mainHeaderMarginTop: 7,
    headermarginTop: 4,
    saperatingLineMarginTop: 8,
    saperatingLineMarginBottom: 9.5,
    infoFontSize: 19.6,
    subHeadingFontSize: 16,
    subHeadingMarginBottom: -1,
    verticalMarginTop: 6.3,
  });

  //  <div className="text-end">
  //               <div
  //                 style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
  //               >
  //                 <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
  //                   Fare
  //                 </span>
  //               </div>
  //               <span
  //                 className="font-medium"
  //                 style={{ fontSize: ticketStyle.infoFontSize }}
  //               >
  //                 {ticketInfo.totalCost}
  //               </span>
  //             </div>

  return (
    <div
      className="relative w-screen h-screen flex items-center px-3"
      style={{ backgroundColor: ticketInfo.busColor }}
    >
      <div
        className="top-0 left-0 absolute  w-full px-3 flex justify-between text-white"
        style={{ paddingTop: ticketStyle.ticketHeaderMargin }}
      >
        <div
          className="flex"
          style={{ fontSize: ticketStyle.headerLeftFontSize }}
        >
          <RxCross2
            className="me-3 text-2xl pointers"
            onClick={() => navigate(client.dashboard)}
          />

        </div>
        <span
          className="font-medium pointers flex"
          style={{ fontSize: ticketStyle.headerRightFontSize }}
          onClick={() => navigate(client.allTickets, { replace: true })}
        >
          <span className="text-2xl me-1">
            <IoWarning className="text-yellow-400" />
          </span>
          Issue with ticket?
        </span>
        <span
          className="font-medium pointers"
          style={{ fontSize: ticketStyle.headerRightFontSize }}
          onClick={() => navigate(client.allTickets, { replace: true })}
        >
          View all tickets
        </span>
      </div>

      {showQrCode ? (
        <div
          className="bg-white w-full mt-1 rounded-md p-4 relative"
          onClick={() => {
            setShowQrCode(false);
          }}
        >
          <img src={SCREEN.QR_CODE.PATH} alt={SCREEN.QR_CODE.ALT} />
        </div>
      ) : (
        <div
          className="w-full shadow-md pointers"
          style={{ height: ticketStyle.ticketInfoHeight.toString() + "%" }}
        >
          <div className="bg-white w-full h-full mt-1 rounded-md p-3 relative">
            <div className="flex justify-center">
              <h4
                className="font-semibold"
                style={{
                  fontSize: ticketStyle.mainHeaderFontSize,
                  marginTop: ticketStyle.mainHeaderMarginTop,
                }}
              >
                Transport Dept. of Delhi
              </h4>
            </div>
            <div
              className="flex justify-between"
              style={{ marginTop: ticketStyle.headermarginTop }}
            >
              <span style={{ fontSize: ticketStyle.infoFontSize }}>
                {ticketInfo.busInitialsPlusNumber}
              </span>
              <span style={{ fontSize: ticketStyle.infoFontSize }}>
                {ticketInfo.discountedCost}
              </span>
            </div>

            <div
              className="border-top border-black max-h-1"
              style={{
                marginTop: ticketStyle.saperatingLineMarginTop,
                marginBottom: ticketStyle.saperatingLineMarginBottom,
              }}
            ></div>

            <div className="flex justify-between">
              <div>
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Bus Route
                  </span>
                </div>
                <span style={{ fontSize: ticketStyle.infoFontSize }}>
                  {ticketInfo.busRoute}
                </span>
              </div>
              <div className="text-end">
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Fare
                  </span>
                </div>
                <span
                  className="font-medium"
                  style={{ fontSize: ticketStyle.infoFontSize }}
                >
                  {ticketInfo.totalCost}
                </span>
              </div>
            </div>

            <div
              className="flex justify-between"
              style={{ marginTop: ticketStyle.verticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Booking Time
                  </span>
                </div>
                <span style={{ fontSize: ticketStyle.infoFontSize }}>
                  {ticketInfo.bookingTime}
                </span>
              </div>
              <div className="text-end">
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Tickets
                  </span>
                </div>
                <span style={{ fontSize: ticketStyle.infoFontSize }}>
                  {ticketInfo.ticketCount}
                </span>
              </div>
            </div>

            <div
              className="flex justify-between "
              style={{ marginTop: ticketStyle.verticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Starting stop
                  </span>
                </div>
                <span style={{ fontSize: ticketStyle.infoFontSize }}>
                  {ticketInfo.startingStop}
                </span>
              </div>
            </div>

            <div
              className="flex justify-between"
              style={{ marginTop: ticketStyle.verticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.subHeadingMarginBottom }}
                >
                  <span style={{ fontSize: ticketStyle.subHeadingFontSize }}>
                    Ending stop
                  </span>
                </div>
                <span style={{ fontSize: ticketStyle.infoFontSize }}>
                  {ticketInfo.endingStop}
                </span>
              </div>
            </div>

            {/* FOOTER SECTION */}

            <div className="absolute bottom-0 w-full pe-8">
              <div className="text-center pb-1.5 text-slate-600">
                T{idDate}7b18ec0efa
              </div>
              <div
                className="bg-green-100 border-2 border-green-600 min-w-full min-h-11 py-2 rounded-md flex justify-center items-center "
                onClick={() => setShowQrCode(true)}
              >
                <div className="flex justify-center">
                  <LiaQrcodeSolid className="text-green-600 text-3xl" />
                  <span className="text-green-600 text-lg font-medium mt-0.5 ms-1">
                    Show QR code
                  </span>
                </div>
              </div>


              <div
                className="w-full pb-2 flex justify-center mb-1"
                style={{ paddingTop: 20 }}
              >
                <div>
                  <img
                    src={SCREEN.ONDC_LOGO.PATH}
                    alt={SCREEN.ONDC_LOGO.ALT}
                    style={{ height: 17.8, marginTop: 1 }}
                  />
                </div>
                <span className="font-extrabold ps-0.5" style={{ color: "#615757", fontSize: 16.8 }}>
                  NETWORK
                </span>
              </div>

            </div>


          </div>
        </div>
      )}

      {/* <div
        className="bottom-0 left-0 absolute w-full pb-6 flex justify-center"
        style={{ paddingTop: ticketStyle.ticketHeaderMargin }}
      >
        <div>
          <img
            src={SCREEN.ONDC_LOGO.PATH}
            alt={SCREEN.ONDC_LOGO.ALT}
            style={{ height: 17, marginTop: 1 }}
          />
        </div>
        <span className="font-bold ps-0.5" style={{ color: "#615757" }}>
          NETWORK
        </span>
      </div> */}
    </div>
  );
};

export default Ticket;
