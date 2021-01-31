import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://127.0.0.1:27017';

const dbName = 'TaskList'
let db

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)

  db = client.db(dbName)
  console.log(`Connected MongoDB: ${mongoUrl} at Database: ${dbName}`)
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/tasks', (req, res) => {
  db.collection("tasks").find({}).toArray().then((values) => { res.status(200).json(values); })
});

app.post('/create-task', (req, res) => {
  const { name, dueDate } = req.body;
  const taskToAdd = {
    text: name,
    resolveDate: null,
    dueDate: dueDate,
    id: uuidv4(),
    date: Date.now(),
  }
  return db.collection('tasks').insertOne(taskToAdd).then((newTask) => {
    if (newTask) {
      res.status(200).json({ message: 'Success', newTask: taskToAdd });
    }
    else {
      res.status(400).json({ message: 'Cannot add task.' });
    }
  })
})

app.post('/resolve-task', (req, res) => {
  const { task } = req.body;
  return db.collection('tasks').findOneAndUpdate(
    { id: task.id },
    {
      $set: { resolveDate: Date.now() }
    },
    { returnOriginal: false }
  ).then((updatedTask) => {
    if (updatedTask.value) {
      res.status(200).json({ message: 'Success', updatedTask: updatedTask.value });
    }
    else {
      res.status(400).json({ message: 'There is no task with that id' });
    }
  })
})

app.post('/delete-history', (req, res) => {
  return db.collection('tasks').deleteMany(
    { resolveDate: { $ne : null } },
    { returnNewDocument: true }
  ).then((result) => {
    if (result) {
      res.status(200).json({ message: 'Success' });
    }
    else {
      res.status(400).json({ message: 'Unable to delete.' });
    }
  })
})

app.listen(8080, () => console.log("Server listening on port 8080"));