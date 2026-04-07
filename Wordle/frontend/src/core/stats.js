/**
 * @fileoverview Управление статистикой в localStorage
 */

/**
 * Инициализирует статистику в localStorage
 * @returns {void}
 */
export function initStats() {
    if (!localStorage.getItem('wordleStats')) {
        localStorage.setItem('wordleStats', JSON.stringify({
            wins: 0,
            totalAttempts: 0,
            gamesPlayed: 0
        }));
    }
}

/**
 * Получает статистику из localStorage
 * @returns {Object} Объект со статистикой игр
 * @returns {number} wins - Количество побед
 * @returns {number} totalAttempts - Общее количество попыток
 * @returns {number} gamesPlayed - Количество сыгранных игр
 */
export function getStats() {
    return JSON.parse(localStorage.getItem('wordleStats')) || {
        wins: 0,
        totalAttempts: 0,
        gamesPlayed: 0
    };
}

/**
 * Обновляет статистику в localStorage
 * @param {boolean} won - Была ли выиграна текущая игра
 * @param {number} attempts - Количество попыток в текущей игре
 * @returns {void}
 */
export function updateStats(won, attempts) {
    const stats = getStats();
    stats.gamesPlayed++;
    stats.totalAttempts += attempts;
    if (won) {
        stats.wins++;
    }
    localStorage.setItem('wordleStats', JSON.stringify(stats));
}

/**
 * Вычисляет процент побед
 * @param {Object} stats - Объект со статистикой
 * @returns {number} Процент побед (0-100)
 */
export function calculateWinPercentage(stats) {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.wins / stats.gamesPlayed) * 100);
}

/**
 * Сбрасывает всю статистику
 * @returns {void}
 */
export function resetStats() {
    localStorage.setItem('wordleStats', JSON.stringify({
        wins: 0,
        totalAttempts: 0,
        gamesPlayed: 0
    }));
}

