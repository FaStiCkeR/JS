/** 2. calculateTotalAmount(transactions) – Вычисляет сумму всех транзакций.

* @params {Array}
* @result {Number}

* Подсчет суммы всех транзакций transaction_amount
*/
function calculateTotalAmount(transactions) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    return transactions.reduce((acc, transaction) => {
        return acc + transaction.transaction_amount;
    }, 0)
}

export { calculateTotalAmount };