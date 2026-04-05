# 🎮 Wordle Game

> Русская версия популярной игры Wordle с модульной архитектурой

## 📖 Документация

Вся документация находится в папке `Documentation/`:

### Быстрые ссылки

| Документ                                         | Описание                   |
|--------------------------------------------------|----------------------------|
| [README.md](Documentation/README.md)             | 📚 Полный гайд по проекту  |
| [ARCHITECTURE.md](Documentation/ARCHITECTURE.md) | 🏛️ Описание архитектуры   |
| [API.md](Documentation/API.md)                   | 📋 API всех модулей        |
| [MODULES.md](Documentation/MODULES.md)           | 📦 Описание каждого модуля |
| [DEPENDENCIES.md](Documentation/DEPENDENCIES.md) | 🔗 Граф зависимостей       |

## 🎯 Начало работы

1. **Открой** [Documentation/README.md](Documentation/README.md) для полного описания
2. **Изучи** [Documentation/ARCHITECTURE.md](Documentation/ARCHITECTURE.md) архитектуру
3. **Смотри** [Documentation/API.md](Documentation/API.md) для функций

## 📁 Структура проекта

```
Wordle/
├── index.html              # HTML страница
├── Documentation/          # 📚 Вся документация
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── MODULES.md
│   ├── DEPENDENCIES.md
│   ├── FINAL_CHECKLIST.md
│   └── INDEX.md
└── src/                    # 💻 Исходный код
    ├── main.js            # Точка входа
    ├── styles.css         # Стили
    ├── core/              # Логика игры
    ├── ui/                # Интерфейс
    ├── input/             # Обработка ввода
    └── utils/             # Утилиты
```

## ⚡ Быстрый старт

### Запуск

```bash
# Вариант 1: Live Server (VS Code)
# Нажми правой кнопкой на index.html → Open with Live Server

# Вариант 2: Python
python -m http.server 8000

# Вариант 3: Node.js
npm install -g http-server
http-server
```

Откройся браузер на `http://localhost:8000` (или указанный порт)

## 🎮 Как играть

1. Введи слово из 5 букв
2. Смотри на подсказки:
    - 🟩 Зелёный - правильное место
    - 🟨 Жёлтый - буква есть, но на другом месте
    - ⬜ Серый - буквы нет
3. У тебя 6 попыток

## 📊 Статистика проекта

- **Модули:** 12 файлов
- **Строк кода:** 941
- **Документация:** 2000+ строк
- **JSDoc покрытие:** 100%
- **Циклические зависимости:** 0 ✅

## 🏗️ Архитектура

4-слойная система:

- **Utils** - базовые утилиты
- **Core** - бизнес-логика
- **UI** - отрисовка
- **Input** - обработка ввода

## 🚀 Расширение

Добавить новую фичу просто! Смотри [Documentation/README.md](Documentation/README.md) раздел "Как добавить фичу"

## 📝 Лицензия

Проект создан в образовательных целях.

---

**[Начни с документации →](Documentation/README.md)**

