# Отчет о проделанной работе

### Задумка проекта

Создать игру, которая будет похожа на популярную игру Wordle.
Игра будет состоять из 6 попыток отгадать 5-буквенное слово. После каждой попытки игроку будет сообщаться, какие буквы
он угадал и на каких позициях они находятся.
Данная мини-игра будет реализована на JavaScript и будет работать в браузере. Получать случайное слово будет при помощи
API, который будет написан на Node.js и Express. Слова для игры будут храниться в файле `./backend/russian_words.json`
на 8000 порту через query — /random_word.

## Управление состоянием игры проходит при помощи написанной логики, прописанной в src/core/:

- Функции, написанные в 'gameLogic.js' отвечают за проверку угаданных слов и определение победы.

```javascript
/**
 * @fileoverview Логика проверки угадания в игре Wordle
 */

/**
 * Проверяет угадание и возвращает статусы для каждой буквы
 * @param {string} guess - Угаданное слово
 * @param {string} target - Загаданное слово
 * @returns {Array<string>} Массив статусов ('correct', 'present', 'absent')
 */
export function checkGuess(guess, target) {
    const result = Array(5).fill('absent');
    const targetArr = target.split('');
    const guessArr = guess.split('');

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = 'correct';
            targetArr[i] = null;
            guessArr[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === null) continue;
        const idx = targetArr.indexOf(guessArr[i]);
        if (idx !== -1) {
            result[i] = 'present';
            targetArr[idx] = null;
        }
    }

    return result;
}

/**
 * Проверяет, выигрышное ли угадание
 * @param {string} guess - Угаданное слово
 * @param {string} target - Загаданное слово
 * @returns {boolean} true если угадание совпадает с загаданным словом
 */
export function isWinGuess(guess, target) {
    return guess === target;
}
```

- Функции, написанные в 'gameState.js' отвечают за управление состоянием игры, добавление и удаление букв, переход на
  следующую строку и проверку завершения игры.

```javascript
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
```

- Содержимое stats.js отвечает за сохранение и получение статистики из localStorage, обновление статистики после каждой
  игры и вычисление процента побед.

```javascript
/**
 * @fileoverview Управление статистикой в localStorage
 */

/**
 * Инициализирует статистику в localStorage
 * @returns {void}
 */
export function initStats() {
    if (!localStorage.getItem('wordleStats')) {
        localStorage.setItem('wordleStats', JSON.stringify({
            wins: 0,
            totalAttempts: 0,
            gamesPlayed: 0
        }));
    }
}

/**
 * Получает статистику из localStorage
 * @returns {Object} Объект со статистикой игр
 * @returns {number} wins - Количество побед
 * @returns {number} totalAttempts - Общее количество попыток
 * @returns {number} gamesPlayed - Количество сыгранных игр
 */
export function getStats() {
    return JSON.parse(localStorage.getItem('wordleStats')) || {
        wins: 0,
        totalAttempts: 0,
        gamesPlayed: 0
    };
}

/**
 * Обновляет статистику в localStorage
 * @param {boolean} won - Была ли выиграна текущая игра
 * @param {number} attempts - Количество попыток в текущей игре
 * @returns {void}
 */
export function updateStats(won, attempts) {
    const stats = getStats();
    stats.gamesPlayed++;
    stats.totalAttempts += attempts;
    if (won) {
        stats.wins++;
    }
    localStorage.setItem('wordleStats', JSON.stringify(stats));
}

/**
 * Вычисляет процент побед
 * @param {Object} stats - Объект со статистикой
 * @returns {number} Процент побед (0-100)
 */
export function calculateWinPercentage(stats) {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.wins / stats.gamesPlayed) * 100);
}

/**
 * Сбрасывает всю статистику
 * @returns {void}
 */
export function resetStats() {
    localStorage.setItem('wordleStats', JSON.stringify({
        wins: 0,
        totalAttempts: 0,
        gamesPlayed: 0
    }));
}
```

#### Папка 'src/input' содержит в себе два файла, который выполняют следующие функции:

- 'keyboardHandler.js' отвечает за обработку нажатий на физической клавиатуре

