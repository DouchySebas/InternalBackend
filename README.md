# Task Management App Backend

This is the backend server for a simple task management application built using Node.js, Express, and MySQL. The server provides RESTful API endpoints for handling tasks, including creating new tasks, retrieving all tasks, and updating task completion status.

## Features

- Create a new task with title and description.
- Retrieve all tasks.
- Update task completion status.

## Technologies Used

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for building APIs.
- **MySQL:** Relational database for storing tasks.

## Getting Started

To run the backend server locally, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/DouchySebas/InternalBackend
   ```

2. Navigate to the `InternalBackend` directory:

   ```bash
   cd InternalBackend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure MySQL connection:

   - Open `BackendApp.js` and modify the `db` constant to match your MySQL server configuration (host, user, password, database).

5. Run the backend server:

   ```bash
   node BackendApp.js
   ```

   The server will be accessible at `http://localhost:3001`.

## API Endpoints

- **POST /api/tasks:** Create a new task.
  - Request body: `{ "title": "Task Title", "description": "Task Description" }`
  - Response: Newly created task object.

- **GET /api/tasks:** Retrieve all tasks.
  - Response: Array of task objects.

- **PUT /api/tasks/:id:** Update task completion status.
  - Response: Updated task object.

## Database Structure

The application uses a MySQL database with a single table `tasks`:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false
);
```

## Contributing

If you'd like to contribute to the project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).