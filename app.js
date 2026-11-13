const express = require('express');
const app = express();

app.use(express.json()); // lets you read req.body as JSON

// In-memory "database"
let tasks = [];
let nextId = 1;

// GET all tasks -> 200
app.get('/api/v1/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET one task by id -> 200 or 404
app.get('/api/v1/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
});

// POST create a task -> 201 or 400
app.post('/api/v1/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update a task -> 200, 400 or 404
app.put('/api/v1/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be true or false' });
  }

  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

// DELETE a task -> 200 or 404
app.delete('/api/v1/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({ message: 'Task deleted', task: deleted });
});

// Handle any route that doesn't exist
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));