```javascript
/**
 * @fileoverview Обработка ввода с физической клавиатуры
 */

import {mapEngToRus} from '../utils/helpers.js';

/**
 * Инициализирует обработчик физической клавиатуры с маппингом на русский
 * @param {Function} onLetterInput - Функция обработки ввода буквы
 * @param {Function} onDelete - Функция обработки удаления
 * @param {Function} onSubmit - Функция обработки отправки
 * @param {Function} isGameOver - Функция проверки завершения игры
 * @returns {Function} Функция для удаления обработчика события
 */
export function initPhysicalKeyboard(onLetterInput, onDelete, onSubmit, isGameOver) {
    const onKeyDown = (e) => {
        if (isGameOver()) return;

        let key = e.key;

        if (/^[a-zA-Zа-яё]$/i.test(key)) {
            e.preventDefault();
            let letter = key.toUpperCase();
            if (/^[A-Z]$/.test(letter)) {
                letter = mapEngToRus(letter);
            }
            onLetterInput(letter);
        } else if (key === 'Backspace') {
            e.preventDefault();
            onDelete();
        } else if (key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
}
```

- 'uiEvents.js' отвечает за обработку кликов по виртуальной клавиатуре, доске и кнопкам, а также за привязку событий к
  header элементам.

```javascript
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
import {checkGuess, isWinGuess} from '../core/gameLogic.js';
import {updateStats} from '../core/stats.js';
import {clearRow, getEmptyCellsInRow, renderBoard, updateCell} from '../ui/board.js';
import {renderKeyboard, updateKeyStatus} from '../ui/keyboard.js';
import {openStatsModal, showNewGameButton} from '../ui/modal.js';
import {getRandomWord, showMessage} from '../utils/helpers.js';
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
    const newWord = await getRandomWord(WORDS);
    setTargetWord(newWord);
    console.log('Загадано:', newWord);

    // Перерисовываем доску с помощью существующей функции
    if (boardEl) {
        renderBoard(boardEl, handleCellClick);
    }

    // Перерисовываем клавиатуру с помощью существующей функции
    if (keyboardEl) {
        renderKeyboard(keyboardEl, handleLetterInput, handleSubmit, handleDelete);
    }

    showMessage(messageEl, '', false);
}

/**
 * Проверяет, завершена ли игра
 * @returns {boolean} true если игра завершена
 */
export function isGameOver() {
    return gameState.gameOver;
}
```

#### Папка 'src/ui' содержит в себе четыре файла, который выполняют следующие функции:

- 'board.js' отвечает за отрисовку доски, обновление ячеек, очистку доски и строк

```javascript/**
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
```

- 'keyboard.js' отвечает за отрисовку клавиатуры, обновление статуса букв и очистку статусов

```javascript
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
```

- 'modal.js' отвечает за открытие модального окна статистики и отображение кнопки новой игры

