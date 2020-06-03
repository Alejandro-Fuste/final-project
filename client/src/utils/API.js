import axios from 'axios';

export default {
	// Gets a summary stock quote from the backend
	getStock: function({ ticker }) {
		return axios.get(`/api/summary/?symbol=${ticker}`);
	}
};
