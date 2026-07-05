import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
    },

    otp: {
      type: String,
      required: true,
    },

    otpExpiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;