```javascript
/**
 * @fileoverview Управление модальным окном со статистикой
 */

import {calculateWinPercentage, getStats} from '../core/stats.js';

/**
 * Открывает модальное окно со статистикой
 * @returns {void}
 */
export function openStatsModal() {
    const stats = getStats();
    const winPercentage = calculateWinPercentage(stats);
    const modal = document.createElement('div');
    modal.className = 'stats-modal-overlay';
    modal.innerHTML = `
        <div class="stats-modal">
            <div class="stats-modal-header">
                <h2>Статистика</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="stats-modal-body">
                <div class="stat-item">
                    <span class="stat-label">Успешных угадываний:</span>
                    <span class="stat-value">${stats.wins}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Всего попыток:</span>
                    <span class="stat-value">${stats.totalAttempts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Сыграно игр:</span>
                    <span class="stat-value">${stats.gamesPlayed}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Процент побед:</span>
                    <span class="stat-value">${winPercentage}%</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Создаёт и отображает кнопку новой игры
 * @param {HTMLElement} messageEl - Элемент для отображения сообщений
 * @param {Function} onNewGame - Функция для начала новой игры
 * @returns {void}
 */
export function showNewGameButton(messageEl, onNewGame) {
    if (!messageEl) return;
    const btn = document.createElement('button');
    btn.textContent = 'Новая игра';
    btn.className = 'new-game-btn';
    btn.addEventListener('click', () => {
        btn.remove();
        onNewGame();
    });
    messageEl.textContent = '';
    messageEl.className = '';
    messageEl.appendChild(btn);
}
```

- 'theme.js' отвечает за переключение между светлой и тёмной темой и сохранение выбранной темы в localStorage

```javascript
/**
 * @fileoverview Управление темой приложения
 */

/**
 * Инициализирует тему на основе сохранённых настроек
 * @returns {void}
 */
export function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Переключает тему приложения между светлой и тёмной
 * @returns {void}
 */
export function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Проверяет, активна ли тёмная тема
 * @returns {boolean} true если тёмная тема активна
 */
export function isDarkTheme() {
    return document.documentElement.classList.contains('dark');
}
```

#### Папка 'src/utils' содержит в себе два файла, который выполняют следующие функции:

- 'constants.js' содержит константы и маппинги, используемые в игре, такие как массив слов, раскладка клавиатуры и
  конфигурация игры

```javascript
/**
 * @fileoverview Константы и маппинги для игры Wordle
 */

/**
 * Массив русских слов для игры
 * @type {Array<string>}
 */
export const WORDS = [
    // А, Б (уже были, оставляем как есть)
    "АБЗАЦ", "АВГУСТ", "АВТОР", "АДРЕС", "АЗАРТ", "АКЦИЯ", "АЛМАЗ", "АНГЕЛ", "АПЕЛЬ", "АРБУЗ",
    "АРМИЯ", "АСТРА", "АТОМ", "АФЕРА", "БАГАЖ", "БАЗАР", "БАЛЕТ", "БАНАН", "БАРАН", "БАРЖА",
    "БАРОН", "БАСНЯ", "БАТОН", "БАЯН", "БЕДА", "БЕРЕГ", "БЕРЕТ", "БЕТОН", "БИЗОН", "БИЛЕТ",
    "БИРЖА", "БИТВА", "БЛЕСК", "БЛИН", "БЛОК", "БЛОХА", "БЛЮДО", "БОБЕР", "БОЕЦ", "БОКАЛ",
    "БОЛТ", "БОЛЬ", "БОРЩ", "БОЧКА", "БРАК", "БРАТ", "БРОД", "БРУС", "БРЮКИ", "БУБЕН",
    // В
    "ВАГОН", "ВАКУУМ", "ВАЛЕТ", "ВАРЕНЬЕ", "ВЕДРО", "ВЕНИК", "ВЕНОК", "ВЕРА", "ВЕРФЬ", "ВЕСЛО",
    // Г
    "ГАЗЕТА", "ГАЛСТУК", "ГАРАЖ", "ГВОЗДЬ", "ГЕРОЙ", "ГЛАЗ", "ГОЛОС", "ГОРА", "ГОРОД", "ГОСТЬ",
    // Д
    "ДВЕРЬ", "ДВОРЕЦ", "ДЕВИЦА", "ДЕЛО", "ДЕНЬ", "ДЕРЕВО", "ДЕТИ", "ДИВАН", "ДОЖДЬ", "ДОМ",
    // Е, Ё
    "ЕВНУХ", "ЕДИНИЦА", "ЕНОТ", "ЕРУНДА", "ЁРШ",
    // Ж
    "ЖАБА", "ЖАКЕТ", "ЖАЛО", "ЖАР", "ЖЕЛЕЗО", "ЖЕЛТОК", "ЖЕНА", "ЖИВОТ", "ЖИЗНЬ", "ЖУРНАЛ",
    // З
    "ЗАБОР", "ЗАВОД", "ЗАЛ", "ЗАПАХ", "ЗАРЯ", "ЗВЕЗДА", "ЗВЕЗДЫ", "ЗВОНОК", "ЗЕМЛЯ", "ЗЕРНО",
    // И
    "ИГЛА", "ИГРА", "ИДЕЯ", "ИЗБА", "ИКОНА", "ИМЯ", "ИНДЕЕЦ", "ИНСТРУМЕНТ", "ИСКРА", "ИТОГ",
    // Й (слов на Й почти нет, возьмем одно)
    "ЙОД",
    // К
    "КАБИНЕТ", "КАЗНА", "КАЛЕНДАРЬ", "КАМЕНЬ", "КАПЛЯ", "КАРТА", "КАСТРЮЛЯ", "КАТОК", "КВАС", "КИНО",
    // Л
    "ЛАВКА", "ЛАГЕРЬ", "ЛАДОНЬ", "ЛАМПА", "ЛАСТОЧКА", "ЛЕБЕДЬ", "ЛЕС", "ЛЕТО", "ЛИСТ", "ЛОЖКА",
    // М
    "МАГАЗИН", "МАЛЫШ", "МАМА", "МАРКА", "МАСЛО", "МАШИНА", "МЕДВЕДЬ", "МЕЛ", "МЕТР", "МИР",
    // Н
    "НАРОД", "НАСОС", "НАУКА", "НЕБО", "НЕДЕЛЯ", "НОЖ", "НОС", "НОЧЬ", "НУЛЬ", "НЫТЬЁ",
    // О
    "ОБЛАКО", "ОБРУЧ", "ОВОЩ", "ОГОНЬ", "ОКНО", "ОЛЕНЬ", "ОПЕРА", "ОСЕНЬ", "ОТЕЦ", "ОЧКИ",
    // П
    "ПАЛЬТО", "ПАПА", "ПАРК", "ПАРУС", "ПЕСНЯ", "ПИВО", "ПИЛА", "ПИСЬМО", "ПЛАН", "ПЛЕД",
    // Р
    "РАБОТА", "РАДИО", "РАЗ", "РАКЕТА", "РЕБЁНОК", "РЕКА", "РЕМЕНЬ", "РОД", "РОЗА", "РУКА",
    // С
    "САД", "САЛАТ", "СВЕТ", "СЕМЬЯ", "СИЛА", "СКАЗКА", "СЛОВО", "СНЕГ", "СОЛНЦЕ", "СТОЛ",
    // Т
    "ТАБУРЕТ", "ТАЙНА", "ТАНЕЦ", "ТЕАТР", "ТЕНИС", "ТЕТРАДЬ", "ТИШИНА", "ТКАЧ", "ТОПОР", "ТРАВА",
    // У
    "УГОЛ", "УДАР", "УЖИН", "УЛИЦА", "УЛЫБКА", "УМ", "УРОК", "УС", "УТКА", "УХО",
    // Ф
    "ФАБРИКА", "ФАНТА", "ФАРТ", "ФАРШ", "ФЕЯ", "ФИГУРА", "ФИЛЬМ", "ФЛАГ", "ФЛОТ", "ФОКУС",
    // Х
    "ХВОСТ", "ХИМИЯ", "ХЛЕБ", "ХЛОПОК", "ХОД", "ХОЛОД", "ХОМЯК", "ХОР", "ХРАМ", "ХРУСТ",
    // Ц
    "ЦАРЬ", "ЦВЕТ", "ЦЕЛЬ", "ЦЕНА", "ЦЕХ", "ЦИРК", "ЦИФРА", "ЦОКОЛЬ", "ЦУКАТ", "ЦЫПЛЁНОК",
    // Ч
    "ЧАЙ", "ЧАС", "ЧАША", "ЧЕЛОВЕК", "ЧЕМОДАН", "ЧЕРВЬ", "ЧЕРДАК", "ЧЕРЕП", "ЧИСЛО", "ЧУДО",
    // Ш
    "ШАГ", "ШАЛАШ", "ШАР", "ШАРФ", "ШАХТА", "ШЕЯ", "ШИНА", "ШКАФ", "ШЛЯПА", "ШОВ",
    // Щ
    "ЩЕКА", "ЩЕНОК", "ЩЕТКА", "ЩИПЦЫ", "ЩИТ", "ЩУКА",
    // Ъ, Ы, Ь (почти нет слов, возьмем редкие)
    "Ъ", // нет слов, пропускаем
    "ЫКАТЬ", "ЫР", // мало, пропускаем
    "Ь", // нет
    // Э
    "ЭВРИКА", "ЭКРАН", "ЭПОХА", "ЭРА", "ЭХО",
    // Ю
    "ЮБКА", "ЮМОР", "ЮНОСТЬ", "ЮПИТЕР", "ЮРТА",
    // Я
    "ЯБЛОКО", "ЯГОДА", "ЯД", "ЯЗЫК", "ЯРЛЫК", "ЯСЛИ", "ЯХТА"
];

/**
 * Таблица маппинга английских букв на русские
 * @type {Object.<string, string>}
 */
export const ENG_TO_RUS = {
    'Q': 'Й',
    'W': 'Ц',
    'E': 'У',
    'R': 'К',
    'T': 'Е',
    'Y': 'Н',
    'U': 'Г',
    'I': 'Ш',
    'O': 'Щ',
    'P': 'З',
    'A': 'Ф',
    'S': 'Ы',
    'D': 'В',
    'F': 'А',
    'G': 'П',
    'H': 'Р',
    'J': 'О',
    'K': 'Л',
    'L': 'Д',
    ';': 'Ж',
    ':': 'Ж',
    "'": 'Э',
    '"': 'Э',
    'Z': 'Я',
    'X': 'Ч',
    'C': 'С',
    'V': 'М',
    'B': 'И',
    'N': 'Т',
    'M': 'Ь',
    ',': 'Б',
    '<': 'Б',
    '.': 'Ю',
    '>': 'Ю'
};

/**
 * Раскладка русской клавиатуры
 * @type {Array<Array<string>>}
 */
export const KEYBOARD_LAYOUT = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['⏎', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '⌫']
];

