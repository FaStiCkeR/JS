/** 12. mostTransactionTypes(transactions)
* Возвращает каких транзакций больше всего.
* Возвращает debit, если дебетовых.
* Возвращает credit, если кредитовых.
* Возвращает equal, если количество равно.
* @params{Array}
* @result{String}
*/
function mostTransactionTypes(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const result = transactions.reduce((acc, transaction) => {
        return transaction.transaction_type === 'debit' ? acc + 1 : acc - 1;
    }, 0)

    return result === 0 ? "equals" : (result < 0 ? "credit": "debit")
}

export { mostTransactionTypes };