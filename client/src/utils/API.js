import axios from 'axios';

export default {
	getStock: function({ ticker }) {
		return axios.get(`/api/summary/?symbol=${ticker}`);
	},
	saveToWathlist: function(data) {
		return axios.post(`/api/watchlist`, data);
	}
};
