const axios = require('axios');
const BASE_URI = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2';

const AuthHeader = () => {
	return {
		'x-rapidapi-host': process.env.API_HOST,
		'x-rapidapi-key': process.env.API_KEY
	};
};

module.exports = {
	getSummary: (query) => {
		const { symbol = 'AAPL', region = 'US' } = query;

		return axios.get(`${BASE_URI}/get-summary`, {
			params: {
				symbol,
				region
			},
			headers: {
				...AuthHeader()
			}
		});
	}
};
