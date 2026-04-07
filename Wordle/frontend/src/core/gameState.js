/**
 * @fileoverview Управление состоянием игры
 */

/**
 * Объект с состоянием игры
 * @type {Object}
 */
export const gameState = {
    currentRow: 0,
    currentGuess: ['', '', '', '', ''],
    targetWord: '',
    gameOver: false
};

/**
 * Сбрасывает состояние игры в начальное значение
 * @returns {void}
 */
export function resetGameState() {
    gameState.currentRow = 0;
    gameState.currentGuess = ['', '', '', '', ''];
    gameState.gameOver = false;
}

/**
 * Устанавливает загаданное слово
 * @param {string} word - Слово для установки
 * @returns {void}
 */
export function setTargetWord(word) {
    gameState.targetWord = word;
}

/**
 * Добавляет букву в текущее угадание
 * @param {number} index - Индекс позиции
 * @param {string} letter - Буква для добавления
 * @returns {void}
 */
export function addLetterToGuess(index, letter) {
    if (index >= 0 && index < gameState.currentGuess.length) {
        gameState.currentGuess[index] = letter;
    }
}

/**
 * Удаляет букву из текущего угадания
 * @param {number} index - Индекс позиции
 * @returns {void}
 */
export function removeLetterFromGuess(index) {
    if (index >= 0 && index < gameState.currentGuess.length) {
        gameState.currentGuess[index] = '';
    }
}

/**
 * Перемещает на следующую строку
 * @returns {void}
 */
export function nextRow() {
    gameState.currentRow++;
    gameState.currentGuess = ['', '', '', '', ''];
}

/**
 * Устанавливает флаг завершения игры
 * @param {boolean} value - Значение флага
 * @returns {void}
 */
export function setGameOver(value) {
    gameState.gameOver = value;
}

/**
 * Проверяет, заполнено ли текущее угадание полностью
 * @returns {boolean} true если все позиции заполнены
 */
export function isGuessComplete() {
    return gameState.currentGuess.every(letter => letter !== '');
}

/**
 * Получает текущее угадание как строку
 * @returns {string} Строка текущего угадания
 */
export function getCurrentGuessWord() {
    return gameState.currentGuess.join('');
}

