import Ride from "../models/ride.model.js";

export const createRide = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const newRide = new Ride({
      user: req.user._id,
      pickup,
      destination,
    });

    await newRide.save();

    res.status(201).json({
      message: "Ride created successfully",
      ride: newRide,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
