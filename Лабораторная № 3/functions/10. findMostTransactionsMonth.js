/** 10. findMostTransactionsMonth(transactions) – Возвращает месяц, в котором было больше всего транзакций.
* @params {Array}
* @result {Date.month}
*/
function findMostTransactionsMonth(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const months = {};

    transactions.forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth() + 1;
        months[month] = (months[month] || 0) + 1;
    });

    let monthWithMaxTransactions = null;
    let maxTransactions = 0;

    for (const [month, t] of Object.entries(months)) {
        maxTransactions < t && (maxTransactions = t) && (monthWithMaxTransactions = month);
    }

    let result = new Date(0);
    result.setMonth(monthWithMaxTransactions - 1);
    result = result.toUTCString().split(' ');
    return result[2];
}

export { findMostTransactionsMonth };