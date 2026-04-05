/**
 * @fileoverview Обработка пользовательского ввода и управление игровым процессом
 */

import {
    addLetterToGuess,
    gameState,
    getCurrentGuessWord,
    isGuessComplete,
    nextRow,
    removeLetterFromGuess,
    resetGameState,
    setGameOver,
    setTargetWord
} from '../core/gameState.js';
import {checkGuess, fetchRandomWord, isWinGuess} from '../core/gameLogic.js';
import {updateStats} from '../core/stats.js';
import {clearRow, getEmptyCellsInRow, updateCell} from '../ui/board.js';
import {updateKeyStatus} from '../ui/keyboard.js';
import {openStatsModal, showNewGameButton} from '../ui/modal.js';
import {showMessage} from '../utils/helpers.js';
import {GAME_CONFIG, WORDS} from '../utils/constants.js';

let boardEl = null;
let keyboardEl = null;
let messageEl = null;

/**
 * Инициализирует элементы DOM
 * @param {HTMLElement} board - Элемент доски
 * @param {HTMLElement} keyboard - Элемент клавиатуры
 * @param {HTMLElement} message - Элемент сообщений
 * @returns {void}
 */
export function initElements(board, keyboard, message) {
    boardEl = board;
    keyboardEl = keyboard;
    messageEl = message;
}

/**
 * Обрабатывает ввод буквы
 * @param {string} letter - Буква для ввода
 * @returns {void}
 */
export function handleLetterInput(letter) {
    if (gameState.gameOver) return;

    const emptyCells = getEmptyCellsInRow(boardEl, gameState.currentRow);
    if (emptyCells.length > 0) {
        const firstEmptyIndex = Array.from(
            boardEl.querySelectorAll(`.tableRow[data-row='${gameState.currentRow}'] .tableCell`)
        ).findIndex(cell => cell.textContent === '');

        if (firstEmptyIndex !== -1) {
            addLetterToGuess(firstEmptyIndex, letter);
            updateCell(boardEl, gameState.currentRow, firstEmptyIndex, letter);

            if (isGuessComplete()) {
                handleSubmit();
            }
        }
    }
}

/**
 * Обрабатывает удаление буквы
 * @returns {void}
 */
export function handleDelete() {
    if (gameState.gameOver) return;

    const cells = boardEl.querySelectorAll(`.tableRow[data-row='${gameState.currentRow}'] .tableCell`);
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].textContent !== '') {
            cells[i].textContent = '';
            removeLetterFromGuess(i);
            break;
        }
    }
}

/**
 * Обрабатывает клик по ячейке доски
 * @param {number} row - Номер строки
 * @param {number} col - Номер колонки
 * @returns {void}
 */
export function handleCellClick(row, col) {
    if (gameState.gameOver) return;
    if (row !== gameState.currentRow) return;

    const cell = boardEl.querySelector(
        `.tableRow[data-row='${row}'] .tableCell[data-value='${col + 1}']`
    );
    if (cell && cell.textContent !== '') {
        cell.textContent = '';
        removeLetterFromGuess(col);
    }
}

/**
 * Обрабатывает отправку угадания
 * @returns {void}
 */
export function handleSubmit() {
    if (gameState.gameOver) return;

    if (!isGuessComplete()) {
        showMessage(messageEl, 'Заполните все буквы!', true, GAME_CONFIG.MESSAGE_TIMEOUT);
        return;
    }

    const guessWord = getCurrentGuessWord();
    const result = checkGuess(guessWord, gameState.targetWord);

    for (let i = 0; i < GAME_CONFIG.WORD_LENGTH; i++) {
        updateCell(boardEl, gameState.currentRow, i, guessWord[i], result[i]);
        updateKeyStatus(keyboardEl, guessWord[i], result[i]);
    }

    if (isWinGuess(guessWord, gameState.targetWord)) {
        setGameOver(true);
        updateStats(true, gameState.currentRow + 1);
        showMessage(
            messageEl,
            `🎉 Победа! Слово: ${gameState.targetWord}`,
            false,
            GAME_CONFIG.MESSAGE_TIMEOUT
        );
        setTimeout(() => showNewGameButton(messageEl, startNewGame), GAME_CONFIG.MESSAGE_TIMEOUT);
        return;
    }

    nextRow();

    if (gameState.currentRow >= GAME_CONFIG.BOARD_ROWS) {
        setGameOver(true);
        updateStats(false, GAME_CONFIG.BOARD_ROWS);
        showMessage(
            messageEl,
            `😞 Поражение! Было загадано: ${gameState.targetWord}`,
            true,
            GAME_CONFIG.MESSAGE_TIMEOUT
        );
        setTimeout(() => showNewGameButton(messageEl, startNewGame), GAME_CONFIG.MESSAGE_TIMEOUT);
        return;
    }

    clearRow(boardEl, gameState.currentRow);
}

/**
 * Привязывает обработчики событий к кнопкам в header
 * @param {Function} onThemeToggle - Функция переключения темы
 * @returns {void}
 */
export function bindHeaderEvents(onThemeToggle) {
    const themeBtn = document.querySelector('header button:first-child');
    if (themeBtn) themeBtn.addEventListener('click', onThemeToggle);

    const statsBtn = document.querySelector('header button:last-child');
    if (statsBtn) statsBtn.addEventListener('click', openStatsModal);
}

/**
 * Начинает новую игру
 * @async
 * @returns {Promise<void>}
 */
export async function startNewGame() {
    resetGameState();
    const newWord = await fetchRandomWord(WORDS);
    setTargetWord(newWord);
    console.log('Загадано:', newWord);
    showMessage(messageEl, '', false);
}

/**
 * Проверяет, завершена ли игра
 * @returns {boolean} true если игра завершена
 */
export function isGameOver() {
    return gameState.gameOver;
}

