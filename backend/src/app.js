import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-CSRF-Token",
      "Accept",
      "X-Requested-With",
      "X-HTTP-Method-Override",
    ],
  })
);
app.use(cookieParser());
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.route.js";
import actionLogRoutes from "./routes/actionLog.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/actionlogs", actionLogRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
