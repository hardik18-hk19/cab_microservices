import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import RideRoutes from "./routes/ride.routes.js";
import connectDb from "./config/db.js";
import { connectRabbit } from "./service/rabbit.js";

dotenv.config();

const app = express();

connectRabbit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

app.use("/", RideRoutes);

export default app;
