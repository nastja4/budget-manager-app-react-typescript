import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { loggerMiddleware } from "./middleware/logger.js";
import { authRateLimiter, helmetMiddleware } from "./middleware/security.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";

export const createApp = () => {
  const app = express();

  app.use(helmetMiddleware);
  app.use(cors(corsOptions));
  app.use(loggerMiddleware);
  app.use(express.json());

  app.use("/", healthRouter);
  app.use("/api/auth", authRateLimiter, authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
