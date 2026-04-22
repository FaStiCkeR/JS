/**
 * @fileoverview Обработка ввода с физической клавиатуры
 */

import {mapEngToRus, mapSymbolsToRus} from '../utils/helpers.js';

/**
 * Инициализирует обработчик физической клавиатуры с маппингом на русский
 * @param {Function} onLetterInput - Функция обработки ввода буквы
 * @param {Function} onDelete - Функция обработки удаления
 * @param {Function} onSubmit - Функция обработки отправки
 * @param {Function} isGameOver - Функция проверки завершения игры
 * @returns {Function} Функция для удаления обработчика события
 */
export function initPhysicalKeyboard(onLetterInput, onDelete, onSubmit, isGameOver) {
    const onKeyDown = (e) => {
        // Освобождение блока от обработчиков событий при нажатии с Ctrl, Alt, Shift или Meta.
        if (e.ctrlKey || e.metaKey || (e.altKey && !e.shiftKey) || (e.shiftKey && (e.ctrlKey || e.metaKey))) {
            return;
        }
        if (isGameOver()) return;

        let key = e.key;

        // Игнорируем одиночные нажатия модификаторов
        if (['Shift', 'Control', 'Alt', 'Meta'].includes(key)) {
            return;
        }

        if (/^[a-zA-Zа-яё]$/i.test(key)) {
            e.preventDefault();
            let letter = key.toUpperCase();
            if (/^[A-Z]$/.test(letter)) {
                letter = mapEngToRus(letter);
            }
            onLetterInput(letter);
        } else if (key === 'Backspace') {
            e.preventDefault();
            onDelete();
        } else if (key === 'Enter') {
            e.preventDefault();
            onSubmit();
        } else {
            let letter = mapSymbolsToRus(key);
            // Обрабатываем только если функция вернула результат
            if (letter) {
                e.preventDefault();
                onLetterInput(letter);
            }
        }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
}