import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../constants/urlPath";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axiosInterceptor from "../../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { setToken } from "../../utils/setLocalStorage";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [dissabled, setDissabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const authenticateUser = () => {
    setDissabled(true);

    axiosInterceptor({
      method: "post",
      url: "/auth/sign-in",
      data: { userEmail, password },
    })
      .then((res) => {
        setToken(res.token)
          .then(() => {
            toast.success(res.message);
            navigate("/", { replace: true });
          })
          .catch(() => {
            setDissabled(false);
            toast.error("Something went wrong");
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setDissabled(false);
      });
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-100">
        <div className="col-lg-8 col-12 offset-0 offset-lg-2 h-1/6 flex items-end justify-center">
          <h1 className="mainFont ps-2">
            <span className="charterBlueText me-1 text-4xl">Sign</span>
            <span className="outlined-text-medium-thin text-7xl ">In</span>
          </h1>
        </div>
        <div className="bg-white col-lg-8 col-12 offset-0 offset-lg-2 h-5/6 rounded-t-3xl flex-row overflow-y-auto">
          <div className="w-75 m-auto py-md-4 pt-4 pb-3 h-100 flex flex-col justify-between h-full">
            <div>
              <input
                type="email"
                className="px-8 py-3 mb-4 mt-5 rounded-md w-100 bg-slate-100"
                placeholder="Enter Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.currentTarget.value)}
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="px-8 py-3 mb-4 rounded-md w-100 bg-slate-100 pr-10"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <span className="absolute right-4 pt-14 transform -translate-y-1/2">
                  {!showPassword && (
                    <IoMdEye
                      className="text-2xl text-gray-500"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    />
                  )}

                  {showPassword && (
                    <IoMdEyeOff
                      className="text-2xl text-gray-500"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  )}
                </span>
              </div>
              <div className="-mt-2 charterBlueText text-sm font-medium flex justify-between px-2">
                <span
                  className="pointers"
                  onClick={() => navigate(client.forgotPassword)}
                >
                  Forgot Password?
                </span>
                <span
                  className="pointers"
                  onClick={() => navigate(client.signUp)}
                >
                  Sign Up
                </span>
              </div>
            </div>
            <div className="mb-14">
              <button
                disabled={dissabled}
                className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                onClick={authenticateUser}
              >
                {dissabled ? (
                  <div className="spinner-border spinner-border-sm text-white"></div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
