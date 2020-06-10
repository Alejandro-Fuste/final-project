/* The following functions will give a letter grade based 
on the value that is passed into it. The values will come 
from the Yahoo Finance API */

// The income statement functions are revenue, operatingIncome, operatingIncome, netProfit, EPS
// The balance sheet functions are debtToEquity, quickRatio, currentRatio, returnOnAssets, returnOnEquity
// The cash flow statement function is freeCashFlow

// give a point value depending the letter grade
// return an GPA

const GRADE_A = { letter: 'A', value: 4 };
const GRADE_B = { letter: 'B', value: 3 };
const GRADE_C = { letter: 'C', value: 2 };
const GRADE_D = { letter: 'D', value: 1 };
const GRADE_F = { letter: 'F', value: 0 };

export default {
	revenue: function(value) {
		if (value >= 300000000000) {
			return { ...GRADE_A };
		} else if (value >= 100000000000 && value <= 299999999999) {
			return { ...GRADE_B };
		} else if (value >= 80000000000 && value <= 99999999999) {
			return { ...GRADE_C };
		} else if (value >= 60000000000 && value <= 79999999999) {
			return { ...GRADE_D };
		} else if (value <= 59999999999) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	grossProfit: function(value) {
		if (value >= 0.32) {
			return { ...GRADE_A };
		} else if (value >= 0.26 && value <= 0.31) {
			return { ...GRADE_B };
		} else if (value >= 0.2 && value <= 0.25) {
			return { ...GRADE_C };
		} else if (value >= 0.14 && value <= 0.19) {
			return { ...GRADE_D };
		} else if (value <= 0.13) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	operatingIncome: function(value) {
		if (value >= 0.18) {
			return { ...GRADE_A };
		} else if (value >= 0.15 && value <= 0.17999) {
			return { ...GRADE_B };
		} else if (value >= 0.12 && value <= 0.14999) {
			return { ...GRADE_C };
		} else if (value >= 0.09 && value <= 0.11999) {
			return { ...GRADE_D };
		} else if (value <= 0.08999) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	netIncome: function(value) {
		if (value >= 0.18) {
			return { ...GRADE_A };
		} else if (value >= 0.15 && value <= 0.17999) {
			return { ...GRADE_B };
		} else if (value >= 0.12 && value <= 0.14999) {
			return { ...GRADE_C };
		} else if (value >= 0.09 && value <= 0.11999) {
			return { ...GRADE_D };
		} else if (value <= 0.08999) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	earningsPerShare: function(value) {
		if (value >= 10) {
			return { ...GRADE_A };
		} else if (value >= 7 && value <= 9) {
			return { ...GRADE_B };
		} else if (value >= 4 && value <= 6) {
			return { ...GRADE_C };
		} else if (value >= 1 && value <= 3) {
			return { ...GRADE_D };
		} else if (value < 1) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	totalCash: function(value) {
		if (value >= 80000000000) {
			return { ...GRADE_A };
		} else if (value >= 59000000000 && value <= 79999999999) {
			return { ...GRADE_B };
		} else if (value >= 38000000000 && value <= 58999999999) {
			return { ...GRADE_C };
		} else if (value >= 17000000000 && value <= 37999999999) {
			return { ...GRADE_D };
		} else if (value <= 16999999999) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	totalDebt: function(value) {
		if (value <= 66000000000) {
			return { ...GRADE_A };
		} else if (value >= 66000000001 && value <= 86000000000) {
			return { ...GRADE_B };
		} else if (value >= 86000000001 && value <= 106000000000) {
			return { ...GRADE_C };
		} else if (value >= 106000000001 && value <= 126000000000) {
			return { ...GRADE_D };
		} else if (value >= 126000000001) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	debtToEquity: function(value) {
		if (value <= 0.6) {
			return { ...GRADE_A };
		} else if (value >= 0.61 && value <= 0.7) {
			return { ...GRADE_B };
		} else if (value >= 0.71 && value <= 0.8) {
			return { ...GRADE_C };
		} else if (value >= 0.81 && value <= 0.9) {
			return { ...GRADE_D };
		} else if (value > 0.9) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	quickRatio: function(value) {
		if (value >= 1.12) {
			return { ...GRADE_A };
		} else if (value >= 1.01 && value <= 1.11) {
			return { ...GRADE_B };
		} else if (value >= 0.9 && value <= 1.0) {
			return { ...GRADE_C };
		} else if (value >= 0.79 && value <= 0.89) {
			return { ...GRADE_D };
		} else if (value <= 0.78) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	currentRatio: function(value) {
		if (value >= 1.12) {
			return { ...GRADE_A };
		} else if (value >= 1.01 && value <= 1.11) {
			return { ...GRADE_B };
		} else if (value >= 0.9 && value <= 1.0) {
			return { ...GRADE_C };
		} else if (value >= 0.79 && value <= 0.89) {
			return { ...GRADE_D };
		} else if (value <= 0.78) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	returnOnAssets: function(value) {
		if (value >= 0.09) {
			return { ...GRADE_A };
		} else if (value >= 0.06 && value <= 0.089) {
			return { ...GRADE_B };
		} else if (value >= 0.03 && value <= 0.059) {
			return { ...GRADE_C };
		} else if (value >= 0.01 && value <= 0.029) {
			return { ...GRADE_D };
		} else if (value < 0.01) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	returnOnEquity: function(value) {
		if (value >= 0.2) {
			return { ...GRADE_A };
		} else if (value >= 0.15 && value <= 0.1999) {
			return { ...GRADE_B };
		} else if (value >= 0.1 && value <= 0.1499) {
			return { ...GRADE_C };
		} else if (value >= 0.05 && value <= 0.099) {
			return { ...GRADE_D };
		} else if (value <= 0.0499) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	freeCashFlow: function(value) {
		if (value >= 40000000000) {
			return { ...GRADE_A };
		} else if (value >= 34000000000 && value <= 39999999999) {
			return { ...GRADE_B };
		} else if (value >= 28000000000 && value <= 33999999999) {
			return { ...GRADE_C };
		} else if (value >= 22000000000 && value <= 27999999999) {
			return { ...GRADE_D };
		} else if (value <= 21999999999) {
			return { ...GRADE_F };
		} else {
			return 'Can not calculate value';
		}
	},
	finalGrade: function(arr) {
		let value = arr.map((item) => item.letterGrade.value).reduce((a, b) => (a + b) / arr.length);
		console.log(value);
		if (value >= 0.37 && value <= 0.4) {
			return 'A';
		} else if (value >= 0.3 && value <= 0.36) {
			return 'B';
		} else if (value >= 0.2 && value <= 0.29) {
			return 'C';
		} else if (value >= 0.1 && value <= 0.19) {
			return 'D';
		} else if (value < 0.1) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	}
};

// GPA: function(arr) {
// 	arr.map(item => item.value).reduce((a,b) => (a + b)/arr.length)
// },
