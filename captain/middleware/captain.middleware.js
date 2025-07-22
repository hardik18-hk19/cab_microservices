import jwt from "jsonwebtoken";
import Captain from "../models/captain.model.js";

export const CaptainAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded.CaptainId);

    if (!captain) {
      return res.status(401).json({ error: "Unauthorized Captain" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
