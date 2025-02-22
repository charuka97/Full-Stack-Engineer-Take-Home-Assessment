import request from "supertest";
import { AppDataSource } from "../../database";
import { Task } from "../../entities/Task";
import { app } from "../../index";

describe("TaskController Integration Tests", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Task).clear();
  });

  it("should create a task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Test Description" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
    expect(response.body.description).toBe("Test Description");
    expect(response.body.completed).toBe(false);
  });

  it("should return 400 if title or description is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "", description: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Title and description are required");
  });

  it("should get the most recent 5 tasks", async () => {
    // Create some test tasks
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 1", description: "Description 1" });
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 2", description: "Description 2" });

    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should mark a task as done", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Test Description" });

    const taskId = createResponse.body.id;

    const response = await request(app).put(`/api/tasks/${taskId}/done`);

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it("should update a task", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Test Description" });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: "Updated Task", description: "Updated Description" });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.description).toBe("Updated Description");
  });

  it("should delete a task", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Test Description" });

    const taskId = createResponse.body.id;

    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });
});
