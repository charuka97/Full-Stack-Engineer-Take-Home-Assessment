import express from "express";
import {
    createTask,
    getTasks,
    markTaskAsDone,
    updateTask,
    deleteTask,
} from "./controllers/TaskController";
import {
    createTaskValidator,
    markTaskAsDoneValidator,
    updateTaskValidator,
    deleteTaskValidator,
    handleValidationErrors,
} from "./validators/taskValidators"; // Import validation middleware

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: "My Task"
 *             description: "This is a task"
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: "My Task"
 *               description: "This is a task"
 *               completed: false
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - msg: "Title is required"
 *                   param: "title"
 *                   location: "body"
 */
router.post("/tasks", createTaskValidator, handleValidationErrors, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get the most recent 5 tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example:
 *               - id: 1
 *                 title: "My Task"
 *                 description: "This is a task"
 *                 completed: false
 *               - id: 2
 *                 title: "Another Task"
 *                 description: "This is another task"
 *                 completed: true
 */
router.get("/tasks", handleValidationErrors, getTasks);

/**
 * @swagger
 * /api/tasks/{id}/done:
 *   put:
 *     summary: Mark a task as done
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *         example: 1
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: "My Task"
 *               description: "This is a task"
 *               completed: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - msg: "Task ID must be an integer"
 *                   param: "id"
 *                   location: "params"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Task not found"
 */
router.put("/tasks/:id/done", markTaskAsDoneValidator, handleValidationErrors, markTaskAsDone);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *                 example: "Updated Task"
 *               description:
 *                 type: string
 *                 description: The updated description of the task
 *                 example: "This is an updated task"
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: "Updated Task"
 *               description: "This is an updated task"
 *               completed: false
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - msg: "Task ID must be an integer"
 *                   param: "id"
 *                   location: "params"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Task not found"
 */
router.put("/tasks/:id", updateTaskValidator, handleValidationErrors, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Task deleted successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - msg: "Task ID must be an integer"
 *                   param: "id"
 *                   location: "params"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Task not found"
 */
router.delete("/tasks/:id", deleteTaskValidator, handleValidationErrors, deleteTask);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The task ID
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The task description
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *       example:
 *         id: 1
 *         title: "My Task"
 *         description: "This is a task"
 *         completed: false
 */

export default router;