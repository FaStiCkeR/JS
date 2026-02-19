/*
15. mapTransactionDescriptions(transactions) – Возвращает новый массив,
    содержащий только описания транзакций.
* @params {Array}
* @result {Array]
*/
function mapTransactionDescriptions(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    return transactions.map(transaction => transaction.transaction_description);
}

export { mapTransactionDescriptions };