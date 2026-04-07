# 🚀 Настройка API для Wordle

## Требования
- Python 3.8+
- FastAPI и Uvicorn (установлены автоматически)

## Установка зависимостей

```bash
cd /Users/nb/Desktop/JS_LABS/Wordle/API
python3 -m pip install fastapi uvicorn
```

## Запуск сервера

```bash
cd /Users/nb/Desktop/JS_LABS/Wordle/API
python3 -m uvicorn main:app --reload --port 8000
```

Сервер будет доступен по адресу: `http://localhost:8000`

### Интерактивная документация API
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoint

### GET `/random-word`
Возвращает случайное пятибуквенное русское слово.

**Ответ:**
```json
{
  "word": "СЛОВО"
}
```

## Файлы

- `main.py` - Основной код API (FastAPI приложение)
- `russian_words.json` - База данных пятибуквенных русских слов

## Особенности

✅ Поддержка CORS для кросс-доменных запросов  
✅ Автоматическая фильтрация только пятибуквенных слов  
✅ Обработка ошибок при отсутствии файла или пустом списке  
✅ Hot reload при разработке (флаг `--reload`)

## Использование в JavaScript

Функция `getRandomWord()` автоматически пытается получить слово с API и переключается на встроенный словарь, если API недоступен.

```javascript
const word = await getRandomWord(WORDS);
```

---

**Убедитесь, что API работает перед запуском игры!**

