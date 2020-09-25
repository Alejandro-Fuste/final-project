const axios = require('axios');
const BASE_URI = 'https://option-chain.p.rapidapi.com/options/';

const AuthHeader = () => {
	return {
		'x-rapidapi-host': process.env.API_HOST2,
		'x-rapidapi-key': process.env.API_KEY
	};
};

module.exports = {
	getOptionData: (query) => {
		const { symbol = 'AAPL' } = query;

		return axios.get(`${BASE_URI}${symbol}`, {
			headers: {
				...AuthHeader()
			}
		});
	}
};
