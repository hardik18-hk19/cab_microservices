import Ride from "../models/ride.model.js";

export const createRide = async (req, res) => {
  const { pickup, destination } = req.body;

  const newRide = new Ride({
    user: req.user._id,
    pickup,
    destination,
  });

  await newRide.save();
};
