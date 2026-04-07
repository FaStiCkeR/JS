#!/bin/bash
# 📋 Шпаргалка Docker команд для Wordle

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🚀 Wordle Docker - Шпаргалка команд"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📍 ПЕРЕХОД В ПРОЕКТ:"
echo "   cd /Users/nb/Desktop/JS_LABS/Wordle"
echo ""

echo "🏗️  СБОРКА:"
echo "   docker-compose build           # С кэшем"
echo "   docker-compose build --no-cache # Без кэша"
echo "   docker-compose build backend   # Только backend"
echo "   docker-compose build frontend  # Только frontend"
echo ""

echo "🚀 ЗАПУСК:"
echo "   docker-compose up -d           # В фоне"
echo "   docker-compose up              # С логами"
echo "   docker-compose up backend      # Только backend"
echo "   docker-compose up frontend     # Только frontend"
echo ""

echo "📊 СТАТУС:"
echo "   docker-compose ps              # Статус контейнеров"
echo "   docker-compose logs            # Все логи"
echo "   docker-compose logs backend    # Логи backend"
echo "   docker-compose logs frontend   # Логи frontend"
echo "   docker stats                   # Использование ресурсов"
echo ""

echo "🛑 ОСТАНОВКА:"
echo "   docker-compose down            # Остановить и удалить"
echo "   docker-compose stop            # Только остановить"
echo "   docker-compose restart         # Перезапустить"
echo ""

echo "🧹 ОЧИСТКА:"
echo "   docker-compose down --rmi all  # Удалить контейнеры и образы"
echo "   docker-compose down -v         # Удалить volumes"
echo "   docker system prune -a         # Полная очистка"
echo ""

echo "🔧 ОТЛАДКА:"
echo "   docker-compose exec backend bash    # Войти в backend"
echo "   docker-compose exec frontend sh     # Войти в frontend"
echo "   docker-compose logs -f              # Логи в реальном времени"
echo "   docker network inspect wordle_app-network  # Проверить сеть"
echo ""

echo "🌐 ДОСТУП:"
echo "   Frontend:  http://localhost/"
echo "   API:       http://localhost:8000/"
echo "   Docs:      http://localhost:8000/docs"
echo ""

echo "✅ ПРОВЕРКА:"
echo "   curl http://localhost:8000/random-word    # API тест"
echo "   curl -I http://localhost/                 # Frontend тест"
echo ""

echo "🔄 ОБНОВЛЕНИЕ:"
echo "   docker-compose down"
echo "   git pull"
echo "   docker-compose up -d --build"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🎮 Приложение готово к развертыванию!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
