import {transactions} from "./transactions.js";
import {renderCategorySelect} from "./ui.js";

/**
 * @param transactions
 * @return {*}
 */
function generateTransactionId(transactions) {
    const maxId = transactions.reduce((max, transaction) => {
        return Math.max(max, transaction.id);
    }, 0);

    return maxId + 1;
}

/**
 * @param date
 * @return {string}
 */
function formatTransactionDate(date) {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toLocaleString("ru-RU");
}

/**
 * Возвращает дату по умолчанию для datetime-local
 * @return {string}
 */
function dateForDateInput() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${hours}:${minutes}`;
}

function getFormData() {
    const form = document.getElementById("formAddTransaction");
    if (!form) return null;

    if (!form.reportValidity()) return null;

    const formData = new FormData(form);

    return {
        date: formData.get("date"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        description: formData.get("description")
    };
}

/**
 * Сумма транзакций
 * @return {number}
 */
function calculateTotal() {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

function addNewCategory(categories) {
    const newCat = prompt('Введите новую категорию:');
    if (newCat && newCat.trim()) {
        const catLower = newCat.trim().toLowerCase();
        if (!categories.includes(catLower)) {
            categories.push(catLower);
            renderCategorySelect(categories); // обновляем выпадающий список
        } else {
            alert('Такая категория уже есть');
        }
    }
}


export { generateTransactionId, formatTransactionDate, calculateTotal, getFormData, dateForDateInput, addNewCategory };
