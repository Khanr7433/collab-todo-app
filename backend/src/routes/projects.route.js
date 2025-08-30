import express from "express";
import {
  createProject,
  getProjects,
  assignTaskToProject,
  updateProject,
  getProjectTasks,
  addMemberToProject,
  removeMemberFromProject,
} from "../controllers/projects.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.put("/:id", authMiddleware, updateProject);
router.get("/:id/tasks", authMiddleware, getProjectTasks);
router.post("/assign-task", authMiddleware, assignTaskToProject);
router.post("/:id/add-member", authMiddleware, addMemberToProject);
router.post("/:id/remove-member", authMiddleware, removeMemberFromProject);

export default router;
