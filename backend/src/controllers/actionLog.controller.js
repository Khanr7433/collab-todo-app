import { ActionLog } from "../models/actionLog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const getLogs = asyncHandler(async (req, res) => {
  const logs = await ActionLog.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .populate("user", "fullName")
    .populate("task", "title");

  if (!logs || logs.length === 0) {
    throw new ApiError(404, "No action logs found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { logs }, "Action logs retrieved successfully"));
});

export { getLogs };
