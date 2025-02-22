import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  markTaskAsDone,
  updateTask,
  deleteTask,
} from "../../controllers/TaskController";
import { AppDataSource } from "../../database";

// Mock the AppDataSource
jest.mock("../../database");

describe("TaskController Unit Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a task and return 201 status", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: false,
        // Include any other properties or methods of the Task entity
      };
      const mockSave = jest.fn().mockResolvedValue(mockTask);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        save: mockSave,
      });

      mockRequest.body = {
        title: "Test Task",
        description: "Test Description",
      };

      await createTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockTask.id,
          title: mockTask.title,
          description: mockTask.description,
          completed: mockTask.completed,
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

  describe("getTasks", () => {
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
      const mockFind = jest.fn().mockResolvedValue(mockTasks);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        find: mockFind,
      });

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe("markTaskAsDone", () => {
    it("should mark a task as done and return 200 status", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: false,
      };
      const mockFindOneBy = jest.fn().mockResolvedValue(mockTask);
      const mockSave = jest
        .fn()
        .mockResolvedValue({ ...mockTask, completed: true });
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
        save: mockSave,
      });

      mockRequest.params = { id: "1" };

      await markTaskAsDone(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        ...mockTask,
        completed: true,
      });
    });

    it("should return 404 status if task is not found", async () => {
      const mockFindOneBy = jest.fn().mockResolvedValue(null);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
      });

      mockRequest.params = { id: "1" };

      await markTaskAsDone(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });

  describe("updateTask", () => {
    it("should update a task and return 200 status", async () => {
      const mockTask = {
        id: 1,
        title: "Old Title",
        description: "Old Description",
        completed: false,
      };
      const mockFindOneBy = jest.fn().mockResolvedValue(mockTask);
      const mockSave = jest.fn().mockResolvedValue({
        ...mockTask,
        title: "New Title",
        description: "New Description",
      });
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
        save: mockSave,
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
      const mockFindOneBy = jest.fn().mockResolvedValue(null);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
      });

      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "New Title", description: "New Description" };

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete a task and return 200 status", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: false,
      };
      const mockFindOneBy = jest.fn().mockResolvedValue(mockTask);
      const mockRemove = jest.fn().mockResolvedValue(null);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
        remove: mockRemove,
      });

      mockRequest.params = { id: "1" };

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task deleted successfully",
      });
    });

    it("should return 404 status if task is not found", async () => {
      const mockFindOneBy = jest.fn().mockResolvedValue(null);
      (AppDataSource.getRepository as jest.Mock).mockReturnValue({
        findOneBy: mockFindOneBy,
      });

      mockRequest.params = { id: "1" };

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });
});
