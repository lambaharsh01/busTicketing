import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { client } from "../../constants/urlPath";
import { ticketStyleInterface } from "../../constants/interfaces";
import { getTicketStyling } from "../../utils/getLocalStorage";
import { setTicketStyling } from "../../utils/setLocalStorage";
import { toast } from "react-toastify";

const Customize: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ticketStyle = getTicketStyling();

    setTicketInfoHeight(ticketStyle.ticketInfoHeight);
    setTicketHeaderMargin(ticketStyle.ticketHeaderMargin);
    setHeaderLeftFontSize(ticketStyle.headerLeftFontSize);
    setHeaderRightFontSize(ticketStyle.headerRightFontSize);
    setMainHeaderFontSize(ticketStyle.mainHeaderFontSize);
    setMainHeaderMarginTop(ticketStyle.mainHeaderMarginTop);
    setHeadermarginTop(ticketStyle.headermarginTop);
    setSaperatingLineMarginTop(ticketStyle.saperatingLineMarginTop);
    setSaperatingLineMarginBottom(ticketStyle.saperatingLineMarginBottom);
    setInfoFontSize(ticketStyle.infoFontSize);
    setSubHeadingFontSize(ticketStyle.subHeadingFontSize);
    setSubHeadingMarginBottom(ticketStyle.subHeadingMarginBottom);
    setVerticalMarginTop(ticketStyle.verticalMarginTop);
  }, []);

  const [ticketInfoHeight, setTicketInfoHeight] = useState<number>(0);
  const [ticketHeaderMargin, setTicketHeaderMargin] = useState<number>(0);
  const [headerLeftFontSize, setHeaderLeftFontSize] = useState<number>(0);
  const [headerRightFontSize, setHeaderRightFontSize] = useState<number>(0);
  const [mainHeaderFontSize, setMainHeaderFontSize] = useState<number>(0);
  const [mainHeaderMarginTop, setMainHeaderMarginTop] = useState<number>(0);
  const [headermarginTop, setHeadermarginTop] = useState<number>(0);
  const [saperatingLineMarginTop, setSaperatingLineMarginTop] =
    useState<number>(0);
  const [saperatingLineMarginBottom, setSaperatingLineMarginBottom] =
    useState<number>(0);
  const [infoFontSize, setInfoFontSize] = useState<number>(0);
  const [subHeadingFontSize, setSubHeadingFontSize] = useState<number>(0);
  const [subHeadingMarginBottom, setSubHeadingMarginBottom] =
    useState<number>(0);
  const [verticalMarginTop, setVerticalMarginTop] = useState<number>(0);

  // HANDLING VALUE CHANGE

  const numConversion = (e: React.ChangeEvent<HTMLInputElement>): number => {
    return Number(e.currentTarget.value);
  };

  const handleTicketInfoHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketInfoHeight(numConversion(e));
  };

  const handleTicketHeaderMargin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketHeaderMargin(numConversion(e));
  };

  const handleHeaderLeftFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderLeftFontSize(numConversion(e));
  };

  const handleHeaderRightFontSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHeaderRightFontSize(numConversion(e));
  };

  const handleMainHeaderFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainHeaderFontSize(numConversion(e));
  };

  const handleMainHeaderMarginTop = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMainHeaderMarginTop(numConversion(e));
  };

  const handleHeadermarginTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadermarginTop(numConversion(e));
  };

  const handleSaperatingLineMarginTop = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaperatingLineMarginTop(numConversion(e));
  };

  const handleSaperatingLineMarginBottom = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaperatingLineMarginBottom(numConversion(e));
  };

  const handleInfoFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoFontSize(numConversion(e));
  };

  const handleSubHeadingFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubHeadingFontSize(numConversion(e));
  };

  const handleSubHeadingMarginBottom = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubHeadingMarginBottom(numConversion(e));
  };

  const handleVerticalMarginTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerticalMarginTop(numConversion(e));
  };

  const [continueLoading, setCountinueLoading] = useState<boolean>(false);

  const handleTicketStylingSave = () => {
    setCountinueLoading(true);
    const ticketStyle: ticketStyleInterface = {
      ticketInfoHeight,
      ticketHeaderMargin,
      headerLeftFontSize,
      headerRightFontSize,
      mainHeaderFontSize,
      mainHeaderMarginTop,
      headermarginTop,
      saperatingLineMarginTop,
      saperatingLineMarginBottom,
      infoFontSize,
      subHeadingFontSize,
      subHeadingMarginBottom,
      verticalMarginTop,
    };

    setTicketStyling(ticketStyle).then(res=>{
      toast.success("Ticket Styling Saved Successfully.");
      setCountinueLoading(false);
    }).catch(err=>{
      toast.error(err.message);
      setCountinueLoading(false);
    });

  };

  return (
    <div className="h-screen relative">
      <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
          <IoArrowBack
            className="text-2xl me-8 z-10"
            onClick={() => navigate(client.dashboard, { replace: true })}
          />
          <span className="text-xl">Ticket Styling.</span>
        </span>
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">1. </span>
          <span className="font-medium">Ticket Info Section Height (in %)</span>
        </div>
        <input
          type="number"
          value={ticketInfoHeight}
          onChange={handleTicketInfoHeight}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter "
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">2. </span>
          <span className="font-medium">Ticket Header Margin</span>
        </div>
        <input
          type="number"
          value={ticketHeaderMargin}
          onChange={handleTicketHeaderMargin}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter "
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">3. </span>
          <span className="font-medium">Header Left Font Size</span>
        </div>
        <input
          type="number"
          value={headerLeftFontSize}
          onChange={handleHeaderLeftFontSize}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter "
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">4. </span>
          <span className="font-medium">Header Right Font Size</span>
        </div>
        <input
          type="number"
          value={headerRightFontSize}
          onChange={handleHeaderRightFontSize}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">5. </span>
          <span className="font-medium">Main Header Font Size</span>
        </div>
        <input
          type="number"
          value={mainHeaderFontSize}
          onChange={handleMainHeaderFontSize}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">6. </span>
          <span className="font-medium">Main Header Margin Top</span>
        </div>
        <input
          type="number"
          value={mainHeaderMarginTop}
          onChange={handleMainHeaderMarginTop}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">7. </span>
          <span className="font-medium">Header Margin Top</span>
        </div>
        <input
          type="number"
          value={headermarginTop}
          onChange={handleHeadermarginTop}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">8. </span>
          <span className="font-medium">Saperating Line Margin Top</span>
        </div>
        <input
          type="number"
          value={saperatingLineMarginTop}
          onChange={handleSaperatingLineMarginTop}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">9. </span>
          <span className="font-medium">Saperating Line Margin Bottom</span>
        </div>
        <input
          type="number"
          value={saperatingLineMarginBottom}
          onChange={handleSaperatingLineMarginBottom}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">10. </span>
          <span className="font-medium">Info Font Size</span>
        </div>
        <input
          type="number"
          value={infoFontSize}
          onChange={handleInfoFontSize}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">11. </span>
          <span className="font-medium">Sub Heading Font Size</span>
        </div>
        <input
          type="number"
          value={subHeadingFontSize}
          onChange={handleSubHeadingFontSize}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">12. </span>
          <span className="font-medium">Sub Heading Margin Bottom</span>
        </div>
        <input
          type="number"
          value={subHeadingMarginBottom}
          onChange={handleSubHeadingMarginBottom}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <div className="mt-4 w-full px-3">
        <div className="mb-1">
          <span className="font-bold">13. </span>
          <span className="font-medium">Vertical Margin Top</span>
        </div>
        <input
          type="number"
          value={verticalMarginTop}
          onChange={handleVerticalMarginTop}
          className="w-full border p-2 rounded shadow-md"
          placeholder="Enter"
        />
      </div>

      <br />
      <br />
      <br />

      <div className="fixed bottom-0 bg-white min-h-16 w-full py-2 border-0 rounded-t-md">
        <div className="w-full px-2">
          <button
            disabled={continueLoading}
            className="py-2.5 cayanBackground w-full font-medium rounded-md text-white text-lg"
            onClick={handleTicketStylingSave}
          >
            {continueLoading ? (
              <div className="spinner-border text-white"></div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customize;
