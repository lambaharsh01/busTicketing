import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  emailRegex,
  phoneRegex,
  weakPasswordRegex,
  strongPasswordRegex,
} from "../../utils/regex";
import {
  initialSignUpDataInterface,
  otpStrengthInterface,
} from "../../constants/interfaces";
// import { initialUserSchema } from "../../utils/authSchemas.js";
import axiosInterceptor from "../../utils/axiosInterceptor";
import { setToken } from "../../utils/setLocalStorage";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  function scrollDivToTop() {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }


  const [screen, setScreen] = useState<number>(0);
  const [dissabled, setDissabled] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const validateUserInfo = (): null | initialSignUpDataInterface => {
    if (userName.length < 3) {
      toast.error("User name must be at least 3 characters");
      return null;
    }

    if (!emailRegex.test(userEmail)) {
      toast.error("Enter a valid email address");
      return null;
    }

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Enter a valid phone number");
      return null;
    }

    const numberedDay = Number(day);
    if (isNaN(numberedDay) || numberedDay < 1 || numberedDay > 31) {
      toast.error("Invalid birth day");
      return null;
    }

    const numberedMonth = Number(month);
    if (isNaN(numberedMonth) || numberedMonth < 1 || numberedMonth > 12) {
      toast.error("Invalid birth month");
      return null;
    }

    const numberedYear = Number(year);
    if (isNaN(numberedYear)) {
      toast.error("Invalid birth year");
      return null;
    }
    if (numberedYear > 2015 || numberedYear < 1970) {
      toast.error("Birth year can not be more than 2015 or less than 1970");
      return null;
    }

    const genders = ["Male", "Female", "Other"];

    if (!genders.includes(gender)) {
      toast.error("Please Select a gender");
      return null;
    }

    let dateOfBirth = `${year}-${
      month.trim().length < 2 ? "0" + month : month
    }-${day.trim().length < 2 ? "0" + day : day}`;

    return {
      userName,
      userEmail,
      phoneNumber,
      dateOfBirth,
      gender,
    };
  };

  const sendVerificationCode = () => {
    const userInfo = validateUserInfo();
    if (!userInfo) return;

    setDissabled(true);

    axiosInterceptor({
      method: "post",
      url: "/auth/initial-sign-up",
      data: userInfo,
    })
      .then((res) => {
        toast.success(res.message);
        setTimeout(() => {
          setScreen((prevCount) => prevCount + 1);
          scrollDivToTop();
          setDissabled(false);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
        setTimeout(() => {
          setDissabled(false);
        }, 1000);
      });
  };

  // OTP VERIFICATION

  const [otp, setOtp] = useState<string>("");

  const verifyOtp = () => {
    if (!otp.length) return toast.error(`Please enter OTP`);
    if (otp.length < 4) return toast.error(`Incorrect OTP`);
    setDissabled(true);

    axiosInterceptor({
      method: "post",
      url: "/auth/check-otp",
      data: { otp, userEmail },
    })
      .then((res) => {
        toast.success(res.message);
        scrollDivToTop();
        setTimeout(() => {
          setScreen((prevCount) => prevCount + 1);
          setDissabled(false);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
        setDissabled(false);
      });
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passStColor, setPassStColor] = useState<otpStrengthInterface>({
    text: "Password Strength",
    textColor: "text-slate-200",
    first: "bg-slate-200",
    second: "bg-slate-200",
    thrid: "bg-slate-200",
  });

  useEffect(() => {
    let newObject = {
      text: "Password Strength",
      textColor: "bg-text-200",
      first: "bg-slate-200",
      second: "bg-slate-200",
      thrid: "bg-slate-200",
    };

    if (!password.length) {
      newObject = {
        text: "Password Strength",
        textColor: "bg-text-200",
        first: "bg-slate-200",
        second: "bg-slate-200",
        thrid: "bg-slate-200",
      };
    } else if (weakPasswordRegex.test(password)) {
      newObject = {
        text: "weak",
        textColor: "text-red-500",
        first: "bg-red-500",
        second: "bg-slate-200",
        thrid: "bg-slate-200",
      };
    } else if (strongPasswordRegex.test(password)) {
      newObject = {
        text: "strong",
        textColor: "text-green-500",
        first: "bg-green-500",
        second: "bg-green-500",
        thrid: "bg-green-500",
      };
    } else {
      newObject = {
        text: "moderate",
        textColor: "text-orange-500",
        first: "bg-orange-500",
        second: "bg-orange-500",
        thrid: "bg-slate-200",
      };
    }

    setPassStColor(newObject);
  }, [password]);

  const createUser = () => {
    if (!password) return toast.error(`Please enter password`);

    if (password !== confirmPassword)
      return toast.error(`Password and confirm password dosen't match`);

    if (passStColor.text !== "strong" && passStColor.text !== "moderate")
      return toast.error(`Your password is weak`);

    axiosInterceptor({
      method: "post",
      url: "/auth/set-password",
      data: { otp, userEmail, password },
    })
      .then((res) => {
        toast.success("Your password has been set");
        setToken(res.token)
          .then(() => {
            navigate("/", { replace: true });
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setDissabled(false);
      });

  };



  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const dayInput = useRef<HTMLInputElement | null>(null);
  const monthInput = useRef<HTMLInputElement | null>(null);
  const yearInput = useRef<HTMLInputElement | null>(null);

  const regex = /^[0-9]$/;

  const handleDayInput = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const keyPressed = e.key;
    const inputValue = e.currentTarget.value;

    if(!regex.test(keyPressed) &&  keyPressed !== "Backspace") return
    
    if(inputValue.length>2 && keyPressed !== "Backspace"){
      monthInput.current?.focus()
    }

    if(inputValue.length===2 && keyPressed !== "Backspace"){
      monthInput.current?.focus()
    }
  }

  const handleMonthInput= (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const keyPressed = e.key;
    const inputValue = e.currentTarget.value;

    if(!regex.test(keyPressed) &&  keyPressed !== "Backspace") return

    if(inputValue.length>2 && keyPressed !== "Backspace"){
      yearInput.current?.focus()
    }
    
    if(inputValue.length===2 && keyPressed !== "Backspace"){
      yearInput.current?.focus()
    }

    if(inputValue.length===0 && keyPressed === "Backspace"){
      e.currentTarget.value=""
      dayInput.current?.focus()
    }
  }

  const handleYearInput = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    const keyPressed = e.key;
    const inputValue = e.currentTarget.value;

    if(!regex.test(keyPressed) &&  keyPressed !== "Backspace") return
    
    if(inputValue.length>3 && keyPressed !== "Backspace"){
      return e.currentTarget.value = e.currentTarget.value.slice(0,3)
    }

    if(inputValue.length===0 && keyPressed === "Backspace"){
      e.currentTarget.value=""
      monthInput.current?.focus()
    }
  }
  


  return (
    <div className="flex justify-center w-full h-screen rentCoRed">
      <div className="w-100">
        <div className="col-lg-8 col-12 offset-0 offset-lg-2 h-1/6 flex items-end justify-center">
          <h1 className="mainFont ps-2">
            <span className="charterBlueText me-1 text-4xl">Sign</span>
            <span className="outlined-text-medium-thin text-7xl">Up</span>
          </h1>
        </div>
        <div
          className="bg-white col-lg-8 col-12 offset-0 offset-lg-2 h-5/6 rounded-t-3xl flex-row overflow-y-auto"
          ref={scrollableDivRef}
        >
          {screen === 0 && (
            <div className="relative w-75 m-auto py-md-4 pt-4 pb-3">
              <h2 className="mb-4">User Details</h2>
              <input
                type="text"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter Full Name"
                value={userName}
                onChange={(e) => setUserName(e.currentTarget.value)}
              />
              <input
                type="text"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter Email"
                value={userEmail}
                onChange={(e) =>
                  setUserEmail(e.currentTarget.value.toLocaleLowerCase())
                }
              />
              <input
                type="number"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter Phone No."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
              <div className="w-100 d-flex mb-4">
                <div className="w-25 pe-1">
                  <input
                    type="number"
                    ref={dayInput}
                    className="ps-2 ps-md-4 py-3 rounded-md w-100 bg-slate-100"
                    placeholder="Day"
                    // value={day}
                    onKeyDown={handleDayInput}
                    onKeyUp={e=>setDay(e.currentTarget.value)}
                  />
                </div>
                <div className="w-25 px-1">
                  <input
                    type="number"
                    ref={monthInput}
                    className="ps-2 ps-md-4 py-3 rounded-md w-100 bg-slate-100"
                    placeholder="Month"
                    // value={month}
                    onKeyDown={handleMonthInput}
                    onKeyUp={e=>setMonth(e.currentTarget.value)}
                  />
                </div>
                <div className="w-50 ps-1">
                  <input
                    type="number"
                    ref={yearInput}
                    className="ps-2 ps-md-4 py-3 rounded-md w-100 bg-slate-100"
                    placeholder="Birth Year"
                    // value={year}
                    onKeyDown={handleYearInput}
                    onKeyUp={e=>setYear(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div
                className="w-100 flex justify-between mb-4 text-slate-500"
                style={{ fontSize: 17 }}
              >
                <span>Select Gender</span>
                <span>
                  <input
                    type="radio"
                    name="gender"
                    onClick={() => setGender("Male")}
                  />
                  &nbsp; Male
                </span>
                <span>
                  <input
                    type="radio"
                    name="gender"
                    onClick={() => setGender("Female")}
                  />
                  &nbsp; Female
                </span>
                <span>
                  <input
                    type="radio"
                    name="gender"
                    onClick={() => setGender("Other")}
                  />
                  &nbsp; Other
                </span>
              </div>

              <div className="min-h-12"></div>

              <div className="absolute bottom-0 w-100 m-auto py-md-4 pt-4 pb-3">
                <button
                  disabled={dissabled}
                  className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                  onClick={sendVerificationCode}
                >
                  {dissabled ? (
                    <div className="spinner-border spinner-border-sm text-white"></div>
                  ) : (
                    <span>Send Verification Code</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {screen === 1 && (
            <div className="w-75 m-auto py-md-4 pt-4 pb-3">
              <h2 className="mb-4">Otp Verification</h2>

              <input
                type="number"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.currentTarget.value)}
              />
              <div className="absolute bottom-14 left-0 w-100">
                <div className="m-auto py-md-4 pt-4 pb-3 w-75">
                  <button
                    disabled={dissabled}
                    className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                    onClick={verifyOtp}
                  >
                    {dissabled ? (
                      <div className="spinner-border spinner-border-sm text-white"></div>
                    ) : (
                      <span>Verify OTP</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {screen === 2 && (
            <div className="w-75 m-auto py-md-4 pt-4 pb-3">
              <h2 className="mb-4">Create New Password</h2>

              <input
                type="password"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <input
                type="password"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />

              <span
                className={`font-thin text-sm ps-2 ${passStColor.textColor}`}
              >
                {passStColor.text}
              </span>
              <div className="w- flex justify-around mt-2 mb-5">
                <span
                  className={`h-1 rounded-md ${passStColor.first}`}
                  style={{ width: "31%" }}
                />
                <span
                  className={`h-1 rounded-md ${passStColor.second}`}
                  style={{ width: "31%" }}
                />
                <span
                  className={`h-1 rounded-md ${passStColor.thrid}`}
                  style={{ width: "31%" }}
                />
              </div>

              <div className="absolute bottom-14 left-0 w-100">
                <div className="m-auto py-md-4 pt-4 pb-3 w-75">
                  <button
                    disabled={dissabled}
                    className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                    onClick={createUser}
                  >
                    {dissabled ? (
                      <div className="spinner-border spinner-border-sm text-white"></div>
                    ) : (
                      <span>Confirm Password</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
