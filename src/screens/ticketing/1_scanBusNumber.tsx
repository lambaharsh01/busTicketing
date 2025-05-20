// import { CSSProperties, useRef, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Camera from "../../components/camera";
// import { IoArrowBack } from "react-icons/io5";

// import { useSpring, animated } from "@react-spring/web"; /*Handle Dragging*/
// import { useDrag } from "react-use-gesture"; /*Handle Dragging*/
// import { BusContext } from "../../contexts/busContext";
// import { client } from "../../constants/urlPath";
// import { setTicketProcessingStatus } from "../../utils/setLocalStorage";
// import { getTicketProcessingStatus } from "../../utils/getLocalStorage";

// const ScanBusNumber: React.FC = () => {
//   const navigate = useNavigate();
//   const context = useContext(BusContext);
//   if (!context) {
//     // if not this typescript throws an error because if used and not it context the context will be undefined and would be an error
//     throw new Error(
//       "This Component must be used within a BusProvider to access the values of it."
//     );
//   }
//   const { busNumber, setBusNumber } = context;

//   useEffect(()=>{
//     const ticketProcessingStarted:boolean = getTicketProcessingStatus()

//     if(!ticketProcessingStarted){
//       const {setBusNumber:setBusNumberScreen, setBusColor, setBusInitials, setBusRoute, setStartingStop, setEndingStop, setTicketCost, setTicketCount, setDiscountedCost, setTime} = context;

//       setBusNumberScreen(null)
//       setBusColor(null) 
//       setBusInitials(null)
//       setBusRoute(null) 
//       setStartingStop(null)
//       setEndingStop(null)
//       setTicketCost(null)
//       setTicketCount(null)
//       setDiscountedCost(null)
//       setTime(null)

//       setTimeout(()=>{
//         if(input1?.current){
//           input1.current.value= "";
//         }
//         if(input2?.current){
//           input2.current.value= "";
//         }
//         if(input3?.current){
//           input3.current.value= "";
//         }
//         if(input4?.current){
//           input4.current.value= "";
//         }
//       }, 0)
//     }

//     setTicketProcessingStatus(true)
//   },[context])

//   const dragThreshold = 80; // Drag distance to hide the component

//   // useSpring to control smooth vertical translation
//   const [{ y }, api] = useSpring(() => ({ y: 440 }));

//   // useDrag to manage dragging behavior
//   const bind = useDrag(
//     ({ down, movement: [, elementScorlled], cancel }) => {
//       // Cancel drag if the threshold is crossed and hide component
//       if (elementScorlled > dragThreshold) {
//         api.start({ y: 440 }); // Move out of view smoothly
//         cancel && cancel(); // Stop further dragging
//         return;
//       }

//       if (elementScorlled < -dragThreshold) {
//         api.start({ y: 0 }); // Move out of view smoothly
//         cancel && cancel(); // Stop further dragging
//         return;
//       }
//     },
//     { axis: "y" } // Restrict drag to vertical axis
//   );

//   const draggableDivStyle: CSSProperties = {
//     cursor: "pointer",
//     touchAction: "none",
//     userSelect: "none",
//   };

//   const input1 =useRef<HTMLInputElement>(null);
//   const input2 =useRef<HTMLInputElement>(null);
//   const input3 =useRef<HTMLInputElement>(null);
//   const input4 =useRef<HTMLInputElement>(null);

//   const emptyCurrentValueIfAny = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // const val = e.currentTarget.value;
//     // if (val.length > 1) {
//     //   e.currentTarget.value = val[0];
//     //   return
//     // }
//     // alert(1)
//   };

//   const focusElegability = (
//     e: React.FocusEvent<HTMLInputElement>,
//     index: number
//   ) => {

//     const useRefArray=[input1, input2, input3, input4];

