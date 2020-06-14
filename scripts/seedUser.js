const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Watchlist collection and inserts the watchlist below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/finalProject', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

const userSeed = [
	{
		name: 'Luke Skywalker',
		email: 'luke.skywalker@jedi.net',
		password: 'test12',
		password2: 'test12'
	}
];

db.User
	.remove({})
	.then(() => db.User.collection.insertMany(userSeed))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
