// The following function will be used to calculate the dividend amount the company will pay for one payment.

// Variables for Principle Investment Amount, Stock Share Price, and Dividend Rate (Amount already divided by 12, 4, 2 if it's paid monthly, quarterly, or seminannually)

let principleInvestment, sharePrice, dividendRate;

export default {
	// Function with dividend amount equation

	dividendPayment: function(principleInvestment, sharePrice, dividendRate) {
		let payment = principleInvestment / sharePrice * dividendRate;

		return payment.toFixed(2);
	}
};
