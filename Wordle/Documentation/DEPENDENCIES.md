# 🔗 Граф зависимостей модулей

## Визуальная схема

```
┌─────────────────────────────────────────────────────┐
│                   main.js (ENTRY)                  │
│              (точка входа приложения)              │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
        ▼            ▼            ▼              ▼
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ ui/      │ │ core/    │ │ input/   │ │ utils/   │
  │ theme.js │ │ stats.js │ │keyboard  │ │constants │
  └──────────┘ └──────────┘ │Handler   │ └──────────┘
        ▲            ▲       └──────────┘      ▲
        │            │                         │
        └────────────┴─────────────────────────┘


┌─────────────────────────────────────────────────────┐
│              input/uiEvents.js                      │
│         (основной обработчик событий)              │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬─────────────┐
    │            │            │             │
    ▼            ▼            ▼             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ core/    │ │ ui/      │ │ ui/      │ │ utils/   │
│gameState │ │board.js  │ │keyboard  │ │helpers   │
│gameLogic │ │modal.js  │ │stats.js  │ │constants │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
     ▲            ▲            ▲            ▲
     │            │            │            │
     └────────────┴────────────┴────────────┘
```

## Таблица зависимостей

| Модуль                       | Импортирует из         | Используется в                              |
|------------------------------|------------------------|---------------------------------------------|
| **main.js**                  | Все модули             | -                                           |
| **core/gameState.js**        | -                      | input/uiEvents.js                           |
| **core/gameLogic.js**        | utils/constants.js     | input/uiEvents.js                           |
| **core/stats.js**            | -                      | ui/modal.js, input/uiEvents.js              |
| **ui/board.js**              | utils/constants.js     | main.js, input/uiEvents.js                  |
| **ui/keyboard.js**           | utils/constants.js     | main.js, input/uiEvents.js                  |
| **ui/modal.js**              | core/stats.js          | main.js, input/uiEvents.js                  |
| **ui/theme.js**              | -                      | main.js                                     |
| **input/keyboardHandler.js** | utils/helpers.js       | main.js                                     |
| **input/uiEvents.js**        | Все core/, ui/, utils/ | main.js                                     |
| **utils/constants.js**       | -                      | Многие модули                               |
| **utils/helpers.js**         | utils/constants.js     | input/keyboardHandler.js, input/uiEvents.js |

## Уровни модулей

### Уровень 0 (самые низкие, нет зависимостей)

- `utils/constants.js`
- `core/gameState.js`

### Уровень 1 (зависят от уровня 0)

- `utils/helpers.js` → зависит от constants.js
- `core/gameLogic.js` → зависит от constants.js
- `ui/theme.js` → нет зависимостей (самостоятельный)
- `ui/keyboard.js` → зависит от constants.js
- `ui/board.js` → зависит от constants.js

### Уровень 2 (зависят от уровня 1)

- `core/stats.js` → нет зависимостей (самостоятельный)
- `input/keyboardHandler.js` → зависит от helpers.js

### Уровень 3 (зависят от уровня 2)

- `ui/modal.js` → зависит от stats.js
- `input/uiEvents.js` → зависит от gameState, gameLogic, stats, board, keyboard, modal, helpers, constants

### Уровень 4 (точка входа)

- `main.js` → зависит от всех модулей