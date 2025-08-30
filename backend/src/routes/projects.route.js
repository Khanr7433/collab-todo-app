import express from "express";
import { createProject, getProjects, assignTaskToProject } from "../controllers/projects.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/assign-task", authMiddleware, assignTaskToProject);

export default router;
