export const DB_NAME = "collab-todo-app";

export const cookieOptions = {
  secure: true,
  httpOnly: true,
};

export const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
