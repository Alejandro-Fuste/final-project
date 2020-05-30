// Requiring necessary npm packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

// Requiring .dotenv file
require('dotenv').config();

//Setting up port
const PORT = process.env.PORT || 3001;

// Set models folder to db variable
const db = require('./models');

// Creating express app
const app = express();

//Configuring middleware needed for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Morgan middleware
app.use(logger('dev'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// API Routes
require('./routes/api-routes.js')(app);

// Send every request to the React app
// Define any API routes before this runs
// app.get('*', function(req, res) {
// 	res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

// Delete this after finishing development
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, './client/public/index.html'));
});

//Starting database with mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/finalProject', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

//Start server to listen
app.listen(PORT, () => console.log(`🌎 ==> API running on http://localhost:%s/`, PORT));
