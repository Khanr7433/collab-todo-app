import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return new ApiError(401, "Not authorized, no token");
  }

  if (token === "null") {
    return new ApiError(401, "Not authorized, invalid token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return new ApiError(401, "Not authorized, token failed");
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return new ApiError(401, "Not authorized, user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return new ApiError(401, "Not authorized, token failed", error);
  }
});

export default authMiddleware;
