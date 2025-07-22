import Captain from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistToken from "../models/blacklistToken.model.js";

export const CaptainRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if Captain already exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ error: "Captain already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const captain = new Captain({ name, email, password: hashedPassword });
    await captain.save();

    // Generate JWT token
    const token = jwt.sign({ CaptainId: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    // Respond with Captain data and token
    res.status(201).json({ message: "Captain registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error registering Captain" });
  }
};

export const CaptainLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find Captain by email
    const captain = await Captain.findOne({ email });
    if (!captain) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, captain.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ CaptainId: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    // Respond with Captain data and token
    res.status(200).json({ message: "Captain logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in Captain" });
  }
};

export const CaptainLogout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No Captain logged in" });
    }
    await blacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out Captain" });
  }
};

export const CaptainProfile = async (req, res) => {
  try {
    const captain = await req.captain;
    captain.password = undefined; // Exclude password from response
    res.send(captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
