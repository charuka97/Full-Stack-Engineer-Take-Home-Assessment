import { body, param } from "express-validator";

export const updateTaskValidator = [
  param("id").isInt().withMessage("Task ID must be an integer").toInt(),
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),
];
