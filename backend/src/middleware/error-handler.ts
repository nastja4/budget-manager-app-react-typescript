import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
  return res.status(404).json({ error: "Not found" });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(500).json({ error: "Internal server error", message: err.message });
};
