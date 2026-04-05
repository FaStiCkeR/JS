/**
 * @fileoverview Отрисовка и управление доской игры
 */

import {GAME_CONFIG} from '../utils/constants.js';

/**
 * Отрисовывает доску игры
 * @param {HTMLElement} boardEl - Элемент доски
 * @param {Function} onCellClick - Функция обработки клика по ячейке
 * @returns {void}
 */
export function renderBoard(boardEl, onCellClick) {
    if (!boardEl) return;
    boardEl.innerHTML = '';

    for (let r = 0; r < GAME_CONFIG.BOARD_ROWS; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'tableRow';
        rowDiv.setAttribute('data-row', r);

        for (let c = 0; c < GAME_CONFIG.WORD_LENGTH; c++) {
            const cell = document.createElement('div');
            cell.className = 'tableCell';
            cell.setAttribute('data-value', c + 1);
            cell.setAttribute('data-row', r);
            cell.addEventListener('click', (e) => {
                const row = parseInt(e.currentTarget.getAttribute('data-row'), 10);
                const col = parseInt(e.currentTarget.getAttribute('data-value'), 10) - 1;
                onCellClick(row, col);
            });
            rowDiv.appendChild(cell);
        }
        boardEl.appendChild(rowDiv);
    }
}

/**
 * Обновляет содержимое и стиль ячейки доски
 * @param {HTMLElement} boardEl - Элемент доски
 * @param {number} row - Номер строки
 * @param {number} col - Номер колонки
 * @param {string} letter - Буква для отображения
 * @param {string} status - Статус ячейки ('correct', 'present', 'absent')
 * @returns {void}
 */
export function updateCell(boardEl, row, col, letter, status) {
    const cell = boardEl.querySelector(
        `.tableRow[data-row='${row}'] .tableCell[data-value='${col + 1}']`
    );
    if (!cell) return;
    if (letter !== undefined) cell.textContent = letter;
    if (status) {
        cell.classList.remove('correct', 'present', 'absent');
        cell.classList.add(status);
    }
}

/**
 * Очищает все ячейки доски
 * @param {HTMLElement} boardEl - Элемент доски
 * @returns {void}
 */
export function clearBoard(boardEl) {
    const cells = boardEl.querySelectorAll('.tableCell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('correct', 'present', 'absent');
    });
}

/**
 * Очищает ячейки конкретной строки
 * @param {HTMLElement} boardEl - Элемент доски
 * @param {number} row - Номер строки
 * @returns {void}
 */
export function clearRow(boardEl, row) {
    const cells = boardEl.querySelectorAll(`.tableRow[data-row='${row}'] .tableCell`);
    cells.forEach(cell => cell.textContent = '');
}

/**
 * Получает отображаемый текст ячейки
 * @param {HTMLElement} boardEl - Элемент доски
 * @param {number} row - Номер строки
 * @param {number} col - Номер колонки
 * @returns {string} Текст ячейки
 */
export function getCellText(boardEl, row, col) {
    const cell = boardEl.querySelector(
        `.tableRow[data-row='${row}'] .tableCell[data-value='${col + 1}']`
    );
    return cell ? cell.textContent : '';
}

/**
 * Получает все пустые ячейки текущей строки
 * @param {HTMLElement} boardEl - Элемент доски
 * @param {number} row - Номер строки
 * @returns {Array<HTMLElement>} Массив пустых ячеек
 */
export function getEmptyCellsInRow(boardEl, row) {
    const cells = boardEl.querySelectorAll(`.tableRow[data-row='${row}'] .tableCell`);
    return Array.from(cells).filter(cell => cell.textContent === '');
}

