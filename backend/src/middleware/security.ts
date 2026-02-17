import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const helmetMiddleware = helmet();

// Scaffold for auth routes; mount on /api/auth when auth endpoints are added.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
