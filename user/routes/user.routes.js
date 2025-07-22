import express from "express";
import {
  UserLogin,
  UserLogout,
  UserRegister,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/logout", UserLogout);

export default router;
