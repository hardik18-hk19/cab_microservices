import express from "express";
import {
  CaptainLogin,
  CaptainLogout,
  CaptainRegister,
  CaptainProfile,
} from "../controller/captain.controller.js";
import { CaptainAuth } from "../middleware/captain.middleware.js";

const router = express.Router();

router.post("/register", CaptainRegister);
router.post("/login", CaptainLogin);
router.post("/logout", CaptainLogout);
router.get("/profile", CaptainAuth, CaptainProfile);

export default router;
