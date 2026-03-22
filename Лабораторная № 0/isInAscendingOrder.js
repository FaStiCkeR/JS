/**
 * Напишите функцию, которая принимает на вход массив целых чисел. Ваша задача - определить, находятся ли числа в порядке возрастания.
 * Массив считается упорядоченным по возрастанию, если нет двух соседних целых чисел, где левое число превышает значение правого числа.
 * @param arr
 * @return {boolean}
 */

function isInAscendingOrder(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

console.log(isInAscendingOrder([2,4, 3, 4]))