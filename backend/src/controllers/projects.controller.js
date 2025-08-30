import { Project } from "../models/projects.model.js";
import { Task } from "../models/tasks.model.js";
import { ActionLog } from "../models/actionLog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;

  if (!name) {
    throw new ApiError(400, "Project name is required");
  }

  const existingProject = await Project.findOne({ name });

  if (existingProject) {
    throw new ApiError(400, "Project with this name already exists");
  }

  const owner = req.user._id;

  if (!owner) {
    throw new ApiError(400, "User not authenticated");
  }

  const project = await Project.create({
    name,
    description,
    owner,
    members: members || [],
  });

  if (!project) {
    throw new ApiError(500, "Something went wrong while creating project");
  }

  const createdProject = await Project.findById(project._id)
    .populate("owner", "fullName email")
    .populate("members", "fullName email");

  if (!createdProject) {
    throw new ApiError(500, "Something went wrong while fetching created project");
  }

  const actionLog = await ActionLog.create({
    action: "Project Created",
    user: owner,
    project: project._id,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for project creation");
  }

  res
    .status(201)
    .json(new ApiResponse(201, { project: createdProject }, "Project created successfully"));
});

const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "User not authenticated");
  }

  const projects = await Project.find({
    $or: [{ owner: userId }, { members: userId }]
  })
    .populate("owner", "fullName email")
    .populate("members", "fullName email");

  if (!projects || projects.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { projects: [] }, "No projects found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, { projects }, "Projects fetched successfully"));
});

export { createProject, getProjects };
