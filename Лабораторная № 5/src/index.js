import {
    renderTable,
    renderForm,
    unRenderForm,
    renderTableRow,
    renderTotalSummary,
    renderCategorySelect
} from "./ui.js";
import { transactions, addTransaction, deleteTransaction } from "./transactions.js";
import {addNewCategory, getFormData} from "./utils.js";



// Полная загрузка DOM
document.addEventListener('DOMContentLoaded', () => {

    const filters = ['продукты', 'аренда', 'развлечения', 'транспорт', 'зарплата'];

    renderTable(transactions); // Загрузка таблицы
    renderTotalSummary(); // Загрузка общей суммы

    const addTransactionModal = document.getElementById("addTransactionModal"); // Кнопка открытия модального окна с созданием транзакции
    if (addTransactionModal) {
        addTransactionModal.addEventListener("click", (e) => {
            e.preventDefault();        // так как кнопка внутри формы
            renderForm();
        });
    } else console.warn('Кнопка с id="addTransactionModal" не найдена в DOM');

    const overlay = document.getElementById("overlay"); // Контейнер для затемнения заднего фона
    if (overlay) {
        overlay.addEventListener("click", () => {
            unRenderForm();
        });
    } else console.warn('Кнопка с id="overlay" не найдена в DOM');

    const submitButton = document.getElementById("submitTransactionButton"); // Кнопка создания транзакции, указанной в форме
    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const transactionData = getFormData(); // Извлечение данных с полей формы
            if (!transactionData) return; // Проверка на пустую форму

            const newTransaction = addTransaction(transactionData);
            renderTableRow(newTransaction);
            renderTotalSummary();
            unRenderForm();
        });
    } else console.warn('Кнопка с id="submitButton" не найдена в DOM');

    const closeTransactionFormButton = document.getElementById("closeTransactionForm"); // Кнопка закрытия формы
    if (closeTransactionFormButton) {
        closeTransactionFormButton.addEventListener("click", (e) => {
            e.preventDefault();
            unRenderForm();
        });
    } else console.warn('Кнопка с id="closeTransactionFormButton" не найдена в DOM');

    const deleteTransactionButtons = document.querySelectorAll('.deleteTransactionButton'); // Кнопка для удаления транзакций с таблицы
    if (deleteTransactionButtons) {
        document.getElementById('transactionTable').addEventListener('click', (e) => {
            const button = e.target.closest('.deleteTransactionButton');
            if (!button) return; // клик не по кнопке

            const row = button.closest('tr');
            const transactionId = parseInt(row.dataset.id); // id из data-id строки
            if (confirm('Ты уверен, что хочешь удалить транзакцию?')) {
                deleteTransaction(transactionId);
            }
        });
    } else console.warn('Кнопка с class="deleteTransactionButtons" не найдена в DOM');

    const descriptionSection = document.getElementById('descriptionSection'); // Описание транзакций
    if (descriptionSection) {
        const descriptionCells = document.querySelectorAll('.description');
        descriptionCells.forEach((cell) => {

            cell.addEventListener('click', () => {
                const row = cell.closest('tr');
                const transactionId = parseInt(row.dataset.id); // id из data-id строки


                descriptionSection.textContent = `Транзакция № ${transactionId}: ${transactions[transactionId - 1].description}`;
            })
        })
    }

    const addCategoryTransactionButton = document.getElementById("addCategoryTransactionButton");
    if (addCategoryTransactionButton) {
        renderCategorySelect(filters);
        const btn = document.getElementById('addCategoryTransactionButton');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                addNewCategory(filters);
            });
        }
    }

});