//     e.preventDefault();
//     for (let i = 0; i <= index; i++) {
//       const ref = useRefArray[i];
//       if (ref && ref.current) {
//         const valueOfUseRef = ref.current.value;
//         if (!valueOfUseRef) {
//           ref.current.focus();
//           return;
//         }
//       }
//     }
//   };

//   const goBackIfNeedBe = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const useRefArray=[input1, input2, input3, input4];
//     e.preventDefault();
//     const keyPressed = e.key;
//     const inputValue = e.currentTarget.value;
//     const regex = /^[0-9]$/;

//     if (regex.test(keyPressed) && inputValue) {
//       const ref = useRefArray[index + 1];
//       if (ref && ref.current) {
//         ref.current.focus();
//         ref.current.value = keyPressed;
//         checkForAllElementsFilled();
//         return;
//       }
//     }

//     if (regex.test(keyPressed) && !inputValue) {
//       e.currentTarget.value = keyPressed;
//       checkForAllElementsFilled();
//       return;
//     }

//     if (keyPressed === "Backspace" && inputValue) {
//       e.currentTarget.value = "";
//       return;
//     }
//     if (keyPressed === "Backspace" && !inputValue && index) {
//       const ref = useRefArray[index - 1];
//       if (ref && ref.current) {
//         ref.current.focus();
//         ref.current.value = "";
//       }
//       return;
//     }

//     function checkForAllElementsFilled() {
//       const useRefArray=[input1, input2, input3, input4];
//       const inputValues = useRefArray
//         .map((elem) => elem?.current?.value ?? null)
//         .filter(Boolean);

//       if (inputValues.length === 4) {
//         setBusNumber(inputValues.join(""));
//         navigate(client.busSelection);
//       }
//     }
//   };

//   useEffect(() => {
//     const useRefArray=[input1, input2, input3, input4];
//     if (busNumber && busNumber.length === 4) {
//       for (let i = 0; i < busNumber.length; i++) {
//         const elem = useRefArray[i];
//         if (elem && elem.current) {
//           elem.current.value = busNumber[i];
//         }
//       }
//     }
//   }, [busNumber]);




//   return (
//     <div className="max-h-screen relative">
//       <div className="pt-2 ps-1 flex items-inline font-bold text-lg absolute top-0 bg-transparent">
//         <IoArrowBack
//           className="text-2xl me-8 z-50"
//           onClick={() => navigate(client.dashboard, { replace: true })}
//         />
//         <span className="text-xl">Scan QR present In the bus.</span>
//       </div>

//       <Camera key="cameraAccess"/>

//       <animated.div
//         {...bind()}
//         className="absolute bottom-0 h-full w-full rounded-t-2xl bg-white aThousandZindex border-t-4"
//         style={{
//           ...draggableDivStyle,
//           y /*bind y animation value to the div*/,
//         }}
//       >
//         <div className="bg-transparent flex justify-center">
//           <div className="bg-slate-500 min-h-1 w-10 rounded my-2"></div>
//         </div>
//         <h3 className="ps-3 mt-2 text-center font-extrabold">
//           Enter Bus Number (Last 4 digits)
//         </h3>
//         <h5 className="ps-3 mt-2 text-center font-medium text-slate-400">
//           Like 1234 for DL 1PC 1234
//         </h5>
//         <div className="mt-4 pt-1 w-full flex justify-center">
//           <div className="w-3/4 flex justify-around">
//             <input
//               type="number"
//               className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
//               ref={input1}
//               onFocus={(e) => focusElegability(e, 0)}
//               onKeyDown={(e) => goBackIfNeedBe(e, 0)}
//               onChange={emptyCurrentValueIfAny}
//             />
//             <input
//               type="number"
//               className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
//               ref={input2}
//               onFocus={(e) => focusElegability(e, 1)}
//               onKeyDown={(e) => goBackIfNeedBe(e, 1)}
//               onChange={emptyCurrentValueIfAny}
//             />
//             <input
//               type="number"
//               className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
//               ref={input3}
//               onFocus={(e) => focusElegability(e, 2)}
//               onKeyDown={(e) => goBackIfNeedBe(e, 2)}
//               onChange={emptyCurrentValueIfAny}
//             />
//             <input
//               type="number"
//               className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
//               ref={input4}
//               onFocus={(e) => focusElegability(e, 3)}
//               onKeyDown={(e) => goBackIfNeedBe(e, 3)}
//               onChange={emptyCurrentValueIfAny}
//             />
//           </div>
//         </div>
//       </animated.div>
//     </div>
//   );
// };

