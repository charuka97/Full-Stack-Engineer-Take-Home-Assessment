import { Request, Response } from "express";
import { AppDataSource } from "../../database";
import { Task } from "../../entities/Task";

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