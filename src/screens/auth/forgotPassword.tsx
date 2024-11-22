import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  emailRegex,
  weakPasswordRegex,
  strongPasswordRegex,
} from "../../utils/regex";
import { otpStrengthInterface } from "../../constants/interfaces";
import axiosInterceptor from "../../utils/axiosInterceptor";
import { setToken } from "../../utils/setLocalStorage";

const ForgotPassword: React.FC = () => {
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

  const [userEmail, setUserEmail] = useState<string>("");

  const validateUserInfo = (): null | string => {
    if (!emailRegex.test(userEmail)) {
      toast.error("Enter a valid email address");
      return null;
    }

    return userEmail;
  };

  const sendVerificationCode = () => {
    const userEmail = validateUserInfo();
    if (!userEmail) return;

    setDissabled(true);

    axiosInterceptor({
      method: "post",
      url: "/auth/forgot-password",
      data: { userEmail },
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
        toast.success(res.message);
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

  return (
    <div className="flex justify-center w-full h-screen rentCoRed">
      <div className="w-100">
        <div className="col-lg-8 col-12 offset-0 offset-lg-2 h-1/6 flex items-end justify-center">
          <h1 className="mainFont ps-2">
            <span className="charterBlueText me-1 text-3xl">Forgot</span>
            <span className="outlined-text-medium-thin text-5xl">Password</span>
          </h1>
        </div>
        <div
          className="bg-white col-lg-8 col-12 offset-0 offset-lg-2 h-5/6 rounded-t-3xl flex-row overflow-y-auto"
          ref={scrollableDivRef}
        >
          {screen === 0 && (
            <div className="w-75 m-auto py-md-4 pt-4 pb-3">
              <h2 className="mb-4">User Details</h2>
              <input
                type="text"
                className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100"
                placeholder="Enter Email"
                value={userEmail}
                onChange={(e) =>
                  setUserEmail(e.currentTarget.value.toLocaleLowerCase())
                }
              />

              <div className="absolute bottom-14 w-50 m-auto py-md-4 pt-4 pb-3">
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

              <div className="absolute bottom-14 w-50 m-auto py-md-4 pt-4 pb-3">
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
          )}

          {screen === 2 && (
            <div className="w-75 m-auto py-md-4 pt-4 pb-3">
              <h2 className="mb-4">Create Password</h2>

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

              <div className="absolute bottom-14 w-50 m-auto py-md-4 pt-4 pb-3">
                <button
                  disabled={dissabled}
                  className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                  onClick={createUser}
                >
                  {dissabled ? (
                    <div className="spinner-border spinner-border-sm text-white"></div>
                  ) : (
                    <span>Change Password</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
