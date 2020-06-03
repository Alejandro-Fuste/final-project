// This file offers a set of api routes

// Dependencies
const path = require('path');
// const db = require('../models');
const yahooFinanceAPI = require('../libs/yahooFinanceAPI');

module.exports = function(app) {
	// Each of the below routes will do a different CRUD operation.

	// GET route to get user and their watchlist
	app.get('/api/user', (req, res) => {
		res.send('API user route');

		// db.User
		// 	.find({})
		// 	.populate('Watchlist')
		// 	.then((data) => {
		// 		res.json(data);
		// 	})
		// 	.catch((err) => {
		// 		res.json(err);
		// 	});
	});

	// POST route to add stock to watchlist
	app.post('/api/watchlist', (req, res) => {
		res.send('API watchlist page');

		// db.Watchlist
		// 	.create({})
		// 	.then((data) => {
		// 		res.json(data);
		// 	})
		// 	.catch((err) => {
		// 		res.json(err);
		// 	});
	});

	app.get('/api/summary/?symbol=', (req, res) => {
		yahooFinanceAPI
			.getSummary(req.query)
			.then(({ data }) => {
				return res.json(data);
			})
			.catch((err) => {
				throw err;
			});
	});
};
