const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});
app.use(bodyParser.json());

//Creation of the connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'InternalBackend',
    password : 'password',
    database : 'lhngroupassessment'
  });



//Testing of Connection
db.connect((err) => {
    if(err){
        console.error('Error connecting to MySQL:', err);
    }else{
        console.log('Connected to MySQL ');
    }
});

//Creation of a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, false)';
  
    db.query(sql, [title, description], (err, result) => {
        if (err) {
            console.error('Error creating task:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const newTask = { id: result.insertId, title, description, completed: false };
            res.json(newTask);
        }
    });
});
  
//Retrieval of all tasks. Filtering can be done on Frontend instead to prevent mass requests
app.get('/api/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

//Updating of tasks to completion
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const sql = 'UPDATE tasks SET completed = true WHERE id = ?';

    db.query(sql, [taskId], (err, result) => {
        if (err || result.affectedRows === 0) {
            console.error('Error updating task:', err);
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ id: taskId, completed: true });
        }
    });
});

app.listen(PORT,  ()   =>{
    console.log(`Server started on port http://localhost:${PORT}`);
});