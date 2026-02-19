/* getUniqueTransactionTypes(transactions)
* Возвращает массив уникальных типов транзакций.
* Используйте Set() для выполнения задания.

* @params {Array}
* @result {Array}

*/
function getUniqueTransactionTypes(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    if (transactions) {
        const typesSet = new Set();
        transactions.filter(transaction => {
            typesSet.add(transaction.transaction_type);
        });
        return [...typesSet];
    }
    return [];
}

export { getUniqueTransactionTypes };