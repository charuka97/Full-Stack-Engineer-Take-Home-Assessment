
# Task Management

A full-stack task management application built with React.js, Node.js, PostgreSQL, and Docker.Includes unit and integration testing for the backend and unit testing for the frontend.

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)
- [Vite](https://vite.dev/guide/)
- [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite)

### Setting Up the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/charuka97/Full-Stack-Engineer-Take-Home-Assessment.git
    cd todo-app
    ```

2. Set up the database:

    ```bash
    docker-compose up db
    ```

3. Set up the backend:

    ```bash
    docker-compose up backend
    ```

4. Set up the frontend:

    ```bash
    docker-compose up frontend
    ```

The backend will be available at `http://localhost:5000` and the frontend at `http://localhost:5173`.

## Usage

1. **Start the Application**:

    If you're using Docker, run the following command to start all services (database, backend, frontend):

    ```bash
    docker-compose up --build
    ```

2. **Stop the Application**:

    To stop the services:

    ```bash
    docker-compose down
    ```

3. **Running Locally**:

    If you prefer to run the backend or frontend locally (without Docker), follow these steps:

    - Backend:

        Set Up Environment Variables
            Create a .env file in the backend directory
            ```bash
            PORT=5000
            DB_HOST=localhost
            DB_PORT=5432
            DB_USER=postgres
            DB_PASSWORD=yourPassword
            DB_NAME=postgres
            ```

        ```bash
        cd backend
        npm install
        npm run dev
        ```

    - Frontend:

        ```bash
        cd frontend
        npm install
        npm run dev
        ```

## Running Tests

### Backend Tests

- To run unit tests:

    ```bash
    npm run test:unit
    ```

- To run integration tests:

    ```bash
    npm run test:integration
    ```

- To run all tests with coverage:

    ```bash
    npm run test:coverage
    ```

### Frontend Tests

- To run frontend tests:

    ```bash
    npm run test
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
