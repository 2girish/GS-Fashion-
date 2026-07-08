import transporter from "../config/mail.js";
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";
import OTP from "../model/otpModel.js";
import { sendBrevoMail } from "../utils/brevoMail.js";
export const registration = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Remove extra spaces
        name = name?.trim();
        email = email?.trim().toLowerCase();
        password = password?.trim();

        // Name Validation
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please enter your name",
            });
        }

 // Email Validation
if (!email || email.trim() === "") {
    return res.status(400).json({
        success: false,
        message: "Please enter your email",
    });
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email (example@gmail.com)",
    });
}

        // Password Validation
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your password",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        // Check Existing User
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        // Encrypt Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        // Generate Token
        const token = await genToken(user._id);
res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            user,
        });

    } catch (error) {
        console.error("Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const login = async (req,res) => {
    try {
        let {email,password} = req.body;
        let user = await User.findOne({email}) 
       if (!user) {
    return res.status(404).json({
        success: false,
        message: "Email not registered",
    });
}
        let isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Incorrect password",
    });
}
        let token = await genToken(user._id)
       res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});
    return res.status(200).json({
    success: true,
    message: "Login Successful",
    user,
});

    } catch (error) {
         console.log("login error")
    return res.status(500).json({message:`Login error ${error}`})
        
    }
    
}
export const logOut = async (req,res) => {
try {
   res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
});
    return res.status(200).json({message:"logOut successful"})
} catch (error) {
    console.log("logOut error")
    return res.status(500).json({message:`LogOut error ${error}`})
}
    
}


export const googleLogin = async (req,res) => {
    try {
        let {name , email} = req.body;
         let user = await User.findOne({email}) 
        if(!user){
          user = await User.create({
            name,email
        })
        }
       
        let token = await genToken(user._id)
   res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
});
    return res.status(200).json(user)

    } catch (error) {
         console.log("googleLogin error")
    return res.status(500).json({message:`googleLogin error ${error}`})
    }
    
}


export const adminLogin = async (req,res) => {
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)
     res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
});
    return res.status(200).json(token)
        }
        return res.status(400).json({message:"Invaild creadintials"})

    } catch (error) {
        console.log("AdminLogin error")
    return res.status(500).json({message:`AdminLogin error ${error}`})
        
    }
    
}

export const testMail = async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"GS Fashion" <${process.env.EMAIL_FROM}>`,
to: process.env.EMAIL_FROM,
      subject: "GS Fashion Test Email",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#2563eb;">GS Fashion</h2>
          <p>Congratulations! 🎉</p>
          <p>Your email configuration is working successfully.</p>
          <hr/>
          <p>This is a test email from GS Fashion.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const sendOTP = async (req, res) => {
  try {
    console.log("========== SEND OTP START ==========");

    const { name, email, password } = req.body;
    console.log("1. Request Data:", { name, email });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    console.log("2. Hashing password...");
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("✔ Password hashed");

    console.log("3. Checking existing user...");
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }
    console.log("✔ User does not exist");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("4. Deleting previous OTP...");
    await OTP.deleteOne({
      email: email.toLowerCase(),
    });
    console.log("✔ Previous OTP deleted");

    console.log("5. Saving OTP...");
    await OTP.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });
    console.log("✔ OTP saved");

    console.log("6. Sending email...");

    await sendBrevoMail({
  to: email,
  subject: "GS Fashion - Email Verification OTP",
  html: `
      <div style="font-family:Arial;padding:30px;background:#f4f6f9">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:15px;padding:40px">
          <h1 style="text-align:center;color:#111827;">🛍 GS Fashion</h1>

          <h2>Hello ${name},</h2>

          <p>Thank you for creating your GS Fashion account.</p>

          <p>Please use the OTP below to verify your email.</p>

          <div style="margin:35px auto;
                      width:220px;
                      text-align:center;
                      font-size:36px;
                      font-weight:bold;
                      letter-spacing:10px;
                      background:#2563eb;
                      color:white;
                      padding:20px;
                      border-radius:12px;">
              ${otp}
          </div>

          <p>This OTP is valid for <b>5 minutes</b>.</p>

          <p>If you didn't request this email, simply ignore it.</p>

          <hr>

          <p style="text-align:center;color:gray;">
            © 2026 GS Fashion
          </p>
        </div>
      </div>
  `,
});

    console.log("✔ Email sent successfully");
    console.log("========== SEND OTP SUCCESS ==========");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error("========== SEND OTP ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpData = await OTP.findOne({
      email: email.toLowerCase(),
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    // OTP Expired
    if (otpData.otpExpiry < new Date()) {
      await OTP.deleteOne({ email: email.toLowerCase() });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Invalid OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Check user again
    const existUser = await User.findOne({
      email: otpData.email,
    });

    if (existUser) {
      await OTP.deleteOne({ email: otpData.email });

      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const user = await User.create({
    name: otpData.name,
    email: otpData.email,
    password: otpData.password,
});

    // Delete OTP
    await OTP.deleteOne({
      email: otpData.email,
    });

    // Generate Token
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "None"
          : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered.",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove previous OTP
    await OTP.deleteOne({ email });

    // Save new OTP
    await OTP.create({
      email,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send Email
    await transporter.sendMail({
      from: `"GS Fashion" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "GS Fashion - Password Reset OTP",
      html: `
      <div style="font-family:Arial;padding:30px;background:#f4f6f9">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:15px;padding:40px">

          <h1 style="text-align:center;color:#111827;">
            🛍 GS Fashion
          </h1>

          <h2>Password Reset</h2>

          <p>You requested to reset your password.</p>

          <p>Use the OTP below:</p>

          <div style="
            margin:30px auto;
            width:220px;
            text-align:center;
            font-size:36px;
            font-weight:bold;
            letter-spacing:10px;
            background:#2563eb;
            color:white;
            padding:20px;
            border-radius:12px;
          ">
            ${otp}
          </div>

          <p>This OTP is valid for <b>5 minutes</b>.</p>

          <p>If you didn't request this, simply ignore this email.</p>

          <hr>

          <p style="text-align:center;color:gray;">
            © 2026 GS Fashion
          </p>

        </div>
      </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyForgotOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    // Check OTP Expiry
 console.log("Current Time :", new Date());
console.log("OTP Expiry   :", otpData.otpExpiry);

if (otpData.otpExpiry < new Date()) {
      await OTP.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Check OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    await OTP.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};