import { Request, Response } from "express";
import { updateTask } from "../../../controllers/tasks/updateTask";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";

// Mock the AppDataSource
jest.mock("../../../database");

describe("updateTask Unit Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockTaskRepository: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Task repository
    mockTaskRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockTaskRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a task and return 200 status", async () => {
    const mockTask = {
      id: 1,
      title: "Old Title",
      description: "Old Description",
      completed: false,
    };
    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    mockTaskRepository.save.mockResolvedValue({
      ...mockTask,
      title: "New Title",
      description: "New Description",
    });

    mockRequest.params = { id: "1" };
    mockRequest.body = { title: "New Title", description: "New Description" };

    await updateTask(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ...mockTask,
      title: "New Title",
      description: "New Description",
    });
  });

  it("should return 404 status if task is not found", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(null);

    mockRequest.params = { id: "1" };
    mockRequest.body = { title: "New Title", description: "New Description" };

    await updateTask(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Task not found",
    });
  });
});
