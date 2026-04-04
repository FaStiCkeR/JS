import {dateForDateInput, formatTransactionDate} from "./utils.js";
import {calculateTotal} from "./utils.js";

/**
 * Рендер табличной строки
 * @param transaction
 */
function renderTableRow(transaction) {
    const table = document.getElementById('transactionTable');
    if (!table) return;

    // Создаём строку с data-атрибутом и классом прибыли/убытка
    const row = table.insertRow(); // более короткая запись
    row.dataset.id = transaction.id;
    row.classList.add(transaction.amount > 0 ? 'profit' : 'deficit');

    // Вспомогательная функция для добавления ячейки с текстом
    const addCell = (text, className) => {
        const cell = row.insertCell();
        cell.textContent = text;
        if (className) cell.classList.add(className);
        return cell;
    };

    // Добавляем ячейки с данными
    addCell(formatTransactionDate(transaction.date), 'date');
    addCell(transaction.category, 'category');
    addCell(transaction.description.split(' ').slice(0, 4).join(' '), 'description');

    // Ячейка с кнопкой удаления
    const actionCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'cancelButtons deleteTransactionButton';
    actionCell.appendChild(deleteButton);
}

function renderTable(transactions) {
    const table = document.getElementById("transactionTable");
    if (!table) return;

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (const transaction of transactions) {
        renderTableRow(transaction);
    }
}

function renderForm() {
    const form = document.getElementById('formAddTransaction');
    const overlay = document.getElementById('overlay');
    const date = document.getElementById('date');
    date.value = dateForDateInput();

    if (!form || !overlay) return;

    overlay.style.display = 'block';
    form.style.display = 'block';
}

function unRenderForm() {
    const form = document.getElementById('formAddTransaction');
    const overlay = document.getElementById('overlay');

    if (!form || !overlay) return;

    overlay.style.display = 'none';
    form.style.display = 'none';
    form.reset();
}

function renderTotalSummary() {
    const totalSummary = document.getElementById('totalSummary');
    totalSummary.innerHTML = `Общая сумма: ${calculateTotal()}`;
}

function renderCategorySelect(categories) {
    const select = document.getElementById('category');
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>-- Выберите категорию --</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        select.appendChild(option);
    });
}

export { renderTableRow, renderTable, renderForm, unRenderForm, renderTotalSummary, renderCategorySelect };
