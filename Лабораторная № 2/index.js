/**
 * Выводит в консоль все элементы массива с их индексами.
 * @param {Array} array - Исходный массив.
 */
function printArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(`Element: ${i}: value ${array[i]}`);
    }
}

/**
 * Выполняет переданную функцию-колбэк для каждого элемента массива.
 * @param {Array} array - Массив, по которому выполняется итерация.
 * @param {Function} callback - Функция, вызываемая для каждого элемента.
 *        Принимает три аргумента: element, index, array.
 * @returns {string} - Возвращает строку с ошибкой, если аргументы невалидны.
 */
function forEach(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

/**
 * Создаёт новый массив, применяя к каждому элементу исходного массива функцию-колбэк.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция преобразования.
 *        Принимает текущий элемент и возвращает преобразованное значение.
 * @returns {Array|string} - Новый массив с преобразованными элементами
 *        или строка с ошибкой, если аргументы невалидны.
 */
function map(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }
    return result;
}

/**
 * Создаёт новый массив, содержащий только те элементы исходного массива,
 * для которых функция-колбэк вернула true.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 *        Принимает текущий элемент и возвращает boolean.
 * @returns {Array|string} - Отфильтрованный массив
 *        или строка с ошибкой, если аргументы невалидны.
 */
function filter(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}

/**
 * Возвращает первый элемент массива, для которого функция-колбэк вернула true.
 * Если подходящий элемент не найден, возвращает undefined.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 *        Принимает текущий элемент и возвращает boolean.
 * @returns {*|string} - Найденный элемент или строка с ошибкой,
 *        если аргументы невалидны.
 */
function find(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return array[i];
        }
    }
}

/**
 * Проверяет, удовлетворяет ли хотя бы один элемент массива условию,
 * заданному в функции-колбэке.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 *        Принимает текущий элемент и возвращает boolean.
 * @returns {boolean|string} - true, если хотя бы один элемент прошёл проверку,
 *        иначе false; строка с ошибкой, если аргументы невалидны.
 */
function some(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return true;
        }
    }
    return false;
}

/**
 * Проверяют, удовлетворяют ли все элементы массива условию,
 * заданному в функции-колбэке.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 *        Принимает текущий элемент и возвращает boolean.
 * @returns {boolean|string} - true, если все элементы прошли проверку,
 *        иначе false; строка с ошибкой, если аргументы невалидны.
 */
function every(array, callback) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Сворачивает массив к одному значению, последовательно применяя функцию-колбэк
 * к аккумулятору и каждому элементу. Начальное значение аккумулятора передаётся
 * параметром initialValue.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция свёртки.
 *        Принимает аккумулятор и текущий элемент, возвращает новое значение аккумулятора.
 * @param {*} initialValue - Начальное значение аккумулятора.
 * @returns {*|string} - Итоговое значение аккумулятора или строка с ошибкой,
 *        если аргументы невалидны.
 */
function reduce(array, callback, initialValue) {
    if (!Array.isArray(array)) {
        return 'Первый аргумент — не массив!';
    }
    if (typeof callback !== 'function') {
        return 'Второй аргумент — не функция';
    }
    for (const item of array) {
        initialValue = callback(initialValue, item);
    }
    return initialValue;
}

const numbers = [1, 2, 3, 4, 5];
const sum = reduce(numbers, (accumulator, element) => accumulator + element, 0);
console.log(sum); // 15