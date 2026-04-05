# 📦 ПОЛНЫЙ СПИСОК МОДУЛЕЙ

## 🎯 Точка входа

### `src/main.js` (55 строк)

**Назначение:** Инициализация приложения и координация всех модулей

**Импортирует:**

- UI: board, keyboard, theme
- Core: stats, gameLogic, gameState
- Input: keyboardHandler, uiEvents
- Utils: constants

**Что делает:**

1. Получает DOM элементы
2. Инициализирует все подсистемы
3. Отрисовывает доску и клавиатуру
4. Привязывает обработчики событий
5. Загружает первое слово

---

## 🎮 Слой CORE (Бизнес-логика)

### `src/core/gameState.js` (68 строк)

**Назначение:** Управление состоянием игры

**Экспортирует:**

```javascript
export const gameState

export function resetGameState()

export function setTargetWord(word)

export function addLetterToGuess(index, letter)

export function removeLetterFromGuess(index)

export function nextRow()

export function setGameOver(value)

export function isGuessComplete()

export function getCurrentGuessWord()
```

**Что хранит:**

- currentRow - текущая строка (0-5)
- currentGuess - текущее угадание (массив 5 букв)
- targetWord - загаданное слово
- gameOver - флаг завершения

---

### `src/core/gameLogic.js` (39 строк)

**Назначение:** Логика проверки угадания

**Экспортирует:**

```javascript
export function checkGuess(guess, target) → Array < status >

export function isWinGuess(guess, target) → boolean

export async function fetchRandomWord(words) → string
```

**Что делает:**

- Проверяет буквы (correct/present/absent)
- Определяет победу
- Выбирает случайное слово

---

### `src/core/stats.js` (57 строк)

**Назначение:** Работа со статистикой в localStorage

**Экспортирует:**

```javascript
export function initStats()

export function getStats() → {
    wins, totalAttempts, gamesPlayed
}

export function updateStats(won, attempts)

export function calculateWinPercentage(stats) → number

export function resetStats()
```

**Что хранит в localStorage:**

```javascript
wordleStats: {
    wins: number,
        totalAttempts
:
    number,
        gamesPlayed
:
    number
}
```

---

## 🎨 Слой UI (Отрисовка)

### `src/ui/board.js` (83 строк)

**Назначение:** Управление доской 6x5

**Экспортирует:**

```javascript
export function renderBoard(boardEl, onCellClick)

export function updateCell(boardEl, row, col, letter, status)

export function clearBoard(boardEl)

export function clearRow(boardEl, row)

export function getCellText(boardEl, row, col) → string

export function getEmptyCellsInRow(boardEl, row) → Array < HTMLElement >
```

**Управляет:**

- 30 ячеек (6 строк × 5 колонок)
- Классы: tableRow, tableCell
- Статусы: correct, present, absent

---

### `src/ui/keyboard.js` (58 строк)

**Назначение:** Виртуальная русская клавиатура

**Экспортирует:**

```javascript
export function renderKeyboard(keyboardEl, onLetterClick, onSubmit, onDelete)

export function updateKeyStatus(keyboardEl, letter, status)

export function clearKeyboardStatus(keyboardEl)
```

**Клавиатура:**

- 3 ряда букв
- Спец-кнопки: ⏎ (Enter), ⌫ (Backspace)
- 33 кнопки всего

---

### `src/ui/modal.js` (44 строк)

**Назначение:** Модальные окна

**Экспортирует:**

```javascript
export function openStatsModal()

export function showNewGameButton(messageEl, onNewGame)
```

**Окна:**

1. Статистика (wins, attempts, percentage)
2. Кнопка новой игры

---

### `src/ui/theme.js` (33 строк)

**Назначение:** Переключение темы

**Экспортирует:**

```javascript
export function initTheme()

export function toggleTheme()

export function isDarkTheme() → boolean
```

**Сохраняет в localStorage:**

```javascript
theme: "light" | "dark"
```

---

## 📥 Слой INPUT (Обработка ввода)

### `src/input/keyboardHandler.js` (31 строк)

