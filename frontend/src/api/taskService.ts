import axios from "axios";
import { Task } from "../types";
import { API_BASE_URL } from "../utils/constant";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createTask = async (task: {
  title: string;
  description: string;
}): Promise<Task> => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: { title: string; description: string }
): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, task);
  return response.data;
};

export const markTaskAsDone = async (id: number): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}/done`);
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
