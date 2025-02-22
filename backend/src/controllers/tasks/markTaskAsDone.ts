import { Request, Response } from "express";
import { AppDataSource } from "../../database";
import { Task } from "../../entities/Task";

export const markTaskAsDone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id);

    // Validate task ID
    if (isNaN(taskId)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    const taskRepository = AppDataSource.getRepository(Task);

    // Find the task by ID
    const task = await taskRepository.findOneBy({ id: taskId });

    // If the task doesn't exist, return a 404 error
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Mark the task as completed
    task.completed = true;

    // Save the updated task to the database
    await taskRepository.save(task);

    // Return the updated task
    res.status(200).json(task);
  } catch (error) {
    console.error("Error marking task as done:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
