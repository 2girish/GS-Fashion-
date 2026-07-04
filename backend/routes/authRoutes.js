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

export default authRoutes;