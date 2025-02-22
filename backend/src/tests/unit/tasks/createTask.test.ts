import { Request, Response } from "express";
import { createTask } from "../../../controllers/tasks/createTask";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";

// Mock the AppDataSource
jest.mock("../../../database");

describe("createTask Unit Tests", () => {
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
      save: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockTaskRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a task and return 201 status", async () => {
    const mockTask: Task = {
      id: 1,
      title: "Test Task",
      description: "Test Description",
    } as Task;

    mockTaskRepository.save.mockResolvedValue(mockTask);

    mockRequest.body = {
      title: "Test Task",
      description: "Test Description",
    };

    await createTask(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Task",
        description: "Test Description",
      })
    );
  });

  it("should return 400 status if title or description is missing", async () => {
    mockRequest.body = { title: "", description: "" };

    await createTask(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Title and description are required",
    });
  });
});
