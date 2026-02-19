# *Лабораторная работа № 2*

## Шаг 1. Создание массива транзакций
Копируем содержимое файла с [транзакциями](https://github.com/MSU-Courses/javascript/blob/main/lab/LL_02/files/transactions.js). Для более удобного написания функций, создам файл под названием с массивом транзакций. Можем наблюдать двойную вложенность массива, что составит трудности при работе с данными, для этого деструктуризируем массив и записываю в переменную `preparedArray`.
Деструктуризация выглядит следующим образом `const [preparedArray] = transactions`, также создам массив с одним объектом, для дальнейших проверок функций.
``` javascript
const oneTransaction = [{
    transaction_id: "121",
    transaction_date: "2019-04-22",
    transaction_amount: 56.0,
    transaction_type: "debit",
    transaction_description: "Returned item",
    merchant_name: "RetailStore4236",
    card_type: "MasterCard",
}];
```
Затем экспортирую два готовых массива, путем ввода 
```javascript
export { preparedArray, oneTransaction };
```
## Проверка массива как обязательный параметр функции.
Каждая функция будет проверять наличие вызова с массивом, как аргумента, если массив не найден или его длина равна нулю, функции будут возвращать строку "No transaction found.".
```javascript
// Проверка на наличие массива объектов как параметр функции.

 if (!transactions || transactions.length === 0) {
    return "No transactions found.";
}
```
Это можно было обернуть в функцию и объявлять в начале каждой функции, но тут уже по желанию.
### 1. getUniqueTransactionTypes
Данная функция должна возвращать, а в самой функции должен использоваться Set() для выполнения задания, реализация функции выглядит следующим способом:
```javascript
const typeSet = new Set(transactions.map(transaction => {
    return transaction.transaction_type;
}));

return [...typeSet];
```
Объявляем константу, называем typeSet, которая является типом данных Set(), тип данных, где не могут быть сохранены одинаковые значения. В новое множество попадает callback функция, которая проходится по всему массиву и возвращает новый массив с типом встреченной операции результат, массив от callback функции попадет как раз-таки в множество, отсеявшие одинаковые значения. После чего функция будет возвращать массив из содержимого множества, благодаря использованию `...spread` оператора.

### 2. calculateTotalAmount
Данная функция принимает массив транзакций и возвращает общую сумму всех транзакций. Для вычисления суммы используется метод `reduce()`, который последовательно обрабатывает каждый элемент массива и накапливает результат.
```javascript
return transactions.reduce((acc, transaction) => {
    return acc + transaction.transaction_amount;
}, 0)
```
Метод reduce вызывается на массиве с двумя аргументами: колбэк-функцией и начальным значением аккумулятора 0. callback принимает текущий аккумулятор acc и текущий объект транзакции transaction. На каждой итерации к аккумулятору прибавляется значение transaction.transaction_amount. После обхода всех элементов возвращается итоговая сумма.

### 3. calculateTotalAmountByDate
Данная функция принимает массив транзакций и опциональные параметры года, месяца и дня, и возвращает сумму транзакций, отфильтрованных по указанной дате. Фильтрация происходит последовательно с использованием объекта Date, а итоговая сумма вычисляется методом reduce().
Создаётся объект date с текущей датой (используется как базовый для сравнения).

```javascript
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
```
Переменная resultArray инициализируется позже; фактически она получает значение после первой фильтрации.

Если передан year, устанавливается год в объекте date, и исходный массив фильтруется: оставляются только транзакции, год которых совпадает с заданным.

Если передан month, месяц в date устанавливается (с учётом того, что в JavaScript месяцы нумеруются с 0, поэтому month - 1). Текущий массив (resultArray) фильтруется по месяцу.

Если передан day, устанавливается день, и выполняется фильтрация по дню.

После всех фильтраций к итоговому массиву применяется reduce(), который суммирует значения transaction_amount. Начальное значение аккумулятора — 0.

### 4. getTransactionByType
Данная функция принимает массив транзакций и строку с типом операции, и возвращает новый массив, содержащий только транзакции указанного типа (например, "debit" или "credit"). Для фильтрации используется метод filter(). В начале функции выполняется проверка входных данных на корректность.
```javascript
return transactions.filter(transaction => transaction.type === type);
```
Если проверка пройдена, вызывается метод filter() на массиве transactions. В колбэке сравнивается свойство type каждой транзакции с переданным значением type. Оператор строгого равенства (===) гарантирует сравнение без приведения типов.

Возвращается новый массив, содержащий только те транзакции, у которых type совпадает с искомым.

### 5. getTransactionDateRange
Данная функция принимает массив транзакций и две строки с датами (начало и конец диапазона) и возвращает новый массив, содержащий только те транзакции, дата которых попадает в указанный диапазон включительно. Для фильтрации используется метод filter(), а сравнение дат выполняется с помощью объектов Date.
```javascript
startDate = new Date(startDate);
endDate = new Date(endDate);

return transactions.filter((transaction) => {
    const currentDate = new Date(transaction.transaction_date);
    return startDate <= currentDate && currentDate <= endDate;
});
```
Переданные строки startDate и endDate преобразуются в объекты Date. Это необходимо для корректного сравнения.

Затем вызывается метод filter() на исходном массиве. Для каждой транзакции:

Создаётся объект currentDate из поля transaction.transaction_date.

Проверяется условие: currentDate больше или равно startDate И меньше или равно endDate. Операторы сравнения работают с объектами Date, преобразуя их в числовые значения (миллисекунды).

В новый массив попадают только те транзакции, для которых условие истинно.

### 6. getTransactionsByMerchant 
Данная функция принимает массив транзакций и название продавца (мерчанта) и возвращает новый массив, содержащий только те транзакции, которые были совершены с указанным продавцом. Для фильтрации используется метод filter(), который сравнивает свойство merchant_name каждой транзакции с переданным значением.
Метод filter() вызывается на массиве transactions.
```javascript
return transactions.filter(transaction => transaction.merchant_name === merchantName);
```
Колбэк-функция проверяет для каждой транзакции: transaction.merchant_name === merchantName. Используется строгое равенство (===) для сравнения без приведения типов.

Возвращается новый массив, содержащий только те элементы, для которых условие истинно.

### 7. calculateAverageTransactionAmount
Данная функция принимает массив транзакций и возвращает среднее арифметическое сумм всех транзакций. Вычисление происходит путём деления общей суммы (полученной через reduce()) на количество элементов в массиве.
```javascript
return (transactions.reduce((acc, transaction) => acc + transaction.transaction_amount, 0) / transactions.length);
```
Метод reduce() суммирует значения transaction.transaction_amount по всем элементам массива, начиная с аккумулятора 0.

Полученная сумма делится на количество элементов в массиве (transactions.length).

Результат деления возвращается как среднее значение.

### 8. getUniqueTransactionTypes
Данная функция принимает массив транзакций и два значения (минимальная и максимальная сумма) и возвращает новый массив, содержащий только те транзакции, сумма которых попадает в указанный диапазон включительно. Для фильтрации используется метод filter(), а сравнение выполняется после преобразования переданных значений в числа.
```javascript
return transactions.filter(transaction => {
    return transaction.transaction_amount <= Number(maxAmount) && transaction.transaction_amount >= Number(minAmount);
    });
```
Метод filter() вызывается на массиве transactions.

Для каждой транзакции проверяется условие:

transaction.transaction_amount меньше или равно Number(maxAmount)

И transaction.transaction_amount больше или равно Number(minAmount)

Оба граничных значения явно преобразуются в числа с помощью Number(), что позволяет передавать строки (например, "100.50").

В новый массив попадают только те транзакции, для которых оба условия истинны.

### 9. calculateTotalDebitAmount
Данная функция принимает массив транзакций и возвращает общую сумму только дебетовых транзакций (с типом "debit"). Сначала с помощью метода filter() отбираются транзакции нужного типа, затем к полученному массиву применяется reduce() для суммирования их сумм.
```javascript
return transactions
        .filter(transaction => transaction.transaction_type === "debit")
        .reduce((acc, transaction) => acc + transaction.transaction_amount, 0)
```
Метод filter() вызывается на исходном массиве и оставляет только те элементы, у которых transaction_type строго равно "debit".

К полученному отфильтрованному массиву (который может быть пустым) применяется reduce() с начальным значением аккумулятора 0. На каждой итерации к сумме прибавляется transaction_amount.

Итоговая сумма возвращается как результат.

### 10.findMostTransactionsMonth 
Данная функция принимает массив транзакций и возвращает название месяца (в текстовом формате), в котором было совершено наибольшее количество транзакций. Для подсчёта используется объект, где ключами выступают номера месяцев, а значениями — количество транзакций. Затем определяется месяц с максимальным значением, и его номер преобразуется в название месяца через объект Date.
```javascript
const months = {};

    transactions.forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth() + 1;
        months[month] = (months[month] || 0) + 1;
    });

    let monthWithMaxTransactions = null;
    let maxTransactions = 0;

    for (const [month, t] of Object.entries(months)) {
        maxTransactions < t && (maxTransactions = t) && (monthWithMaxTransactions = month);
    }

    let result = new Date(0);
    result.setMonth(monthWithMaxTransactions - 1);
    result = result.toUTCString().split(' ');
    return result[2];
```
Создаётся пустой объект months для хранения счётчиков по месяцам.

Метод forEach() обходит все транзакции:

Из transaction.transaction_date создаётся объект Date, из которого извлекается номер месяца (getMonth(), от 0 до 11). К результату прибавляется 1, чтобы получить номер месяца от 1 до 12.

Соответствующее свойство объекта months увеличивается на 1 (если его не было, инициализируется 1).

Далее объявляются переменные monthWithMaxTransactions (для хранения номера месяца с максимумом) и maxTransactions (максимальное количество).

Цикл for...of с Object.entries(months) проходит по всем парам [месяц, количество]. Используется хитрое выражение: если текущее количество t больше maxTransactions, то одновременно обновляются maxTransactions и monthWithMaxTransactions. Это компактная, но неочевидная запись условия.

После нахождения месяца создаётся объект Date с начальной эпохой (new Date(0) — 1 января 1970 года). Ему устанавливается месяц, соответствующий найденному номеру минус 1 (так как setMonth принимает индекс от 0).

Вызывается toUTCString(), возвращающая строку вида "Wed, 01 Jan 1970 00:00:00 GMT". Эта строка разбивается по пробелам, и берётся третий элемент (result[2]), который содержит название месяца (например, "Jan").

### 11. findMostDebitTransactionMonth
Данная функция принимает массив транзакций и возвращает название месяца (в текстовом формате), в котором было совершено наибольшее количество дебетовых транзакций (с типом "debit"). Сначала выполняется фильтрация транзакций по типу, затем подсчёт количества по месяцам, после чего определяется месяц с максимальным значением и преобразуется в название месяца через объект Date.
```javascript
const months = {};
transactions.filter(transaction => {
    return transaction.transaction_type === "debit";
})
    .forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth() + 1;
        months[month] = (months[month] || 0) + 1;
    })

let monthWithMaxDebit = 'null';
let maxDebitInMonth = 0;

for (const [month, t] of Object.entries(months)) {
    maxDebitInMonth < t && (maxDebitInMonth = t) && (monthWithMaxDebit = month);
}

let result = new Date(0);
result.setMonth(monthWithMaxDebit - 1);
result = result.toUTCString().split(' ');
return result[2];
```

### 12. mostTransactionTypes
Данная функция принимает массив транзакций и определяет, каких транзакций больше: дебетовых (debit) или кредитовых (credit). Если количество совпадает, возвращается "equals". Подсчёт выполняется с использованием метода reduce(), где аккумулятор увеличивается для дебетовых и уменьшается для кредитовых транзакций.
```javascript
const result = transactions.reduce((acc, transaction) => {
    return transaction.transaction_type === 'debit' ? acc + 1 : acc - 1;
}, 0)

return result === 0 ? "equals" : (result < 0 ? "credit" : "debit")
```
Метод reduce() обходит все элементы массива, начиная с аккумулятора 0.

Для каждой транзакции проверяется тип:

если transaction_type === 'debit', аккумулятор увеличивается на 1;

иначе (предполагается, что это 'credit') аккумулятор уменьшается на 1.

После обработки всех транзакций переменная result содержит:

положительное число — дебетовых больше;

отрицательное число — кредитовых больше;

0 — количество равно.

Тернарный оператор преобразует числовой результат в строку:

result === 0 → "equals";

result < 0 → "credit";

иначе → "debit".

### 13. getTransactionsBeforeDate
Данная функция принимает массив транзакций и строку с датой, и возвращает новый массив, содержащий только те транзакции, которые были совершены до указанной даты включительно. Для фильтрации используется метод filter(), а сравнение дат выполняется с помощью объектов Date. В конце проверяется, есть ли результаты, иначе возвращается сообщение.
```javascript
const targetDate = new Date(date);

    const result = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        if (transactionDate <= targetDate) {
            return transaction;
        }
    })

    return result.length > 0 ? result : "No transactions found.";
```
Переданная строка date преобразуется в объект Date (targetDate).

Метод filter() вызывается на исходном массиве. Для каждой транзакции:

Создаётся объект transactionDate из поля transaction.transaction_date.

Проверяется условие: transactionDate <= targetDate. Оператор сравнения преобразует даты в числовые значения (миллисекунды), поэтому сравнение работает корректно.

В filter() ожидается возврат логического значения. Однако здесь используется if (transactionDate <= targetDate) { return transaction; }. В JavaScript, если условие истинно, возвращается объект транзакции, который будет преобразован в логическое true, поэтому элемент попадёт в результат. Если условие ложно, функция ничего не возвращает (т.е. возвращает undefined, что эквивалентно false). Такой подход работает, но может быть менее явным, чем непосредственный возврат булева значения (например, return transactionDate <= targetDate;).

### 14. findTransactionById
Данная функция принимает массив транзакций и идентификатор транзакции, и возвращает объект транзакции с указанным идентификатором. Для поиска используется метод filter(), после чего с помощью деструктуризации извлекается первый элемент полученного массива. Идентификатор приводится к строке для корректного сравнения.
```javascript
const [trans] = transactions.filter((transaction) => {
        if (transaction.transaction_id === String(id)) {
            return transaction;
        }
    })
    return trans;
```
Метод filter() вызывается на исходном массиве. Для каждой транзакции выполняется проверка: transaction.transaction_id === String(id). Идентификатор id явно преобразуется в строку, чтобы обеспечить сравнение без приведения типов, так как transaction_id вероятно хранится как строка.

Внутри filter используется if и возврат объекта транзакции при совпадении. Поскольку filter ожидает булево значение, возврат объекта будет преобразован в true, поэтому элемент попадёт в результирующий массив. Если условие ложно, функция ничего не возвращает (т.е. undefined), что эквивалентно false. Такой подход работает, но является нестандартным.

Результат filter — массив, содержащий все транзакции с совпадающим id (по идее, не более одной). Затем используется деструктуризация const [trans] = ..., чтобы присвоить переменной trans первый элемент этого массива. Если массив пуст, trans будет undefined.

Функция возвращает trans.

### 15. mapTransactionDescriptions
Данная функция принимает массив транзакций и возвращает новый массив, содержащий только описания (поле transaction_description) каждой транзакции. Для преобразования используется метод map(). В начале функции выполняется проверка наличия данных и их корректности.
```javascript
  return transactions.map(transaction => transaction.transaction_description);
```
Если проверка пройдена, вызывается метод map() на массиве transactions. Колбэк-функция для каждого элемента возвращает значение поля transaction.transaction_description.

Возвращается новый массив, состоящий из этих описаний.