import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;
