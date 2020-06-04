import axios from 'axios';

export default {
	getStock: function({ ticker }) {
		return axios.get(`/api/summary/?symbol=${ticker}`);
	}
};
