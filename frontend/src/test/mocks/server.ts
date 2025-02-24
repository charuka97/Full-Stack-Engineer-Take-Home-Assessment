import { setupServer } from "msw/node";
import { http, HttpHandler, HttpResponse } from "msw";
import { API_BASE_URL } from "../../utils/constant";
import { Task } from "../../types";

const tasksDB: Task[] = [
  {
    id: 1,
    title: "Test Task",
    description: "Test description",
    completed: false,
  },
];

export const handlers: HttpHandler[] = [
  // GET handler to fetch tasks
  http.get(API_BASE_URL, () => HttpResponse.json(tasksDB)),

  // POST handler to create a new task
  http.post(API_BASE_URL, async ({ request }) => {
    const body = (await request.json()) as Omit<Task, "id">;
    const newTask: Task = { id: tasksDB.length + 1, ...body };
    tasksDB.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // PUT handler to update a task
  http.put(`${API_BASE_URL}/:id`, async ({ request, params }) => {
    const body = (await request.json()) as Partial<Task>;
    const taskIndex = tasksDB.findIndex((t) => t.id === Number(params.id));

    if (taskIndex === -1) {
      return new HttpResponse("Task not found", { status: 404 });
    }

    tasksDB[taskIndex] = { ...tasksDB[taskIndex], ...body };
    return HttpResponse.json(tasksDB[taskIndex]);
  }),

  // DELETE handler to remove a task
  http.delete(`${API_BASE_URL}/:id`, ({ params }) => {
    const taskIndex = tasksDB.findIndex((t) => t.id === Number(params.id));

    if (taskIndex === -1) {
      return new HttpResponse("Task not found", { status: 404 });
    }

    tasksDB.splice(taskIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

export const server = setupServer(...handlers);
