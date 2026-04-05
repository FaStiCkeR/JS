# 📚 API Документация модулей

## core/gameState.js

Управление состоянием игры

**Экспорты:**

- `gameState` - Объект состояния
- `resetGameState()` - Сбросить состояние
- `setTargetWord(word)` - Установить загаданное слово
- `addLetterToGuess(index, letter)` - Добавить букву
- `removeLetterFromGuess(index)` - Удалить букву
- `nextRow()` - Перейти на следующую строку
- `setGameOver(value)` - Установить флаг завершения
- `isGuessComplete()` - Проверить, полное ли угадание
- `getCurrentGuessWord()` - Получить текущее угадание

## core/gameLogic.js

Логика проверки и выбора слова

**Экспорты:**

- `checkGuess(guess, target)` - Проверить угадание
- `isWinGuess(guess, target)` - Проверить победу
- `fetchRandomWord(words)` - Получить случайное слово

## core/stats.js

Работа со статистикой

**Экспорты:**

- `initStats()` - Инициализировать статистику
- `getStats()` - Получить статистику
- `updateStats(won, attempts)` - Обновить статистику
- `calculateWinPercentage(stats)` - Вычислить процент побед
- `resetStats()` - Сбросить статистику

## ui/board.js

Отрисовка доски

**Экспорты:**

- `renderBoard(boardEl, onCellClick)` - Отрисовать доску
- `updateCell(boardEl, row, col, letter, status)` - Обновить ячейку
- `clearBoard(boardEl)` - Очистить доску
- `clearRow(boardEl, row)` - Очистить строку
- `getCellText(boardEl, row, col)` - Получить текст ячейки
- `getEmptyCellsInRow(boardEl, row)` - Получить пустые ячейки

## ui/keyboard.js

Отрисовка клавиатуры

**Экспорты:**

- `renderKeyboard(keyboardEl, onLetterClick, onSubmit, onDelete)` - Отрисовать клавиатуру
- `updateKeyStatus(keyboardEl, letter, status)` - Обновить статус буквы
- `clearKeyboardStatus(keyboardEl)` - Очистить статусы букв

## ui/modal.js

Модальные окна

**Экспорты:**

- `openStatsModal()` - Открыть окно статистики
- `showNewGameButton(messageEl, onNewGame)` - Показать кнопку новой игры

## ui/theme.js

Управление темой

**Экспорты:**

- `initTheme()` - Инициализировать тему
- `toggleTheme()` - Переключить тему
- `isDarkTheme()` - Проверить, активна ли тёмная тема

## input/keyboardHandler.js

Обработка физической клавиатуры

**Экспорты:**

- `initPhysicalKeyboard(onLetterInput, onDelete, onSubmit, isGameOver)` - Инициализировать

## input/uiEvents.js

Обработка событий UI

**Экспорты:**

- `initElements(board, keyboard, message)` - Инициализировать элементы
- `handleLetterInput(letter)` - Обработать ввод буквы
- `handleDelete()` - Обработать удаление
- `handleCellClick(row, col)` - Обработать клик по ячейке
- `handleSubmit()` - Обработать отправку
- `bindHeaderEvents(onThemeToggle)` - Привязать события header
- `startNewGame()` - Начать новую игру
- `isGameOver()` - Проверить конец игры

## utils/constants.js

Константы и маппинги

**Экспорты:**

- `WORDS` - Массив слов
- `ENG_TO_RUS` - Маппинг букв
- `KEYBOARD_LAYOUT` - Раскладка клавиатуры
- `CELL_STATUS` - Статусы ячеек
- `GAME_CONFIG` - Конфигурация игры

## utils/helpers.js

Вспомогательные функции

**Экспорты:**

- `mapEngToRus(engLetter)` - Преобразовать букву
- `showMessage(messageEl, text, isError, timeout)` - Показать сообщение
- `getRandomWord(words)` - Получить случайное слово

