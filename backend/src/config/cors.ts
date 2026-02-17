import { CorsOptions } from "cors";
import { env } from "./env.js";

const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const envOrigins = env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

const allowedOrigins = new Set([
  ...defaultOrigins,
  ...envOrigins,
  ...(env.FRONTEND_URL ? [env.FRONTEND_URL] : []),
]);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS origin not allowed"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
