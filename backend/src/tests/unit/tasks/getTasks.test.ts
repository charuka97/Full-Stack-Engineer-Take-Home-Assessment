import { Request, Response } from "express";
import { getTasks } from "../../../controllers/tasks/getTasks";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";

// Mock the AppDataSource
jest.mock("../../../database");

describe("getTasks Unit Tests", () => {
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
      find: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockTaskRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the most recent 5 tasks", async () => {
    const mockTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        completed: true,
      },
    ];
    mockTaskRepository.find.mockResolvedValue(mockTasks);

    await getTasks(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
  });
});
