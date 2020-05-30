const unirest = require('unirest');
const BASE_URI = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2';

const attachAuthHeader = (request) => {
	request.headers({
		'x-rapidapi-host': process.env.API_HOST,
		'x-rapidapi-key': process.env.API_KEY
	});

	return request;
};

module.exports = {
	getSummary: (query, cb) => {
		const request = unirest('GET', `${BASE_URI}/get-summary`);
		const { symbol = 'AAPL', region = 'US' } = query;

		request.query({
			region,
			symbol
		});

		attachAuthHeader(request).end(function(result) {
			if (result.error) throw new Error(result.error);

			console.log(result.body);
			return cb(result.body);
		});
	}
};
