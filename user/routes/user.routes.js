import express from "express";
import { UserRegister } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", UserRegister);

export default router;
