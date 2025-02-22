import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
