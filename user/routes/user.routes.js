import express from "express";
import { UserLogin, UserRegister } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);

export default router;
