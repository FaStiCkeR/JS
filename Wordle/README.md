# 🎮 Wordle - Русская версия

Многофункциональная игра Wordle с поддержкой API на FastAPI.

## 📁 Структура проекта

```
Wordle/
├── backend/              # 🐍 Python FastAPI сервер
│   ├── main.py          # Основной файл API
│   ├── russian_words.json # База слов
│   ├── SETUP.md         # Инструкция по запуску API
│   └── Documentation/   # Документация API
├── frontend/            # 🌐 JavaScript приложение
│   ├── index.html       # Главная страница
│   ├── package.json     # Зависимости npm
│   ├── src/             # Исходный код
│   │   ├── main.js
│   │   ├── config.js    # Конфигурация (URL API)
│   │   ├── core/        # Логика игры
│   │   ├── input/       # Обработка ввода
│   │   ├── ui/          # UI компоненты
│   │   └── utils/       # Утилиты
│   └── dist/            # Собранные стили
├── Documentation/       # 📖 Документация проекта
└── README.md           # Этот файл
```

## 🚀 Быстрый старт

### Запуск Backend (API)

```bash
cd backend
python3 -m pip install fastapi uvicorn  # Первый раз только
python3 -m uvicorn main:app --reload --port 8000
```

API будет доступен на `http://localhost:8000`

### Запуск Frontend

```bash
cd frontend
npm install              # Первый раз только
npm run watch:css       # Для компиляции стилей (если нужно)
# Откройте index.html в браузере
```

## 🎯 Особенности

✅ **Полная поддержка русского языка** - 5-буквенные русские слова  
✅ **API на FastAPI** - Независимый бэкенд для получения слов  
✅ **Адаптивный дизайн** - Работает на всех устройствах  
✅ **Темная тема** - Встроенная поддержка ночного режима  
✅ **Сохранение статистики** - Ведение истории игр в localStorage  
✅ **Полная клавиатура** - Поддержка как цифровой, так и виртуальной клавиатуры

## ⚙️ Конфигурация

### Frontend (`frontend/src/config.js`)

Основной URL API можно переопределить переменной окружения:

```javascript
export const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';
```

### Backend (`backend/main.py`)

API работает на порту `8000` с поддержкой CORS для всех источников.

## 📚 Документация

- [Project Documentation](./Documentation/README.md) - Полная документация проекта

## 🔧 Требования

- **Node.js** 14+ (для frontend)
- **Python** 3.8+ (для backend)
- **npm** 6+ (для управления зависимостями frontend)

## 📝 Лицензия

ISC

---

**Приятной игры!** 🎉

