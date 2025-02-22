import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Task } from "../entities/Task";

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

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskRepository = AppDataSource.getRepository(Task);

    // Fetch the most recent 5 tasks, ordered by ID in descending order
    const tasks = await taskRepository.find({
      order: { id: "DESC" },
      take: 5,
    });

    // Return the tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;

    // Validate task ID
    if (isNaN(taskId)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    // Validate input
    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
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

    // Update the task properties
    task.title = title;
    task.description = description;

    // Save the updated task to the database
    await taskRepository.save(task);

    // Return the updated task
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (
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

    // Delete the task from the database
    await taskRepository.remove(task);

    // Return a success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
