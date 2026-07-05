import React, { useContext, useState } from "react";
import Logo from "../assets/gs1.jpeg";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import Loading from "../component/Loading";

function ForgotPassword() {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [loading, setLoading] = useState(false);

const sendOTP = async () => {
  if (!email) {
    toast.error("Please enter your email.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${serverUrl}/api/auth/forgotpassword`,
      { email }
    );

    toast.success(res.data.message);
    setStep(2);

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send OTP.");
  } finally {
    setLoading(false);
  }
};

const verifyOTP = async () => {
  if (!otp) {
    toast.error("Please enter OTP.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${serverUrl}/api/auth/verifyforgototp`,
      {
        email,
        otp,
      }
    );

    toast.success(res.data.message);
    setStep(3);

  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid OTP.");
  } finally {
    setLoading(false);
  }
};
const resetPassword = async () => {

  if (!password || !confirmPassword) {
    toast.error("Please enter password.");
    return;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {

    setLoading(true);

    const res = await axios.post(
      `${serverUrl}/api/auth/resetpassword`,
      {
        email,
        password,
      }
    );

    toast.success(res.data.message);

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (error) {
    toast.error(error.response?.data?.message || "Reset failed.");
  } finally {
    setLoading(false);
  }
};

return (
  <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">

    {/* Header */}
    <div
      className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={Logo} alt="logo" className="w-10" />
      <h1 className="text-2xl font-semibold">GS Fashion</h1>
    </div>

    {/* Card */}
    <div className="w-full flex justify-center mt-8 mb-10">

      <div className="max-w-md w-[92%] bg-[#00000025] border border-[#96969635] backdrop-blur-xl rounded-xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Forgot Password
        </h2>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Recover your account securely
        </p>

        {/* Step Indicator */}

        <div className="flex justify-between items-center mb-8">

          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600" : "bg-gray-600"}`}>
            1
          </div>

          <div className={`flex-1 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-600"}`}></div>

          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600" : "bg-gray-600"}`}>
            2
          </div>

          <div className={`flex-1 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-600"}`}></div>

          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600" : "bg-gray-600"}`}>
            3
          </div>

        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <>

            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-lg bg-transparent border border-gray-500 px-4 outline-none"
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full h-12 mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              {loading ? <Loading /> : "Send OTP"}
            </button>

          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>

            <input
              type="text"
              placeholder="Enter 6 Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full h-12 rounded-lg bg-transparent border border-gray-500 px-4 outline-none"
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full h-12 mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              {loading ? <Loading /> : "Verify OTP"}
            </button>

          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg bg-transparent border border-gray-500 px-4 outline-none"
              />

              {showPassword ? (
                <IoEye
                  className="absolute right-4 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-4 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}

            </div>

            <div className="relative mt-5">

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 rounded-lg bg-transparent border border-gray-500 px-4 outline-none"
              />

              {showConfirmPassword ? (
                <IoEye
                  className="absolute right-4 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-4 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}

            </div>

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full h-12 mt-6 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
            >
              {loading ? <Loading /> : "Reset Password"}
            </button>

          </>
        )}

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-8 text-blue-400 hover:text-blue-300"
        >
          ← Back to Login
        </button>

      </div>

    </div>

  </div>
);
}

export default ForgotPassword;