// export default ScanBusNumber;


import { CSSProperties, useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../../components/camera";
import { IoArrowBack } from "react-icons/io5";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { BusContext } from "../../contexts/busContext";
import { client } from "../../constants/urlPath";
import { setTicketProcessingStatus } from "../../utils/setLocalStorage";
import { getTicketProcessingStatus } from "../../utils/getLocalStorage";

const ScanBusNumber: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(BusContext);

  // State for input values
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);

  if (!context) {
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }

  const { busNumber, setBusNumber } = context;

  // References for input fields
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    const ticketProcessingStarted: boolean = getTicketProcessingStatus();

    if (!ticketProcessingStarted) {
      const {
        setBusNumber: setBusNumberScreen,
        setBusColor,
        setBusInitials,
        setBusRoute,
        setStartingStop,
        setEndingStop,
        setTicketCost,
        setTicketCount,
        setDiscountedCost,
        setTime
      } = context;

      setBusNumberScreen(null);
      setBusColor(null);
      setBusInitials(null);
      setBusRoute(null);
      setStartingStop(null);
      setEndingStop(null);
      setTicketCost(null);
      setTicketCount(null);
      setDiscountedCost(null);
      setTime(null);

      // Reset input values
      setInputValues(["", "", "", ""]);
    }

    setTicketProcessingStatus(true);
  }, [context]);

  // Fill inputs with busNumber if it exists
  useEffect(() => {


    const ticketProcessingStarted: boolean = getTicketProcessingStatus();
    if (busNumber && busNumber.length === 4 && ticketProcessingStarted) {
      const digits = busNumber.split("");
      setInputValues(digits);
    } else {

      setInputValues(["", "", "", ""])

      for (const input of inputRefs) {
        if (input.current) {
          input.current.value = ""
        }
      }

    }
  }, [busNumber]);

  const dragThreshold = 80;
  const [{ y }, api] = useSpring(() => ({ y: 440 }));

  const bind = useDrag(
    ({ down, movement: [, elementScrolled], cancel }) => {
      if (elementScrolled > dragThreshold) {
        api.start({ y: 440 });
        cancel && cancel();
        return;
      }

      if (elementScrolled < -dragThreshold) {
        api.start({ y: 0 });
        cancel && cancel();
        return;
      }

      // If still dragging, move with the finger
      api.start({ y: down ? elementScrolled : 0 });
    },
    { axis: "y" }
  );

  const draggableDivStyle: CSSProperties = {
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
  };

  // Handle input change - more robust approach
  const handleInputChange = (index: number, value: string) => {
    // Only allow single digits
    const digit = value.replace(/\D/g, "").slice(-1);

    // Create a new array with the updated value
    const newInputValues = [...inputValues];
    newInputValues[index] = digit;
    setInputValues(newInputValues);

    // Auto-focus next input if value entered
    if (digit && index < 3) {
      setTimeout(() => {
        inputRefs[index + 1].current?.focus();
      }, 10);
    }

    // Check if all inputs are filled
    if (digit && newInputValues.every(val => val !== "")) {
      const fullNumber = newInputValues.join("");
      setBusNumber(fullNumber);
      setTimeout(() => {
        navigate(client.busSelection);
      }, 100);
    }
  };

  // Handle keydown events for navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // Handle backspace
    if (key === "Backspace") {
      if (inputValues[index] !== "") {
        // If current input has value, clear it
        const newInputValues = [...inputValues];
        newInputValues[index] = "";
        setInputValues(newInputValues);
      } else if (index > 0) {
        // If current input is empty, move to previous input
        setTimeout(() => {
          inputRefs[index - 1].current?.focus();
        }, 10);
      }
    }
    // Handle left arrow
    else if (key === "ArrowLeft" && index > 0) {
      setTimeout(() => {
        inputRefs[index - 1].current?.focus();
      }, 10);
    }
    // Handle right arrow
    else if (key === "ArrowRight" && index < 3) {
      setTimeout(() => {
        inputRefs[index + 1].current?.focus();
      }, 10);
    }
    // Handle direct number input (bypassing onChange for some browsers)
    else if (/^[0-9]$/.test(key)) {
      const newInputValues = [...inputValues];
      newInputValues[index] = key;
      setInputValues(newInputValues);

      if (index < 3) {
        setTimeout(() => {
          inputRefs[index + 1].current?.focus();
        }, 10);
      }

      // Check if all inputs are filled after this keypress
      if (index === 3 || newInputValues.every(val => val !== "")) {
        const fullNumber = newInputValues.join("");
        setBusNumber(fullNumber);
        setTimeout(() => {
          navigate(client.busSelection);
        }, 100);
      }
    }
  };

  // Handle focus
  const handleFocus = (index: number) => {
    // Find the first empty input up to this index
    for (let i = 0; i <= index; i++) {
      if (!inputValues[i]) {
        setTimeout(() => {
          inputRefs[i].current?.focus();
        }, 10);
        break;
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);

    if (pastedData.length > 0) {
      const newInputValues = [...inputValues];

      // Fill in the values
      for (let i = 0; i < pastedData.length && i < 4; i++) {
        newInputValues[i] = pastedData[i];
      }

      setInputValues(newInputValues);

      // Focus the next empty field or the last field
      const nextEmptyIndex = newInputValues.findIndex(val => val === "");
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 4) {
        setTimeout(() => {
          inputRefs[nextEmptyIndex].current?.focus();
        }, 10);
      } else {
        setTimeout(() => {
          inputRefs[3].current?.focus();
        }, 10);
      }

      // Check if we have 4 digits to navigate
      if (newInputValues.filter(val => val !== "").length === 4) {
        const fullNumber = newInputValues.join("");
        setBusNumber(fullNumber);
        setTimeout(() => {
          navigate(client.busSelection);
        }, 100);
      }
    }
  };

  return (
    <div className="max-h-screen relative">
      <div className="pt-2 ps-1 flex items-inline font-bold text-lg absolute top-0 bg-transparent">
        <IoArrowBack
          className="text-2xl me-8 z-50"
          onClick={() => navigate(client.dashboard, { replace: true })}
        />
        <span className="text-xl">Scan QR present In the bus.</span>
      </div>

      <Camera key="cameraAccess" />

      <animated.div
        {...bind()}
        className="absolute bottom-0 h-full w-full rounded-t-2xl bg-white aThousandZindex border-t-4"
        style={{
          ...draggableDivStyle,
          y,
        }}
      >
        <div className="bg-transparent flex justify-center">
          <div className="bg-slate-500 min-h-1 w-10 rounded my-2"></div>
        </div>
        <h3 className="ps-3 mt-2 text-center font-extrabold">
          Enter Bus Number (Last 4 digits)
        </h3>
        <h5 className="ps-3 mt-2 text-center font-medium text-slate-400">
          Like 1234 for DL 1PC 1234
        </h5>
        <div className="mt-4 pt-1 w-full flex justify-center">
          <div className="w-3/4 flex justify-around">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]*"
                className="w-12 h-14 bg-slate-200 text-center rounded-lg text-3xl font-bold"
                ref={inputRefs[index]}
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => handleFocus(index)}
                onPaste={handlePaste}
                autoComplete="off"
              />
            ))}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ScanBusNumber;