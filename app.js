const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const operationsController = require('./controllers/operationsController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: false,
	useUnifiedTopology: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
	console.log("MongoDB connection error");
});

db.once('open', () => {
	console.log("Connected to Database");
});

// CRUD operation endpoints
app.post('/operations', operationsController.createOperation);
app.get('/operations/:operationId', operationsController.getOperation);
app.put('/operations/:operationId', operationsController.updateOperation);
app.delete('/operations/:operationId', operationsController.deleteOperation);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

