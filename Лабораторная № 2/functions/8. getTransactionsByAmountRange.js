/**
8. getTransactionsByAmountRange(transactions, minAmount, maxAmount) – Возвращает массив транзакций с суммой в заданном диапазоне от minAmount до maxAmount.
* @params {Array, Number | String, Number | String}
* @result {Array}
*/
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    return transactions.filter(transaction => {
        return transaction.transaction_amount <= Number(maxAmount) && transaction.transaction_amount >= Number(minAmount);
    });
}

export { getTransactionsByAmountRange };