// Import necessary modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create an Express application
const app = express();
const PORT = process.env.PORT;

// Set up CORS headers to allow cross-origin requests
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL database connection, retrieving contents from process.env instead
const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Endpoint to create a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, false)';

    // Execute the SQL query to insert a new task
    db.query(sql, [title, description], (err, result) => {
        if (err) {
            console.error('Error creating task:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Respond with the details of the newly created task
            const newTask = { id: result.insertId, title, description, completed: false };
            res.json(newTask);
        }
    });
});

// Endpoint to retrieve all tasks from the database
app.get('/api/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';

    // Execute the SQL query to retrieve all tasks
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Respond with the array of tasks
            res.json(results);
        }
    });
});

// Endpoint to update a task's completion status
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const sql = 'UPDATE tasks SET completed = true WHERE id = ?';

    // Execute the SQL query to update the completion status of the task
    db.query(sql, [taskId], (err, result) => {
        if (err || result.affectedRows === 0) {
            console.error('Error updating task:', err);
            res.status(404).json({ error: 'Task not found' });
        } else {
            // Respond with the updated task details
            res.json({ id: taskId, completed: true });
        }
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
