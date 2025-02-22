import request from "supertest";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";
import { app } from "../../../index";

describe("Mark Task As Done Integration Test", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Task).clear();
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
});
