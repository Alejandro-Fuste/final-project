// This file offers a set of api routes

// Dependencies
const path = require('path');
const db = require('../models');
const yahooFinanceAPI = require('../libs/yahooFinanceAPI');

module.exports = function(app) {
	// Each of the below routes will do a different CRUD operation.

	// GET route to get user and their watchlist
	// app.get('/api/user', (req, res) => {
	// 	db.User
	// 		.find({})
	// 		.populate('Watchlist')
	// 		.then((data) => {
	// 			res.json(data);
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// });

	app.get('/api/watchlist', (req, res) => {
		db.Watchlist
			.find({})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});

	// POST route to add stock to watchlist
	app.post('/api/watchlist', ({ body }, res) => {
		console.log(body);
		db.Watchlist
			.create(body)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(422).json(err);
			});
	});

	// Delete route to remove stock from watchlist
	app.delete('/api/watchlist/:id', (req, res) => {
		db.Watchlist
			.deleteOne({ _id: req.params.id })
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});

	// Get summary quote from Yahoo Finance API
	app.get('/api/summary', (req, res) => {
		yahooFinanceAPI
			.getSummary(req.query)
			.then(({ data }) => {
				yahooFinanceAPI
					.getNameAndSymbol(req.query)
					.then((resultName) => {
						data.longName = resultName.data[0].longName;
						data.symbol = resultName.data[0].symbol;
						console.log(data);
						return res.json(data);
					})
					.catch((err) => {
						throw err;
					});
			})
			.catch((err) => {
				res.status(422).json(err);
			});
	});
};
