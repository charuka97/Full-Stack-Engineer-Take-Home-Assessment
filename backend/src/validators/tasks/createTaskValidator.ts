import { body } from "express-validator";

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