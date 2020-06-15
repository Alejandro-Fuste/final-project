let data = {
    name: res.data.quoteType.shortName,
    symbol: res.data.symbol,
    year: res.data.earnings.financialsChart.yearly[3].date,
    revenue: res.data.earnings.financialsChart.yearly[3].revenue.fmt,
    grossProfit: res.data.financialData.grossMargins.fmt,
    operatingIncome: res.data.financialData.profitMargins.fmt,
    netIncome: res.data.earnings.financialsChart.yearly[3].earnings.fmt,
    operatingIncomeAndNetProfit: res.data.financialData.profitMargins.fmt,
    earningsPerShare: res.data.defaultKeyStatistics.trailingEps.fmt,
    totalCash: res.data.financialData.totalCash.fmt,
    totalDebit: res.data.financialData.totalDebt.fmt,
    debtToEquity: res.data.financialData.debtToEquity.fmt,
    currentRatio: res.data.financialData.currentRatio.fmt,
    quickRatio: res.data.financialData.quickRatio.fmt,
    returnOnAssets: res.data.financialData.returnOnAssets.fmt,
    returnOnEquity: res.data.financialData.returnOnEquity.fmt,
    operatingCashFlow: res.data.financialData.operatingCashflow.fmt,
    freeCashFlow: res.data.financialData.freeCashflow.fmt
};

let gData = [
    { property: 'revenue', value: res.data.earnings.financialsChart.yearly[3].revenue.raw },
    { property: 'grossProfit', value: res.data.financialData.grossMargins.raw },
    { property: 'operatingIncome', value: res.data.financialData.operatingMargins.raw },
    { property: 'netIncome', value: res.data.financialData.profitMargins.raw },
    { property: 'earningsPerShare', value: res.data.defaultKeyStatistics.trailingEps.raw },
    { property: 'totalCash', value: res.data.financialData.totalCash.raw },
    { property: 'totalDebt', value: res.data.financialData.totalDebt.raw },
    { property: 'debtToEquity', value: res.data.financialData.debtToEquity.raw },
    { property: 'currentRatio', value: res.data.financialData.currentRatio.raw },
    { property: 'quickRatio', value: res.data.financialData.quickRatio.raw },
    { property: 'returnOnAssets', value: res.data.financialData.returnOnAssets.raw },
    { property: 'returnOnEquity', value: res.data.financialData.returnOnEquity.raw },
    { property: 'freeCashFlow', value: res.data.financialData.freeCashflow.raw }
];

export { data, gData};