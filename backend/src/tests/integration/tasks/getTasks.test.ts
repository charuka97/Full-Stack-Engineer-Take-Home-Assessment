import request from "supertest";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";
import { app } from "../../../index";

describe("Get Tasks Integration Test", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    const taskRepository = AppDataSource.getRepository(Task);
    await taskRepository.clear();
  });

  it("should get the most recent 5 tasks", async () => {
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 1", description: "Description 1" });
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 2", description: "Description 2" });

    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });
});
