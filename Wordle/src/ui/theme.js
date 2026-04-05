/**
 * @fileoverview Управление темой приложения
 */

/**
 * Инициализирует тему на основе сохранённых настроек
 * @returns {void}
 */
export function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Переключает тему приложения между светлой и тёмной
 * @returns {void}
 */
export function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Проверяет, активна ли тёмная тема
 * @returns {boolean} true если тёмная тема активна
 */
export function isDarkTheme() {
    return document.documentElement.classList.contains('dark');
}

