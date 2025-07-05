import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", authMiddleware, userLogout);

export default router;
