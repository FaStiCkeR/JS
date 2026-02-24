/** 1. getUniqueTransactionTypes(transactions)
* Возвращает массив уникальных типов транзакций.
* Используйте Set() для выполнения задания.

* @params {Array}
* @result {Array}

*/
function getUniqueTransactionTypes(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const typeSet = new Set(transactions.map(transaction => {
        return transaction.transaction_type;
    }));

    return [...typeSet];
}

export { getUniqueTransactionTypes };