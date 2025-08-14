import User from "../Models/UserModel.js";
import { hashPassword, comparePassword } from "../Utils/bcrypt.js";
import generateToken from "../Utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Please fill all fields");
      error.statusCode = 400;
      return next(error);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);  
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    next(error);  
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Not authenticated" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      next(err);
    }
  };