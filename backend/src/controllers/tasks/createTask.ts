import { Request, Response } from "express";
import { AppDataSource } from "../../database";
import { Task } from "../../entities/Task";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
      return; // Exit the function
    }
    const taskRepository = AppDataSource.getRepository(Task);

    // Create a new task
    const task = new Task();
    task.title = title;
    task.description = description;

    // Save the task to the database
    await taskRepository.save(task);

    // Return the created task
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
