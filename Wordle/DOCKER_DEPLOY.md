# 🚀 Развертывание Wordle в Docker

## 📋 Предварительные требования

- **Docker** 20.10+
- **Docker Compose** 2.0+

### Проверка установки:

```bash
docker --version
docker-compose --version
```

## 🏗️ Структура проекта

```
Wordle/
├── docker-compose.yml    # Конфигурация Docker Compose
├── backend/
│   ├── Dockerfile        # Backend образ
│   ├── requirements.txt  # Python зависимости
│   ├── main.py          # FastAPI приложение
│   └── russian_words.json # База слов
└── frontend/
    ├── Dockerfile       # Frontend образ
    ├── package.json     # Node.js зависимости
    ├── src/             # Исходный код
    └── dist/            # Скомпилированные стили
```

## 🚀 Быстрый старт

### 1. Клонирование/переход в директорию

```bash
cd /Users/nb/Desktop/JS_LABS/Wordle
```

### 2. Сборка образов

```bash
docker-compose build
```

### 3. Запуск контейнеров

```bash
docker-compose up -d
```

### 4. Проверка работы

```bash
# API
curl http://localhost:8000/random-word

# Frontend
curl -I http://localhost:8001/
```

## 📊 Детальное руководство

### Шаг 1: Сборка образов

```bash
# Сборка с кэшем (быстрее)
docker-compose build

# Сборка без кэша (если проблемы)
docker-compose build --no-cache

# Только backend
docker-compose build backend

# Только frontend
docker-compose build frontend
```

### Шаг 2: Запуск

```bash
# Запуск в фоне
docker-compose up -d

# Запуск с логами (для отладки)
docker-compose up

# Только backend
docker-compose up backend

# Только frontend
docker-compose up frontend
```

### Шаг 3: Проверка статуса

```bash
# Статус контейнеров
docker-compose ps

# Логи
docker-compose logs

# Логи backend
docker-compose logs backend

# Логи frontend
docker-compose logs frontend
```

## 🌐 Доступ к приложению

После успешного запуска:

| Сервис        | URL                         | Описание            |
|---------------|-----------------------------|---------------------|
| **Frontend**  | http://localhost:8001/      | Основное приложение |
| **API**       | http://localhost:8000/      | REST API            |
| **API Docs**  | http://localhost:8000/docs  | Swagger UI          |
| **API ReDoc** | http://localhost:8000/redoc | ReDoc               |

## 🛠️ Управление контейнерами

### Остановка

```bash
# Остановить все
docker-compose down

# Остановить без удаления volumes
docker-compose stop
```

### Перезапуск

```bash
# Перезапустить все
docker-compose restart

# Перезапустить backend
docker-compose restart backend
```

### Очистка

```bash
# Удалить контейнеры и образы
docker-compose down --rmi all

# Удалить volumes
docker-compose down -v

# Полная очистка
docker system prune -a
```

## 🔧 Настройка и конфигурация

### Переменные окружения

Для production можно создать `.env` файл:

```bash
# В корне проекта создать .env
echo "API_URL=http://your-production-api.com" > .env
```

### Изменение портов

В `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:8000"  # Изменить порт хоста
  frontend:
    ports:
      - "8080:80"    # Изменить порт хоста
```

## 🐛 Устранение неполадок

### Проблема: "Port already in use"

```bash
# Найти процесс
lsof -i :8000
lsof -i :80

# Остановить процесс
kill -9 <PID>
```

### Проблема: "Build failed"

```bash
# Очистить кэш
docker system prune -a

# Пересобрать без кэша
docker-compose build --no-cache
```

### Проблема: "Container exits immediately"

```bash
# Проверить логи
docker-compose logs

# Запустить интерактивно
docker-compose run --rm backend bash
```

### Проблема: "Network issues"

```bash
# Пересоздать сеть
docker-compose down
docker network prune
docker-compose up -d
```

## 📊 Мониторинг

### Просмотр ресурсов

```bash
# Использование CPU/памяти
docker stats

# Информация о контейнере
docker inspect wordle-backend-1
```

### Логи в реальном времени

```bash
# Все логи
docker-compose logs -f

# Только ошибки
docker-compose logs -f | grep ERROR
```

## 🔄 Обновление

### Обновление кода

```bash
# Остановить
docker-compose down

# Обновить код
git pull

# Пересобрать и запустить
docker-compose up -d --build
```

### Обновление зависимостей

```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend
cd frontend && npm install

# Пересобрать
docker-compose up -d --build
```

## 🚀 Production развертывание

### На сервере

```bash
# Клонировать проект
git clone <repository>
cd Wordle

# Создать .env файл
cp frontend/.env.example frontend/.env

# Запустить
docker-compose -f docker-compose.yml up -d
```

### С Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📝 Полезные команды

```bash
# Войти в контейнер
docker-compose exec backend bash
docker-compose exec frontend sh

# Копировать файлы
docker cp wordle-backend-1:/app/main.py .

# Проверить сеть
docker network ls
docker network inspect wordle_app-network

# Очистка дискового пространства
docker system df
docker system prune
```

## 🎯 Быстрые команды

```bash
# Полный цикл
docker-compose down && docker-compose build && docker-compose up -d

# Перезапуск с rebuild
docker-compose up -d --build

# Остановка и очистка
docker-compose down -v --rmi all
```

---

## ✅ Готово!

Приложение Wordle успешно развернуто в Docker!

**URLs:**

- Frontend: http://localhost/
- API: http://localhost:8000/
- Docs: http://localhost:8000/docs

🎉 **Приятного использования!**
