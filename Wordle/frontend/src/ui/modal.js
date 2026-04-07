/**
 * @fileoverview Управление модальным окном со статистикой
 */

import {calculateWinPercentage, getStats} from '../core/stats.js';

/**
 * Открывает модальное окно со статистикой
 * @returns {void}
 */
export function openStatsModal() {
    const stats = getStats();
    const winPercentage = calculateWinPercentage(stats);
    const modal = document.createElement('div');
    modal.className = 'stats-modal-overlay';
    modal.innerHTML = `
        <div class="stats-modal">
            <div class="stats-modal-header">
                <h2>Статистика</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="stats-modal-body">
                <div class="stat-item">
                    <span class="stat-label">Успешных угадываний:</span>
                    <span class="stat-value">${stats.wins}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Всего попыток:</span>
                    <span class="stat-value">${stats.totalAttempts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Сыграно игр:</span>
                    <span class="stat-value">${stats.gamesPlayed}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Процент побед:</span>
                    <span class="stat-value">${winPercentage}%</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Создаёт и отображает кнопку новой игры
 * @param {HTMLElement} messageEl - Элемент для отображения сообщений
 * @param {Function} onNewGame - Функция для начала новой игры
 * @returns {void}
 */
export function showNewGameButton(messageEl, onNewGame) {
    if (!messageEl) return;
    const btn = document.createElement('button');
    btn.textContent = 'Новая игра';
    btn.className = 'new-game-btn';
    btn.addEventListener('click', () => {
        btn.remove();
        onNewGame();
    });
    messageEl.textContent = '';
    messageEl.className = '';
    messageEl.appendChild(btn);
}

