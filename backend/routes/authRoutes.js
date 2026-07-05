import express from "express";
import {
  adminLogin,
  googleLogin,
  login,
  logOut,
  registration,
  testMail,
  sendOTP,
  verifyOTP,
  forgotPassword,
  verifyForgotOTP,
  resetPassword,
} from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);

authRoutes.get("/testmail", testMail);
authRoutes.post("/sendotp", sendOTP);
authRoutes.post("/verifyotp", verifyOTP);
authRoutes.post("/forgotpassword", forgotPassword);
authRoutes.post("/verifyforgototp", verifyForgotOTP);
authRoutes.post("/resetpassword", resetPassword);

export default authRoutes;