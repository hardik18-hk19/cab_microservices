import express from "express";
import { createRide } from "../controller/ride.controller.js";

const router = express.Router();

router.post("/create-ride", createRide);

export default router;
