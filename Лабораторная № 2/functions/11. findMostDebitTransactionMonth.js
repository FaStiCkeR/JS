/*
11. findMostDebitTransactionMonth(transactions) – Возвращает месяц, в котором было больше дебетовых транзакций.
* @params {Array}
* @result {Date}
*/
function findMostDebitTransactionMonth(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const months = {};
    transactions.filter(transaction => {
        return transaction.transaction_type === "debit";
    })
        .forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            months[month] = (months[month] || 0) + 1;
        })

    let monthWithMaxDebit = 'null';
    let maxDebitInMonth = 0;

    for (const [month, t] of Object.entries(months)) {
        maxDebitInMonth < t && (maxDebitInMonth = t) && (monthWithMaxDebit = month);
    }

    let result = new Date(0);
    result.setMonth(monthWithMaxDebit - 1);
    result = result.toUTCString().split(' ');
    return result[2];

}

export { findMostDebitTransactionMonth };