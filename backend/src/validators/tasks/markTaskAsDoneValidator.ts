import { param } from "express-validator";

export const markTaskAsDoneValidator = [
    param("id")
        .isInt().withMessage("Task ID must be an integer")
        .toInt(),
];