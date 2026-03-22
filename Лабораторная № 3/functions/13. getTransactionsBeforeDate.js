/** 13. getTransactionsBeforeDate(transactions, date) – Возвращает массив транзакций, совершенных до указанной даты.
* @params {Array, String}
* @result {Array}
*/
function getTransactionsBeforeDate(transactions, date) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const targetDate = new Date(date);

    const result = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        if (transactionDate <= targetDate) {
            return transaction;
        }
    })

    return result.length > 0 ? result : "No transactions found.";
}

export { getTransactionsBeforeDate };