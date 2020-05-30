// Require mongoose
const mongoose = require('mongoose');

// Create schema variable
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'Enter the company name for the stock'
	},
	ticker: {
		type: String,
		trim: true,
		required: 'Enter the ticker symbol for the company'
	},
	grade: {
		type: String,
		trim: true
	}
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
