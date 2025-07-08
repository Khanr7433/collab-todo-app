export const DB_NAME = "collab-todo-app";
import dotenv from "dotenv";

dotenv.config();

export const cookieOptions = {
  secure: true,
  httpOnly: true,
};

export const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
