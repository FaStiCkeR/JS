/*
7. calculateAverageTransactionAmount(transactions) – Возвращает среднее значение транзакций.
* @params {Array}
* @result {Number?}
*/
function calculateAverageTransactionAmount(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }
    return (transactions.reduce((acc, transaction) => acc + transaction.transaction_amount, 0) / transactions.length);
}

export { calculateAverageTransactionAmount };