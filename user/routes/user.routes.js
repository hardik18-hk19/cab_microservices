import express from "express";
import {
  UserLogin,
  UserLogout,
  UserRegister,
  UserProfile,
} from "../controller/user.controller.js";
import { UserAuth } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/logout", UserLogout);
router.get("/profile", UserAuth, UserProfile);

export default router;
