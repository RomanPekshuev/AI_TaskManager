const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

router.post('/', (req, res) => {
  const db = readDB();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || '',
    priority: req.body.priority || 'medium',
    deadline: req.body.deadline || null,
    completed: false
  };
  db.tasks.push(newTask);
  writeDB(db);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const db = readDB();
  const index = db.tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    db.tasks[index] = { ...db.tasks[index], ...req.body };
    writeDB(db);
    res.json(db.tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

router.delete('/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.filter(t => t.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Task deleted' });
});

module.exports = router;