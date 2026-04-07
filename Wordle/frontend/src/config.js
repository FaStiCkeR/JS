/**
 * @fileoverview Конфигурация приложения
 */

/**
 * URL базы API
 * @type {string}
 */
export const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

/**
 * Эндпоинт для получения случайного слова
 * @type {string}
 */
export const API_RANDOM_WORD_ENDPOINT = `${API_BASE_URL}/random-word`;

