import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusContext } from "../../contexts/busContext";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { getBusStops, getDiscount } from "../../constants/getLocalStorage";
import DropdownSearch from "../../components/dropdownSearch";
import converArrayIntoSearchStream from "../../utils/converArrayIntoSearchStream";
import { toast } from "react-toastify";
import { client } from "../../constants/urlPath";
import { findDiscountedAmount } from "../../utils/structures";

const RouteSelection: React.FC = () => {
  const navigate = useNavigate();

  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  // INITIALIZATION START
  const {
    busNumber,
    busInitials,
    busColor,
    busRoute,

    startingStop: startingStopContext,
    setStartingStop: setStartingStopContext,
    endingStop: endingStopContext,
    setEndingStop: setEndingStopContext,
    ticketCost: ticketCostContext,
    setTicketCost: setTicketCostContext,
    ticketCount: ticketCountContext,
    setTicketCount: setTicketCountContext,
    discount: discountContext,
    setDiscount: setDiscountContext,
    // totalCost: totalCostContext,
    setTotalCost: setTotalCostContext,
  } = context;

  useEffect(() => {
    if (!busNumber || !busInitials || !busColor || !busRoute) {
      toast.error(
        "Essential information for ticket generation is inaccessable, Please re-initial the process"
      );
      navigate(client.dashboard, { replace: true });
    }
  }, [busNumber, busInitials, busColor, busRoute, navigate]);

  useEffect(() => {
    if (startingStopContext) setStartingStop(startingStopContext);
    setStartingStopKey((prevCount) => prevCount + 1);
  }, [startingStopContext]);

  useEffect(() => {
    if (endingStopContext) setEndStop(endingStopContext);
    setEndStopKey((prevCount) => prevCount + 1);
  }, [endingStopContext]);

  useEffect(() => {
    if (ticketCostContext) setTicketAmount(ticketCostContext);
  }, [ticketCostContext]);

  useEffect(() => {
    if (ticketCountContext) setTicketCount(ticketCountContext);
  }, [ticketCountContext]);

  useEffect(() => {
    if (discountContext) setDiscount(discountContext);
  }, [discountContext]);

  // INITIALIZATION END

  const busStops = getBusStops();
  const savedDiscount = getDiscount();

  const [startingStop, setStartingStop] = useState<string>("");
  const [endStop, setEndStop] = useState<string>("");
  const [startingStopKey, setStartingStopKey] = useState<number>(0);
  const [endStopKey, setEndStopKey] = useState<number>(0);

  const [ticketAmount, setTicketAmount] = useState<number>(10);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(savedDiscount);
  const [continueLoading, setCountinueLoading] = useState<boolean>(false);

  const startingStops: string[] = busStops.filter((elem) => elem !== endStop);
  const endStops: string[] = busStops.filter((elem) => elem !== startingStop);

  const handleStartingStopSelect = (selected: {
    label: string;
    value: string;
  }) => {
    setStartingStop(selected.value);
  };

  const handleEndStopSelect = (selected: { label: string; value: string }) => {
    setEndStop(selected.value);
  };

  const handleEnteringTicketAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const convertedTicketAmount: number = Number(e.currentTarget?.value);
    setTicketAmount(convertedTicketAmount);
  };

  const handleContinue = () => {
    setCountinueLoading(true);

    if (!startingStop) {
      toast.error("Please Select Stating Stop");
      setCountinueLoading(false);
      return;
    }

    if (!endStop) {
      toast.error("Please Select End Stop");
      setCountinueLoading(false);
      return;
    }

    if (ticketAmount < 1) {
      toast.error("Enter ticket amount greater than 0");
      return;
    }

    setStartingStopContext(startingStop);
    setEndingStopContext(endStop);
    setTicketCostContext(ticketAmount);
    setTicketCountContext(ticketCount);
    setDiscountContext(discount);
    setTotalCostContext(
      findDiscountedAmount(ticketAmount * ticketCount, discount)
    );

    toast.success("Validation Complete");
    setCountinueLoading(false);
  };

  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 ps-1 flex items-inline font-bold text-lg bg-transparent">
        <IoArrowBack className="text-2xl me-8 z-50" onClick={() => {}} />
        <span className="text-xl">Route Selection.</span>
      </div>

      <div className="mt-2 w-full px-3">
        <h4 className="font-bold text-end">
          Total | ₹{ticketAmount * ticketCount}
        </h4>
        <h6 className="font-bold text-end">Discount | {discount}</h6>
        <div></div>
      </div>

      <div className="mt-3 w-full px-3">
        <span className="text-lg font-medium">Select Starting Stop</span>
        <div>
          <DropdownSearch
            key={"SelectStartingStop" + startingStopKey}
            options={converArrayIntoSearchStream(startingStops)}
            placeholder={startingStop || "Select Your Starting Stop"}
            onSelect={handleStartingStopSelect}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <span className="text-lg font-medium">Select End Stop</span>
        <div>
          <DropdownSearch
            key={"SelectEndStop" + endStopKey}
            options={converArrayIntoSearchStream(endStops)}
            placeholder={endStop || "Select Your End Stop"}
            onSelect={handleEndStopSelect}
          />
        </div>
      </div>

      <div className="mt-4 w-full px-3">
        <div className="flex">
          <div className="w-1/2 pe-2 relative">
            <span className="text-lg font-medium">Ticket Amount</span>

            <span className="absolute left-4 top-9 text-lg text-slate-400">
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter Amount"
              className="border rounded-md w-full ps-7 py-2.5 bg-white text-slate-400 font-medium shadow-md"
              value={ticketAmount}
              onChange={handleEnteringTicketAmount}
            />
          </div>

          <div className="w-1/2 ps-2">
            <span className="text-lg font-medium">Ticket Count</span>
            <div className="w-full flex justify-between">
              <button
                className="bg-slate-400 text-3xl p-2 rounded-md text-white"
                onClick={() =>
                  setTicketCount((prevCount) =>
                    1 < prevCount ? prevCount - 1 : 1
                  )
                }
              >
                <FaMinus />
              </button>

              <div className="flex items-center h-full pt-1">
                <span className="text-4xl font-semibold">{ticketCount}</span>
              </div>

              <button
                className="bg-slate-400 text-3xl p-2 rounded-md text-white"
                onClick={() => setTicketCount((prevCount) => prevCount + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full px-2 ">
        <button
          className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
          onClick={handleContinue}
          disabled={continueLoading}
        >
          {continueLoading ? (
            <div className="spinner-border text-white"></div>
          ) : (
            <span>Continue</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RouteSelection;
