/* 3. calculateTotalAmountByDate(transactions, year, month, day) [extra]

* Вычисляет общую сумму транзакций за указанный год, месяц и день.
* Параметры year, month и day являются необязательными.
* В случае отсутствия одного из параметров, метод производит расчет по остальным.

* @params {Array, Number | null, Number | null, Number | null}
* @result {Object}
* Год находится от 0 до 4 индекса, месяц от 5 до 7 индекса, день от 8 до 10 индекса. Пример 2019-04-13
*/
function calculateTotalAmountByDate(transactions, year = null, month = null, day = null) {
    if (!transactions || transactions.length === 0) {
        return "No transactions found.";
    }

    const date = new Date();
    let resultArray;

    if (year) {
        date.setFullYear(year);
        resultArray = transactions.filter(transaction => {
            return new Date(transaction.transaction_date).getFullYear() === date.getFullYear();
        });
    }
    if (month) {
        date.setMonth(month - 1);
        resultArray = resultArray.filter(transaction => {
            return new Date(transaction.transaction_date).getMonth() === date.getMonth();
        });
    }
    if (day) {
        date.setDate(day);
        resultArray = resultArray.filter(transaction => {
            return new Date(transaction.transaction_date).getDate() === date.getDate();
        });
    }

    return resultArray.reduce((accumulator, transaction) => {
        return accumulator + transaction.transaction_amount;
    }, 0);
}

export { calculateTotalAmountByDate };