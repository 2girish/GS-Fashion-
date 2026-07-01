import React, { useState, useContext } from "react";
import Logo from "../assets/gs1.jpeg";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import Loading from "../component/Loading";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(result.data.message || "Login Successful");

      await getCurrentUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const googlelogin = async () => {
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

      toast.success("Google Login Successful");

      await getCurrentUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans">GS Fashion</h1>
      </div>

      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to GS Fashion, Place your order
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
            onClick={googlelogin}
          >
            <img src={google} alt="Google" className="w-[20px]" />
            Login account with Google
          </div>

          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!show ? (
              <IoEyeOutline
                className="w-[22px] h-[22px] absolute right-4 top-[77px] cursor-pointer"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="w-[22px] h-[22px] absolute right-4 top-[77px] cursor-pointer"
                onClick={() => setShow(false)}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:opacity-70"
            >
              {loading ? <Loading /> : "Login"}
            </button>

            <p className="flex gap-[10px]">
              You haven't any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;