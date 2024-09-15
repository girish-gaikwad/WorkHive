import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/email.Handlers.js";
export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    console.log(name, username, email, password);
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      // sameSite:"true",
      samesite: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User created", user: newUser });

    // pending the welcome email notification

    const profileUrl  = process.env.DOMAIN_NAME + "/profile/" + newUser.username


    try {
        await sendWelcomeEmail(newUser.email, newUser.name,profileUrl);
    } catch (error) {
        console.log("Error while sending welcome email",error.message);

    }



  } catch (error) {
    console.error("error while creating user", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    
const {username, password} =req.body;

const user = await User.findOne({username});
if(!user){
  return res.status(400).json({message:"Username or password incorrect"});
}

const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
  return res.status(400).json({message:"Username or password incorrect"});
}

const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"3d"});

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 3 * 24 * 60 * 60 * 1000,
  // sameSite:"true",
  samesite: true,
  secure: process.env.NODE_ENV === "production",
})

res.json({message:"Logged in successfully", user});
  } catch (error) {
    
    console.error("error while logging in", error.message);
    res.status(500).json({message:"Server Error"});
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.send("logout successfully");
};

export const getCurrentUser = (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error("error while getting current user", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}