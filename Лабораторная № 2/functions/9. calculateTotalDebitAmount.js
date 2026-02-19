/*
9. calculateTotalDebitAmount(transactions) – Вычисляет общую сумму дебетовых транзакций.
* @params {Array}
* @result {Number}
*/
function calculateTotalDebitAmount(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    return transactions
        .filter(transaction => transaction.transaction_type === "debit")
        .reduce((acc, transaction) => acc + transaction.transaction_amount, 0)
}

export { calculateTotalDebitAmount };