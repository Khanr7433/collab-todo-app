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

const assignTaskToProject = asyncHandler(async (req, res) => {
  const { taskId, projectId } = req.body;

  if (!taskId || !projectId) {
    throw new ApiError(400, "Task ID and Project ID are required");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // Check if user has permission to assign task to project
  const userId = req.user._id;
  const isOwner = project.owner.toString() === userId.toString();
  const isMember = project.members.some(member => member.toString() === userId.toString());

  if (!isOwner && !isMember) {
    throw new ApiError(403, "You don't have permission to assign tasks to this project");
  }

  task.project = projectId;

  const updatedTask = await task.save();

  if (!updatedTask) {
    throw new ApiError(500, "Something went wrong while assigning task to project");
  }

  const populatedTask = await Task.findById(taskId)
    .populate("assignedTo", "fullName")
    .populate("createdBy", "fullName")
    .populate("project", "name");

  const actionLog = await ActionLog.create({
    action: "Task Assigned to Project",
    user: userId,
    task: taskId,
    project: projectId,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for task assignment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { task: populatedTask }, "Task assigned to project successfully"));
});

export { createProject, getProjects, assignTaskToProject };
