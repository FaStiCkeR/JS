/**
 * @fileoverview Отрисовка и управление виртуальной клавиатурой
 */

import {KEYBOARD_LAYOUT} from '../utils/constants.js';

/**
 * Отрисовывает виртуальную клавиатуру
 * @param {HTMLElement} keyboardEl - Элемент клавиатуры
 * @param {Function} onLetterClick - Функция обработки клика по букве
 * @param {Function} onSubmit - Функция обработки отправки
 * @param {Function} onDelete - Функция обработки удаления
 * @returns {void}
 */
export function renderKeyboard(keyboardEl, onLetterClick, onSubmit, onDelete) {
    if (!keyboardEl) return;
    keyboardEl.innerHTML = '';

    for (const row of KEYBOARD_LAYOUT) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'letterRow';

        for (const letter of row) {
            const btn = document.createElement('button');
            btn.className = 'letter';
            btn.textContent = letter;
            btn.dataset.letter = letter;

            if (letter === '⏎') {
                btn.addEventListener('click', () => onSubmit());
            } else if (letter === '⌫') {
                btn.addEventListener('click', () => onDelete());
            } else {
                btn.addEventListener('click', () => onLetterClick(letter));
            }

            rowDiv.appendChild(btn);
        }
        keyboardEl.appendChild(rowDiv);
    }
}

/**
 * Обновляет статус буквы на клавиатуре
 * @param {HTMLElement} keyboardEl - Элемент клавиатуры
 * @param {string} letter - Буква для обновления
 * @param {string} status - Новый статус буквы ('correct', 'present', 'absent')
 * @returns {void}
 */
export function updateKeyStatus(keyboardEl, letter, status) {
    const buttons = keyboardEl.querySelectorAll('button');
    for (const btn of buttons) {
        if (btn.textContent === letter) {
            btn.classList.remove('correct', 'present', 'absent');
            if (status) btn.classList.add(status);
            break;
        }
    }
}

/**
 * Очищает все статусы букв на клавиатуре
 * @param {HTMLElement} keyboardEl - Элемент клавиатуры
 * @returns {void}
 */
export function clearKeyboardStatus(keyboardEl) {
    const buttons = keyboardEl.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('correct', 'present', 'absent'));
}