/**
 * Статусы ячеек доски
 * @type {Object}
 */
export const CELL_STATUS = {
    CORRECT: 'correct',
    PRESENT: 'present',
    ABSENT: 'absent'
};

/**
 * Константы игры
 * @type {Object}
 */
export const GAME_CONFIG = {
    BOARD_ROWS: 6,
    WORD_LENGTH: 5,
    MESSAGE_TIMEOUT: 2500
};
```

- 'helpers.js' содержит вспомогательные функции для получения случайного слова, отображения сообщений и маппинга
  английских букв на русские

```javascript
/**
 * @fileoverview Вспомогательные функции утилиты
 */

import {ENG_TO_RUS} from './constants.js';
import {API_RANDOM_WORD_ENDPOINT, API_URL} from '../config.js';

/**
 * Преобразует английскую букву в русскую
 * @param {string} engLetter - Английская буква
 * @returns {string} Русская буква или исходный символ
 */
export function mapEngToRus(engLetter) {
    return ENG_TO_RUS[engLetter.toUpperCase()] || engLetter;
}

/**
 * Показывает сообщение пользователю с автоскрытием
 * @param {HTMLElement} messageEl - Элемент для отображения сообщения
 * @param {string} text - Текст сообщения
 * @param {boolean} [isError=false] - Является ли сообщение ошибкой
 * @param {number} [timeout=2000] - Время отображения в мс
 * @returns {void}
 */
