import express from "express";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { connectRabbit } from "./service/rabbit.js";

dotenv.config();

const app = express();

connectRabbit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
