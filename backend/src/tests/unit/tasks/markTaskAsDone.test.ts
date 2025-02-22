import { Request, Response } from "express";
import { markTaskAsDone } from "../../../controllers/tasks/markTaskAsDone";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";

// Mock the AppDataSource
jest.mock("../../../database");

describe("markTaskAsDone Unit Tests", () => {
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

  it("should mark a task as done and return 200 status", async () => {
    const mockTask = {
      id: 1,
      title: "Test Task",
      description: "Test Description",
      completed: false,
    };
    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    mockTaskRepository.save.mockResolvedValue({ ...mockTask, completed: true });

    mockRequest.params = { id: "1" };

    await markTaskAsDone(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ...mockTask,
      completed: true,
    });
  });

  it("should return 404 status if task is not found", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(null);

    mockRequest.params = { id: "1" };

    await markTaskAsDone(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Task not found",
    });
  });
});
