import Ride from "../models/ride.model.js";
import { publishToQueue } from "../service/rabbit.js";

export const createRide = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const newRide = new Ride({
      user: req.user._id,
      pickup,
      destination,
    });

    publishToQueue("new-ride", JSON.stringify(newRide));

    await newRide.save();

    res.status(201).json({
      message: "Ride created successfully",
      ride: newRide,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
