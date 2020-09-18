const axios = require('axios');
const BASE_URI = 'https://option-chain.p.rapidapi.com/options/';

const AuthHeader = () => {
	return {
		'x-rapidapi-host': process.env.API_HOST,
		'x-rapidapi-key': process.env.API_KEY
	};
};
