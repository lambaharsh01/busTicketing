import { RxCross2 } from "react-icons/rx";
import { LiaQrcodeSolid } from "react-icons/lia";
import { SCREEN } from "../../constants/paths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../constants/urlPath";
import { ticketStyleInterface } from "../../constants/interfaces";
import { getTicketStyling } from "../../utils/getLocalStorage";

const Ticket: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle popstate event with proper type
    const handlePopState = (event: PopStateEvent): void => {
      event.preventDefault();
      navigate(client.dashboard, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    setTicketStyle(getTicketStyling());
  }, []);

  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  const [ticketStyle, setTicketStyle] = useState<ticketStyleInterface>({
    ticketInfoHeight: "58%",
    ticketHeaderMargin: 25,
    headerLeftFontSize: 18.5,
    headerRightFontSize: 15.5,
    mainHeaderFontSize: 22,
    mainHeaderMarginTop: 7,
    headermarginTop: 4,
    saperatingLineMarginTop: 8,
    saperatingLineMarginBottom: 9.5,
    infoFontSize: 20.4,
    subHeadingFontSize: 16.4,
    sunHeadingMarginBottom: -1,
    varticalMarginTop: 6.3,
  });

  const ticketInfo = {
    busColor: "#2E81EB",
    busInitialsPlusNumber: "DL1PD5981",
    busRoute: "940STL",
    startingStop: "Dhansa Stand",
    endingStop: "Khera Village",
    totalCost: "₹10.0",
    ticketCount: "1",
    discountedCost: "₹9.0",
    bookingTime: "02 Nov, 24 | 11:09 PM",
  };

  return (
    <div
      className="relative w-screen h-screen flex items-center px-3"
      style={{ backgroundColor: ticketInfo.busColor }}
    >
      <div
        className="top-0 left-0 absolute w-full px-3 flex justify-between text-white"
        style={{ paddingTop: ticketStyle.ticketHeaderMargin }}
      >
        <div
          className="flex"
          style={{ fontSize: ticketStyle.headerLeftFontSize }}
        >
          <RxCross2
            className="mt-1 me-3 text-xl"
            onClick={() => navigate(client.dashboard)}
          />
          <span>Ticket</span>
        </div>
        <span
          className="font-medium underline"
          style={{ fontSize: ticketStyle.headerRightFontSize }}
        >
          All Tickets
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
          className="w-full shadow-lg"
          style={{ height: ticketStyle.ticketInfoHeight }}
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
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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
              style={{ marginTop: ticketStyle.varticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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
              style={{ marginTop: ticketStyle.varticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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
              style={{ marginTop: ticketStyle.varticalMarginTop }}
            >
              <div>
                <div
                  style={{ marginBottom: ticketStyle.sunHeadingMarginBottom }}
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

            <div className="absolute bottom-0 w-full pe-8 pb-3">
              <div className="text-center pb-1 text-slate-600">
                T02112024ghfghjghughk
              </div>
              <div
                className="bg-green-100 border-2 border-green-600 min-w-full min-h-12 rounded-md flex justify-center items-center"
                onClick={() => setShowQrCode(true)}
              >
                <div className="flex justify-center">
                  <LiaQrcodeSolid className="text-green-600 text-3xl" />
                  <span className="text-green-600 text-lg font-medium mt-0.5 ms-1">
                    Show QR code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
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
      </div>
    </div>
  );
};

export default Ticket;
