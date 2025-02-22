import request from "supertest";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";
import { app } from "../../../index";

describe("Delete Task Integration Test", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Task).clear();
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
