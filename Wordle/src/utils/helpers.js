/**
 * @fileoverview Вспомогательные функции утилиты
 */

import {ENG_TO_RUS} from './constants.js';

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
        const response = await fetch('http://localhost:8000/random-word', {
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

