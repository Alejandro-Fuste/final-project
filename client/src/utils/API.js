import axios from 'axios';

export default {
	getData: function({ ticker }) {
		return axios.get(`/api/summary/?symbol=${ticker}`);
	},

	saveToWatchlist: function(data) {
		return axios.post(`/api/watchlist`, data);
	}
};
