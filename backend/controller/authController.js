import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";


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

