import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send a 400 response with validation errors
    res.status(400).json({ errors: errors.array() });
    return; // Stop further processing
  }
  next(); // Pass control to the next middleware or route handler
};
