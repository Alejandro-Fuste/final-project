const axios = require('axios');
const BASE_URI = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/';

const AuthHeader = () => {
	return {
		'x-rapidapi-host': process.env.API_HOST,
		'x-rapidapi-key': process.env.API_KEY
	};
};

module.exports = {
	getSummary: (query) => {
		const { symbol = 'AAPL', region = 'US' } = query;

		return axios.get(`${BASE_URI}${symbol}/financial-data`, {
			// params: {
			// 	symbol,
			// 	region
			// },
			headers: {
				...AuthHeader()
			}
		});
	},
	getNameAndSymbol: (query) => {
		const { symbol = 'AAPL' } = query;

		return axios.get(`${BASE_URI}${symbol}`, {
			// params: {
			// 	symbol
			// },
			headers: {
				...AuthHeader()
			}
		});
	}
};
