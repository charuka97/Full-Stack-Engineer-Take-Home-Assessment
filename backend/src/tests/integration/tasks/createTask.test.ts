import request from "supertest";
import { AppDataSource } from "../../../database";
import { Task } from "../../../entities/Task";
import { app } from "../../../index";

describe("Create Task Integration Test", () => {
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

  it("should return 400 if title and description are missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "", description: "" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Title is required" }),
        expect.objectContaining({ msg: "Description is required" }),
      ])
    );
  });

  it("should return 400 if title is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "", description: "Valid description" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Title is required" }),
      ])
    );
  });

  it("should return 400 if description is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Valid title", description: "" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Description is required" }),
      ])
    );
  });
});
