export const DB_NAME = "collab-todo-app";
import dotenv from "dotenv";

dotenv.config();

export const cookieOptions = {
  secure: true,
  httpOnly: true,
};

// export const CORS_OPTIONS = {
//   origin: process.env.CORS_ORIGIN,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

export const CORS_OPTIONS = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN.split(",");

    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
