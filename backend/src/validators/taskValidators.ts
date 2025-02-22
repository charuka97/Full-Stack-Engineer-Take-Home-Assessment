import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation and sanitization for creating a task
export const createTaskValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 100 }).withMessage("Title must be less than 100 characters"),
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),
];

// Validation and sanitization for marking a task as done
export const markTaskAsDoneValidator = [
    param("id")
        .isInt().withMessage("Task ID must be an integer")
        .toInt(),
];

// Validation and sanitization for updating a task
export const updateTaskValidator = [
    param("id")
        .isInt().withMessage("Task ID must be an integer")
        .toInt(),
    body("title")
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage("Title must be less than 100 characters"),
    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),
];

// Validation and sanitization for deleting a task
export const deleteTaskValidator = [
    param("id")
        .isInt().withMessage("Task ID must be an integer")
        .toInt(),
];

// Middleware to handle validation errors
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