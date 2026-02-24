/**
14. findTransactionById(transactions, id) – Возвращает транзакцию по ее уникальному идентификатору (id).
* @params {Array, Number}
* @result {Object}
*/
function findTransactionById(transactions, id) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const [trans] = transactions.filter((transaction) => {
        if (transaction.transaction_id === String(id)) {
            return transaction;
        }
    })
    return trans;
}

export { findTransactionById };