export function showMessage(messageEl, text, isError = false, timeout = 2000) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = `game-message ${isError ? 'text-red-500' : 'text-green-500'}`;
    setTimeout(() => {
        if (messageEl.textContent === text) messageEl.textContent = '';
    }, timeout);
}

/**
 * Получает случайное слово из API или из массива (fallback)
 * @param {Array<string>} words - Массив слов (резервный)
 * @returns {Promise<string>} Случайное слово в верхнем регистре
 */
export async function getRandomWord(words) {
    try {
        // Пытаемся получить слово с API
        const response = await fetch(API_RANDOM_WORD_ENDPOINT, {
            method: 'GET',
            signal: AbortSignal.timeout(5000) // Таймаут 5 секунд
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Получено слово с API:', data.word);
        return data.word.toUpperCase();
    } catch (error) {
        // Fallback на встроенный массив если API не доступен
        console.warn('API недоступен, используем встроенный словарь:', error);
        const validWords = words.filter(word => word.length === 5);
        if (validWords.length === 0) {
            throw new Error('Нет слов длины 5 в массиве');
        }
        const idx = Math.floor(Math.random() * validWords.length);
        return validWords[idx].toUpperCase();
    }
}
```

### Файлы в 'src' корневой папке:

- config.js - содержит конфигурацию API и другие глобальные настройки

```javascript
/**
 * @fileoverview Конфигурация приложения
 */

/**
 * Расположение API сервиса
 */
export const API_URL = 'http://localhost:8000';

/**
 * Эндпоинт для получения случайного слова
 * @type {string}
 */
export const API_RANDOM_WORD_ENDPOINT = `${API_URL}/random-word`;
```

- 'main.js' - точка входа, которая инициализирует игру,

```javascript
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
import {setTargetWord} from './core/gameState.js';
import {getRandomWord} from "./utils/helpers.js";

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

    const initialWord = await getRandomWord(WORDS);
    setTargetWord(initialWord);
}

initGame().catch(err => console.error('Ошибка инициализации игры:', err));
```