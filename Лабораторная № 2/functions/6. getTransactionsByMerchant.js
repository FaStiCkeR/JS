/*
6. getTransactionsByMerchant(transactions, merchantName) – Возвращает массив транзакций, совершенных с указанным merchantName
* @params {Array, String}
* @result {Array}
*/
function getTransactionsByMerchant(transactions, merchantName) {
    if (!transactions || transactions.length === 0 || merchantName === undefined) {
        return "No transactions or Merchant Name found.";
    }
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

export { getTransactionsByMerchant };