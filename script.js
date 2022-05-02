const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const Todo = require('./models/todo');

mongoose.connect(process.env.DB_SERVER, { useNewUrlParser: true });
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const tasksRouter = require('/routes/taskRoutes');
app.use('/routes/taskRoutes', tasksRouter);

app.get('/todos/api', async (req, res) => {
	const todos = await Todo.find();
	res.send(todos);
});

app.listen(port, () => {
	console.log('Server running');
});
