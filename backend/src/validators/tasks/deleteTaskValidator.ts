import { param } from "express-validator";

export const deleteTaskValidator = [
  param("id").isInt().withMessage("Task ID must be an integer").toInt(),
];
