import express from "express";
import userRoutes from "./routes/captain.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { connectRabbit } from "./service/rabbit.js";
import { initializeRabbitSubscriptions } from "./controller/captain.controller.js";

dotenv.config();

const app = express();

// Connect to RabbitMQ first, then initialize subscriptions
connectRabbit()
  .then(() => {
    console.log(
      "RabbitMQ connected successfully, initializing subscriptions..."
    );
    initializeRabbitSubscriptions();
  })
  .catch((error) => {
    console.error("Failed to connect to RabbitMQ:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
