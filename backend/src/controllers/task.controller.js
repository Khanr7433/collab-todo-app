import { Task } from "../models/tasks.model.js";
import { ActionLog } from "../models/actionLog.model.js";
import smartAssign from "../utils/smartAssign.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "fullName")
    .populate("createdBy", "fullName");

  res
    .status(200)
    .json(new ApiResponse(200, { tasks }, "Tasks fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const validPriorities = ["Low", "Medium", "High"];

  if (!validPriorities.includes(priority)) {
    throw new ApiError(400, "Invalid priority value");
  }
  const existingTask = await Task.findOne({ title });

  if (existingTask) {
    throw new ApiError(400, "Task with this title already exists");
  }

  const createdBy = req.user._id;

  if (!createdBy) {
    throw new ApiError(400, "User not authenticated");
  }

  const assignedTo = await smartAssign();

  if (!assignedTo) {
    throw new ApiError(500, "No users available for task assignment");
  }

  const task = await Task.create({
    title,
    description,
    priority,
    createdBy,
    assignedTo,
  });

  if (!task) {
    throw new ApiError(500, "Something went wrong while creating task");
  }

  const createdTask = await Task.findById(task._id).populate(
    "assignedTo",
    "fullName"
  );

  if (!createdTask) {
    throw new ApiError(500, "Something went wrong while fetching created task");
  }

  const actionLog = await ActionLog.create({
    action: "Task Created",
    user: createdBy,
    task: task._id,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for task creation");
  }

  res
    .status(201)
    .json(new ApiResponse(201, { task }, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const { title, description, status, priority } = req.body;

  if (!_id) {
    throw new ApiError(400, "Task ID is required");
  }

  const task = await Task.findById(_id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (title) {
    task.title = title;
  }

  if (description) {
    task.description = description;
  }

  if (status) {
    task.status = status;
  }

  if (priority) {
    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(priority)) {
      throw new ApiError(400, "Invalid priority value");
    }
    task.priority = priority;
  }

  const updatedTask = await task.save();

  if (!updatedTask) {
    throw new ApiError(500, "Something went wrong while updating task");
  }

  const actionLog = await ActionLog.create({
    action: "Task Updated",
    user: req.user._id,
    task: _id,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for task update");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { task: updatedTask }, "Task updated successfully")
    );
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;

  if (!_id) {
    throw new ApiError(400, "Task ID is required");
  }

  const task = await Task.findById(_id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const validStatuses = ["Todo", "in-progress", "completed"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  task.status = status;

  const updatedTask = await task.save();

  if (!updatedTask) {
    throw new ApiError(500, "Something went wrong while updating task status");
  }

  const actionLog = await ActionLog.create({
    action: "Task Status Updated",
    user: req.user._id,
    task: _id,
  });

  if (!actionLog) {
    throw new ApiError(
      500,
      "Failed to create action log for task status update"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { task: updatedTask },
        "Task status updated successfully"
      )
    );
});

const deleteTask = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    throw new ApiError(400, "Task ID is required");
  }

  const task = await Task.findById(_id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const deletedTask = await task.remove();

  if (!deletedTask) {
    throw new ApiError(500, "Something went wrong while deleting task");
  }

  const actionLog = await ActionLog.create({
    action: "Task Deleted",
    user: req.user._id,
    task: _id,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for task deletion");
  }

  res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"));
});

const assignTask = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    throw new ApiError(400, "Task ID is required");
  }

  const task = await Task.findById(_id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.assignedTo) {
    throw new ApiError(400, "Task is already assigned to a user");
  }

  const user = await smartAssign();

  if (!user) {
    throw new ApiError(500, "No users available for task assignment");
  }

  task.assignedTo = user._id;

  const updatedTask = await task.save();

  if (!updatedTask) {
    throw new ApiError(500, "Something went wrong while assigning task");
  }

  const actionLog = await ActionLog.create({
    action: "Task Assigned",
    user: req.user._id,
    task: _id,
  });

  if (!actionLog) {
    throw new ApiError(500, "Failed to create action log for task assignment");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { task: updatedTask }, "Task assigned successfully")
    );
});

export {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  assignTask,
};
