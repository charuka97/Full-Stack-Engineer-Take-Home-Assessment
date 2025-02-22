import express from "express";
import cors from "cors";
import { AppDataSource } from "./database";
import taskRoutes from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo App API",
      version: "1.0.0",
      description: "API documentation for the Todo App",
    },
    servers: [
      {
        url: `http://localhost:5000`,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes.ts"], // Path to your API routes
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Application is up and running" });
});

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

// Use the task routes
app.use("/api", taskRoutes);

// Export the app for testing
export { app };

// Start the server only if this file is run directly (not when imported for testing)
if (require.main === module) {
  const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger API documentation: http://localhost:${PORT}/api-docs`);
  });
}