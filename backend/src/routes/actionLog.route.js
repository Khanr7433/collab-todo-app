import express from "express";
import { getLogs } from "../controllers/actionLog.controller.js";

const router = express.Router();

router.get("/getlogs", getLogs);

export default router;
