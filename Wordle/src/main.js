/**
 * @fileoverview Главный файл приложения - точка входа и инициализация
 */

import {renderBoard} from './ui/board.js';
import {renderKeyboard} from './ui/keyboard.js';
import {initTheme, toggleTheme} from './ui/theme.js';
import {initStats} from './core/stats.js';
import {initPhysicalKeyboard} from './input/keyboardHandler.js';
import {
    bindHeaderEvents,
    handleCellClick,
    handleDelete,
    handleLetterInput,
    handleSubmit,
    initElements,
    isGameOver
} from './input/uiEvents.js';
import {WORDS} from './utils/constants.js';
import {fetchRandomWord} from './core/gameLogic.js';
import {setTargetWord} from './core/gameState.js';

/**
 * Главная функция инициализации приложения
 * @async
 * @returns {Promise<void>}
 */
async function initGame() {
    const boardEl = document.getElementById('board');
    const keyboardEl = document.getElementById('keyboard');
    const messageEl = document.getElementById('message');

    if (!boardEl || !keyboardEl || !messageEl) {
        console.error('Необходимые элементы DOM не найдены');
        return;
    }

    initStats();
    initTheme();
    initElements(boardEl, keyboardEl, messageEl);

    renderBoard(boardEl, handleCellClick);
    renderKeyboard(keyboardEl, handleLetterInput, handleSubmit, handleDelete);

    bindHeaderEvents(toggleTheme);
    initPhysicalKeyboard(handleLetterInput, handleDelete, handleSubmit, isGameOver);

    const initialWord = await fetchRandomWord(WORDS);
    setTargetWord(initialWord);
    console.log('Загадано:', initialWord);
}

initGame().catch(err => console.error('Ошибка инициализации игры:', err));
