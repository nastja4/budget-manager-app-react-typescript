import { Router } from "express";

export const authRouter = Router();

// Auth route scaffold (rate-limited).
authRouter.post("/login", (_req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
