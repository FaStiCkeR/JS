import json
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Загружаем слова
try:
    with open('russian_words.json', 'r', encoding='UTF-8') as f:
        all_words = json.load(f)
    print(f"Загружено слов из JSON: {len(all_words)}")
    if all_words:
        print(f"Первые 5 слов: {all_words[:5]}")
except FileNotFoundError:
    print("Ошибка: файл russian_words.json не найден!")
    all_words = []
except json.JSONDecodeError as e:
    print(f"Ошибка парсинга JSON: {e}")
    all_words = []

# Фильтруем только пятибуквенные слова (убираем возможные пробелы)
RUSSIAN_5_LETTER_WORDS = [word.strip() for word in all_words if len(word.strip()) == 5]
print(f"Пятибуквенных слов после фильтрации: {len(RUSSIAN_5_LETTER_WORDS)}")

if not RUSSIAN_5_LETTER_WORDS:
    print("ВНИМАНИЕ: список пятибуквенных слов пуст! API будет возвращать ошибку.")
    # Можно задать резервный список вручную на всякий случай
    RUSSIAN_5_LETTER_WORDS = ["слово", "домен", "кошка"]  # пример

app = FastAPI(title="Random Russian Word API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/random-word")
async def get_random_word():
    if not RUSSIAN_5_LETTER_WORDS:
        raise HTTPException(status_code=500, detail="Словарь пуст. Проверьте файл russian_words.json")
    random_word = random.choice(RUSSIAN_5_LETTER_WORDS)
    return {"word": random_word}