**Назначение:** Обработка физической клавиатуры

**Экспортирует:**

```javascript
export function initPhysicalKeyboard(onLetterInput, onDelete, onSubmit, isGameOver) → Function
```

**Поддерживает:**

- Английский ввод → русский (маппинг)
- Русский ввод (напрямую)
- Backspace (удаление)
- Enter (отправка)

---

### `src/input/uiEvents.js` (155 строк)

**Назначение:** Главный обработчик всех событий UI

**Экспортирует:**

```javascript
export function initElements(board, keyboard, message)

export function handleLetterInput(letter)

export function handleDelete()

export function handleCellClick(row, col)

export function handleSubmit()

export function bindHeaderEvents(onThemeToggle)

export async function startNewGame()

export function isGameOver() → boolean
```

**Координирует:**

- Все события пользователя
- Вызывает функции других модулей
- Управляет игровым потоком

---

## 🛠️ Слой UTILS (Утилиты)

### `src/utils/constants.js` (116 строк)

**Назначение:** Константы и конфигурация

**Экспортирует:**

```javascript
export const WORDS = [...]              // 20 русских слов
export const ENG_TO_RUS = {...}        // Маппинг букв
export const KEYBOARD_LAYOUT = [[...]] // Раскладка клавиатуры
export const CELL_STATUS = {...}       // correct, present, absent
export const GAME_CONFIG = {...}       // BOARD_ROWS: 6, WORD_LENGTH: 5
```

---

### `src/utils/helpers.js` (48 строк)

**Назначение:** Вспомогательные функции

**Экспортирует:**

```javascript
export function mapEngToRus(engLetter) → string

export function showMessage(messageEl, text, isError, timeout)

export function getRandomWord(words) → string(фильтрует
5 - буквенные
слова
)
```

---

## 📊 ГРАФ ИМПОРТОВ

```
main.js
├─ ui/board.js ────────── constants.js
├─ ui/keyboard.js ─────── constants.js
├─ ui/theme.js
├─ ui/modal.js ────────── core/stats.js
├─ core/stats.js
├─ core/gameLogic.js ──── constants.js
├─ core/gameState.js
├─ input/keyboardHandler.js ─ helpers.js ─ constants.js
├─ input/uiEvents.js
│   ├─ core/gameState.js
│   ├─ core/gameLogic.js
│   ├─ core/stats.js
│   ├─ ui/board.js
│   ├─ ui/keyboard.js
│   ├─ ui/modal.js
│   ├─ helpers.js
│   └─ constants.js
└─ utils/constants.js
```

---

## 🔄 ПОТОК ДАННЫХ

### При инициализации

```
initGame()
├─ initStats() ────────────────────── localStorage['wordleStats']
├─ initTheme() ─────────────────────── localStorage['theme']
├─ renderBoard() ──────────────────── DOM: #board
├─ renderKeyboard() ───────────────── DOM: #keyboard
├─ bindHeaderEvents(toggleTheme) ──── addEventListener
├─ initPhysicalKeyboard() ──────────── addEventListener
└─ fetchRandomWord(WORDS) ────────── gameState.targetWord
```

### При вводе буквы

```
onKeyDown() / onClick()
├─ mapEngToRus() ──────────────────── русская буква
├─ handleLetterInput(letter)
├─ addLetterToGuess() ───────────── gameState.currentGuess
├─ updateCell() ──────────────────── DOM update
└─ if(isGuessComplete()) ──────────── handleSubmit()
```

### При проверке угадания

```
handleSubmit()
├─ getCurrentGuessWord() ────────── string
├─ checkGuess() ─────────────────── Array<status>
├─ updateCell() ──────────────────── DOM: цвета ячеек
├─ updateKeyStatus() ────────────── DOM: цвета букв
├─ if(isWinGuess())
│   ├─ setGameOver(true)
│   ├─ updateStats(true, attempts)
│   └─ showNewGameButton()
└─ else if(maxRows)
    ├─ setGameOver(true)
    ├─ updateStats(false, 6)
    └─ showNewGameButton()
```