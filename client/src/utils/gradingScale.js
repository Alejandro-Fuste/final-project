/* The following functions will give a letter grade based 
on the value that is passed into it. The values will come 
from the Yahoo Finance API */

// The income statement functions are revenue, operatingIncome, operatingIncome, netProfit, EPS
// The balance sheet functions are debtToEquity, quickRatio, currentRatio, returnOnAssets, returnOnEquity
// The cash flow statement function is freeCashFlow

// give a point value depending the letter grade
// return an GPA

export default {
	revenue: function(value) {
		if (value >= 300000000000) {
			return 'A';
		} else if (value >= 100000000000 && value <= 299999999999) {
			return 'B';
		} else if (value >= 80000000000 && value <= 99999999999) {
			return 'C';
		} else if (value >= 60000000000 && value <= 79999999999) {
			return 'D';
		} else if (value <= 59999999999) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	operatingIncome: function(value) {
		if (value >= 0.32) {
			return 'A';
		} else if (value >= 0.26 && value <= 0.31) {
			return 'B';
		} else if (value >= 0.2 && value <= 0.25) {
			return 'C';
		} else if (value >= 0.14 && value <= 0.19) {
			return 'D';
		} else if (value <= 0.13) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	operatingIncomeAndNetProfit: function(value) {
		if (value >= 0.18) {
			return 'A';
		} else if (value >= 0.15 && value <= 0.17) {
			return 'B';
		} else if (value >= 0.12 && value <= 0.14) {
			return 'C';
		} else if (value >= 0.09 && value <= 0.11) {
			return 'D';
		} else if (value <= 0.08) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	earningPerShare: function(value) {
		if (value >= 10) {
			return 'A';
		} else if (value >= 7 && value <= 9) {
			return 'B';
		} else if (value >= 4 && value <= 6) {
			return 'C';
		} else if (value >= 1 && value <= 3) {
			return 'D';
		} else if (value < 1) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	debtToEquity: function(value) {
		if (value <= 0.6) {
			return 'A';
		} else if (value >= 0.61 && value <= 0.7) {
			return 'B';
		} else if (value >= 0.71 && value <= 0.8) {
			return 'C';
		} else if (value >= 0.81 && value <= 0.9) {
			return 'D';
		} else if (value > 0.9) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	quickRatioAndCurrentRatio: function(value) {
		if (value >= 1.12) {
			return 'A';
		} else if (value >= 1.01 && value <= 1.11) {
			return 'B';
		} else if (value >= 0.9 && value <= 1.0) {
			return 'C';
		} else if (value >= 0.79 && value <= 0.89) {
			return 'D';
		} else if (value <= 0.78) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	returnOnAssets: function(value) {
		if (value >= 0.09) {
			return 'A';
		} else if (value >= 0.06 && value <= 0.089) {
			return 'B';
		} else if (value >= 0.03 && value <= 0.059) {
			return 'C';
		} else if (value >= 0.01 && value <= 0.029) {
			return 'D';
		} else if (value < 0.01) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	returnOnEquity: function(value) {
		if (value >= 0.2) {
			return 'A';
		} else if (value >= 0.15 && value <= 0.1999) {
			return 'B';
		} else if (value >= 0.1 && value <= 0.1499) {
			return 'C';
		} else if (value >= 0.05 && value <= 0.099) {
			return 'D';
		} else if (value <= 0.0499) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	freeCashFlow: function(value) {
		if (value >= 40000000000) {
			return 'A';
		} else if (value >= 34000000000 && value <= 39999999999) {
			return 'B';
		} else if (value >= 28000000000 && value <= 33999999999) {
			return 'C';
		} else if (value >= 22000000000 && value <= 27999999999) {
			return 'D';
		} else if (value <= 21999999999) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	},
	finalGrade: function(allThings) {
		if (value >= 3.7 && value <= 4.0) {
			return 'A';
		} else if (value >= 3.0 && value <= 3.6) {
			return 'B';
		} else if (value >= 2.0 && value <= 2.9) {
			return 'C';
		} else if (value >= 1.0 && value <= 1.9) {
			return 'D';
		} else if (value < 1.0) {
			return 'F';
		} else {
			return 'Can not calculate value';
		}
	}
};
