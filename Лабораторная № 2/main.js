// Импорт массива объектов
import {oneTransaction, preparedArray} from "./array.js";
import {
    getUniqueTransactionTypes,
    calculateTotalAmount,
    calculateTotalAmountByDate,
    getTransactionByType,
    getTransactionsInDateRange, getTransactionsByMerchant, calculateAverageTransactionAmount,
    getTransactionsByAmountRange, calculateTotalDebitAmount, findMostDebitTransactionMonth, findMostTransactionsMonth,
    mostTransactionTypes, getTransactionsBeforeDate, findTransactionById, mapTransactionDescriptions,
} from "./functions.js"

// Проверка 1. getUniqueTransactionTypes

// console.log(getUniqueTransactionTypes(preparedArray));
// console.log(getUniqueTransactionTypes(oneTransaction));
// console.log(getUniqueTransactionTypes());


// Проверка 2. calculateTotalAmount

// console.log(calculateTotalAmount(preparedArray));
// console.log(calculateTotalAmount(oneTransaction));
// console.log(calculateTotalAmount());


// Проверка 3. calculateTotalAmountByDate

// console.log(calculateTotalAmountByDate(preparedArray, 2019, 2, 11));
// console.log(calculateTotalAmountByDate(preparedArray, 2019, 1));
// console.log(calculateTotalAmountByDate(preparedArray, 2019, 4, 18));
// console.log(calculateTotalAmountByDate(preparedArray, 2019, 3, 2));
// console.log(calculateTotalAmountByDate())


// Проверка 4. getTransactionByType

// console.log(getTransactionByType(preparedArray, "debit"));
// console.log(getTransactionByType(preparedArray, "credit"));
// console.log(getTransactionByType());


// Проверка 5. getTransactionsInDateRange

// console.log(getTransactionsInDateRange(preparedArray, "2019-01-01", "2019-01-07"));
// console.log(getTransactionsInDateRange(oneTransaction, "2019-01-01", "2019-01-07"));
// console.log(getTransactionsInDateRange());


// Проверка 6. getTransactionsByMerchant

// console.log(getTransactionsByMerchant(preparedArray, "SuperMart"));
// console.log(getTransactionsByMerchant(preparedArray, "OnlineShop"));
// console.log(getTransactionsByMerchant());


// Проверка 7. calculateAverageTransactionAmount

// console.log(calculateAverageTransactionAmount(preparedArray));
// console.log(calculateTotalAmount(oneTransaction));
// console.log(calculateTotalAmount());


// Проверка 8. getTransactionsByAmountRange

// console.log(getTransactionsByAmountRange(preparedArray, 25, 50));
// console.log(getTransactionsByAmountRange(preparedArray, 20, 70));
// console.log(getTransactionsByAmountRange());


// Проверка 9. calculateTotalDebitAmount

// console.log(calculateTotalDebitAmount(preparedArray));
// console.log(calculateTotalDebitAmount(oneTransaction));
// console.log(calculateTotalDebitAmount();


// Проверка 10. findMostTransactionsMonth

// console.log(findMostTransactionsMonth(preparedArray));
// console.log(findMostTransactionsMonth(oneTransaction));
// console.log(findMostTransactionsMonth());


// Проверка 11. findMostDebitTransactionMonth
// console.log(findMostDebitTransactionMonth(preparedArray));
// console.log(findMostDebitTransactionMonth(oneTransaction))
// console.log(findMostDebitTransactionMonth());


// Проверка 12. mostTransactionTypes(transactions)

// console.log(mostTransactionTypes(preparedArray));
// console.log(mostTransactionTypes(oneTransaction));
// console.log(mostTransactionTypes());


// Проверка 13. getTransactionsBeforeDate

// console.log(getTransactionsBeforeDate(preparedArray, "2019-01-05"));
// console.log(getTransactionsBeforeDate(oneTransaction, "2019-01-05"));
// console.log(getTransactionsBeforeDate());


// Проверка 14. findTransactionById
// console.log(findTransactionById(preparedArray, 2));
// console.log(findTransactionById(preparedArray, 12));
// console.log(findTransactionById(oneTransaction, 3));
// console.log(findTransactionById(oneTransaction, 21))
// console.log(findTransactionById());


// Проверка 15. mapTransactionDescriptions
console.log(mapTransactionDescriptions(preparedArray));
console.log(mapTransactionDescriptions(oneTransaction));
console.log(mapTransactionDescriptions());