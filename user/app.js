import express from "express";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
