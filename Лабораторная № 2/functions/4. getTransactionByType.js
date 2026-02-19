/* 4. getTransactionByType(transactions, type) - Возвращает транзакции указанного типа (debit или credit).
* @params {Array, String}
* @result {Array}
*/
function getTransactionByType(transactions, type) {
    if (!transactions || transactions.length === 0 || type === undefined) {
        return "No transactions or type found.";
    }

    return transactions.filter(transaction => transaction.type === type);
}

export { getTransactionByType };