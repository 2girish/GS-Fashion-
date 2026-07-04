import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/gs1.jpeg";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Registration() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [timer, setTimer] = useState(60);

  const [sendingOtp, setSendingOtp] = useState(false);

  const [verifyingOtp, setVerifyingOtp] = useState(false);

  useEffect(() => {
    let interval;

    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const sendOTP = async () => {
    if (!name || !email || !password) {
      return toast.error("Please fill all fields.");
    }

    try {
      setSendingOtp(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        {
          name,
          email,
          password,
        }
      );

      toast.success(result.data.message);

      setOtpSent(true);

      setTimer(60);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to send OTP."
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Enter OTP");
    }

    try {
      setVerifyingOtp(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(result.data.message);

      await getCurrentUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  const resendOTP = async () => {
    if (timer > 0) return;

    sendOTP();
  };

  const googleSignup = async () => {
    try {
      setLoading(true);

      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        {
          name: user.displayName,
          email: user.email,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Registration Successful");

      await getCurrentUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Google Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
  <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center text-white py-6 px-4">

    {/* Logo */}
    <div
      className="w-full max-w-5xl flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={Logo} className="w-12 h-12 rounded-full" alt="" />
      <h1 className="text-2xl font-bold">GS Fashion</h1>
    </div>

    {/* Heading */}
    <div className="text-center mt-6">
      <h2 className="text-3xl font-bold">Create Account</h2>
      <p className="text-gray-300 mt-2">
        Welcome to GS Fashion. Register to continue shopping.
      </p>
    </div>

    {/* Card */}
    <div className="w-full max-w-xl mt-8 bg-[#00000030] backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6">

      {/* Google Signup */}
      <button
        onClick={googleSignup}
        disabled={loading}
        className="w-full h-12 rounded-lg bg-[#42656cae] hover:bg-[#517782] flex items-center justify-center gap-3 font-semibold transition"
      >
        <img src={google} className="w-5" alt="" />
        {loading ? <Loading /> : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-[1px] bg-gray-600"></div>
        <span className="text-gray-300">OR</span>
        <div className="flex-1 h-[1px] bg-gray-600"></div>
      </div>

      <form onSubmit={verifyOTP} className="space-y-4">

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full h-12 rounded-lg bg-transparent border-2 border-gray-600 px-4 outline-none focus:border-cyan-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full h-12 rounded-lg bg-transparent border-2 border-gray-600 px-4 outline-none focus:border-cyan-400"
        />

        <div className="relative">

          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full h-12 rounded-lg bg-transparent border-2 border-gray-600 px-4 outline-none focus:border-cyan-400"
          />

          {
            show ?

            <IoEye
              onClick={()=>setShow(false)}
              className="absolute right-4 top-3 text-2xl cursor-pointer"
            />

            :

            <IoEyeOutline
              onClick={()=>setShow(true)}
              className="absolute right-4 top-3 text-2xl cursor-pointer"
            />
          }

        </div>

        {/* Send OTP */}

        {
          !otpSent &&

          <button
            type="button"
            onClick={sendOTP}
            disabled={sendingOtp}
            className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            {
              sendingOtp ? <Loading /> : "Send OTP"
            }
          </button>
        }

        {/* OTP */}

        {
          otpSent &&

          <>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6 Digit OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="w-full h-12 rounded-lg bg-transparent border-2 border-yellow-500 px-4 text-center tracking-[8px] text-xl"
            />

            <div className="flex justify-between text-sm">

              <span className="text-yellow-300">

                OTP expires in {timer}s

              </span>

              {
                timer===0 &&

                <button
                  type="button"
                  onClick={resendOTP}
                  className="text-cyan-400 font-semibold"
                >
                  Resend OTP
                </button>
              }

            </div>

            <button
              type="submit"
              disabled={verifyingOtp}
              className="w-full h-12 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
            >
              {
                verifyingOtp ? <Loading/> : "Verify & Create Account"
              }
            </button>

          </>

        }

      </form>

      <p className="mt-6 text-center">
        Already have an account?
        <span
          onClick={()=>navigate("/login")}
          className="ml-2 text-cyan-400 cursor-pointer font-semibold"
        >
          Login
        </span>
      </p>

    </div>

  </div>
);

}

export default Registration;