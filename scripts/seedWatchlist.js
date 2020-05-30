const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Watchlist collection and inserts the watchlist below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/finalProject', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

const watchListSeed = [
	{
		name: 'Apple, Inc.',
		ticker: 'AAPL',
		grade: 'A'
	}
];

db.Watchlist
	.remove({})
	.then(() => db.Watchlist.collection.insertMany(watchListSeed))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
