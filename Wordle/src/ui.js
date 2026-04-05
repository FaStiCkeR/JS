import {clickLetter} from "./utils.js";
/**
 * Функция для рендера строки с 5 буквами.
 */
function renderWordRow(tries) {
    const board = document.getElementById('board');
    if (!board) return;

    const tableRowLength = 5;
    const tableRow = document.createElement('div');
    tableRow.className = 'tableRow';
    board.appendChild(tableRow);
    for (let row = 1; row <= tableRowLength; row++) {
        const tableCell = document.createElement('div');
        tableCell.className = 'tableCell';
        tableRow.appendChild(tableCell);
    }
}

/**
 * Функция для рендера всех 6 столбцов (6 попыток угадать) по 5 букв.
 */
function renderBoard() {
    const rows = 6;
    for (let row = 1; row <= rows; row++) {
        renderWordRow(row);
    }
}

/**
 * Функция для рендера клавиатуры.
 */
function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const layout = [
        ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
        ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
        ['⏎', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '⌫']
    ];
    for (let letters of layout) {
        const letterRow = document.createElement('div');
        letterRow.className = 'letterRow';
        keyboard.appendChild(letterRow);
        for (let letter of letters) {
            const letterButton = document.createElement('button');
            letterButton.className = 'letter';
            letterRow.appendChild(letterButton);
            letterButton.textContent = letter;
            letterButton.value = letter;
            letterButton.addEventListener('click', () => {
                clickLetter(letter);
            })
        }
    }
}

export {renderBoard, renderKeyboard};