import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req: Request, res: Response) => {
    const { username,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username,email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  };
  
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email}); 
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  };
