/**
 * @fileoverview Логика проверки угадания в игре Wordle
 */

import {getRandomWord} from "../utils/helpers";

/**
 * Проверяет угадание и возвращает статусы для каждой буквы
 * @param {string} guess - Угаданное слово
 * @param {string} target - Загаданное слово
 * @returns {Array<string>} Массив статусов ('correct', 'present', 'absent')
 */
export function checkGuess(guess, target) {
    const result = Array(5).fill('absent');
    const targetArr = target.split('');
    const guessArr = guess.split('');

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = 'correct';
            targetArr[i] = null;
            guessArr[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === null) continue;
        const idx = targetArr.indexOf(guessArr[i]);
        if (idx !== -1) {
            result[i] = 'present';
            targetArr[idx] = null;
        }
    }

    return result;
}

/**
 * Проверяет, выигрышное ли угадание
 * @param {string} guess - Угаданное слово
 * @param {string} target - Загаданное слово
 * @returns {boolean} true если угадание совпадает с загаданным словом
 */
export function isWinGuess(guess, target) {
    return guess === target;
}

/**
 * Получает случайное слово асинхронно
 * @param {Array<string>} words - Массив слов для выбора
 * @returns {Promise<string>} Промис с выбранным словом
 */
export async function fetchRandomWord(words) {
    return new Promise((resolve) => {
        getRandomWord(words);
    });
}

