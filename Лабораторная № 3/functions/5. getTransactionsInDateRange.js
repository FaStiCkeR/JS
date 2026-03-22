/** 5. Возвращает массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate.
* @params {Array, String, String}
* @result {Array}
*/
function getTransactionsInDateRange(transactions, startDate, endDate) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    return transactions.filter((transaction) => {
        const currentDate = new Date(transaction.transaction_date);
        return startDate <= currentDate && currentDate <= endDate;
    });
}

export { getTransactionsInDateRange };