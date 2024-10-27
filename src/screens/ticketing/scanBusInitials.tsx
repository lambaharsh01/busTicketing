import { CSSProperties, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../../components/camera";
import { IoArrowBack } from "react-icons/io5";

import { useSpring, animated } from "@react-spring/web"; /*Handle Dragging*/
import { useDrag } from "react-use-gesture"; /*Handle Dragging*/
import { BusContext } from "../../contexts/busContext";

const ScanBusInitials: React.FC = () => {
  const context = useContext(BusContext);
  if (!context) {
    // if not this typescript throws an error because if used and not it context the context will be undefined and would be an error
    throw new Error(
      "This Component must be used within a BusProvider to access the values of it."
    );
  }
  const { busNumber, setBusNumber } = context;

  const navigate = useNavigate();

  const dragThreshold = 80; // Drag distance to hide the component

  // useSpring to control smooth vertical translation
  const [{ y }, api] = useSpring(() => ({ y: 440 }));

  // useDrag to manage dragging behavior
  const bind = useDrag(
    ({ down, movement: [, elementScorlled], cancel }) => {
      // Cancel drag if the threshold is crossed and hide component
      if (elementScorlled > dragThreshold) {
        api.start({ y: 440 }); // Move out of view smoothly
        cancel && cancel(); // Stop further dragging
        return;
      }

      if (elementScorlled < -dragThreshold) {
        api.start({ y: 0 }); // Move out of view smoothly
        cancel && cancel(); // Stop further dragging
        return;
      }
    },
    { axis: "y" } // Restrict drag to vertical axis
  );

  const draggableDivStyle: CSSProperties = {
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
  };

  const useRefArray: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [input1, input2, input3, input4] = useRefArray;

  const emptyCurrentValueIfAny = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const val = e.currentTarget.value;
    // if (val.length > 1) {
    //   e.currentTarget.value = val[0];
    //   return
    // }
    // alert(1)
  };

  const focusElegability = (
    e: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    for (let i = 0; i <= index; i++) {
      const ref = useRefArray[i];
      if (ref && ref.current) {
        const valueOfUseRef = ref.current.value;
        if (!valueOfUseRef) {
          ref.current.focus();
          return;
        }
      }
    }
  };

  const goBackIfNeedBe = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const keyPressed = e.key;
    const inputValue = e.currentTarget.value;
    const regex = /^[0-9]$/;

    if (regex.test(keyPressed) && inputValue) {
      const ref = useRefArray[index + 1];
      if (ref && ref.current) {
        ref.current.focus();
        ref.current.value = keyPressed;
        checkForAllElementsFilled();
        return;
      }
    }

    if (regex.test(keyPressed) && !inputValue) {
      e.currentTarget.value = keyPressed;
      checkForAllElementsFilled();
      return;
    }

    if (keyPressed === "Backspace" && inputValue) {
      e.currentTarget.value = "";
      return;
    }
    if (keyPressed === "Backspace" && !inputValue && index) {
      const ref = useRefArray[index - 1];
      if (ref && ref.current) {
        ref.current.focus();
        ref.current.value = "";
      }
      return;
    }

    function checkForAllElementsFilled() {
      const inputValues = useRefArray
        .map((elem) => elem?.current?.value ?? null)
        .filter(Boolean);

      if (inputValues.length === 4) {
        setBusNumber(inputValues.join(""));
        navigate("/bus-selection");
      }
    }
  };

  useEffect(() => {
    if (busNumber && busNumber.length === 4) {
      for (let i = 0; i < busNumber.length; i++) {
        const elem = useRefArray[i];
        if (elem && elem.current) {
          elem.current.value = busNumber[i];
        }
      }
    }
  }, [busNumber]);

  return (
    <div className="max-h-screen relative">
      <div className="pt-2 ps-1 flex items-inline font-bold text-lg absolute top-0 bg-transparent">
        <IoArrowBack
          className="text-2xl me-8 z-50"
          onClick={() => navigate("/dashboard", { replace: true })}
        />
        <span className="text-xl">Scan QR present In the bus.</span>
      </div>

      <Camera />

      <animated.div
        {...bind()}
        className="absolute bottom-0 h-full w-full rounded-t-2xl bg-white aThousandZindex border-t-4"
        style={{
          ...draggableDivStyle,
          y /*bind y animation value to the div*/,
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
            <input
              type="number"
              className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
              ref={input1}
              onFocus={(e) => focusElegability(e, 0)}
              onKeyDown={(e) => goBackIfNeedBe(e, 0)}
              onChange={emptyCurrentValueIfAny}
            />
            <input
              type="number"
              className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
              ref={input2}
              onFocus={(e) => focusElegability(e, 1)}
              onKeyDown={(e) => goBackIfNeedBe(e, 1)}
              onChange={emptyCurrentValueIfAny}
            />
            <input
              type="number"
              className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
              ref={input3}
              onFocus={(e) => focusElegability(e, 2)}
              onKeyDown={(e) => goBackIfNeedBe(e, 2)}
              onChange={emptyCurrentValueIfAny}
            />
            <input
              type="number"
              className="w-12 h-14 bg-slate-200 ps-3 rounded-lg text-3xl font-bold"
              ref={input4}
              onFocus={(e) => focusElegability(e, 3)}
              onKeyDown={(e) => goBackIfNeedBe(e, 3)}
              onChange={emptyCurrentValueIfAny}
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ScanBusInitials;
