# Отчет о проделанной работе:

### Данная лабораторная работа была структурирована по следующим этапам:

Вот несколько способов красиво представить структуру вашего проекта в Markdown — от визуальной диаграммы до удобного
списка.

---

## Вариант 1: Диаграмма Mermaid (рекомендуется)
---
📄 **index.html**  
⤷ 📁 **src/index.js** *(инициализация после `DOMContentLoaded`)*

**📦 Импорты из ui.js:**  
├─ 🎨 `renderTable()` → 📄 `ui.js`  
├─ 🎨 `renderTableRow()` → 📄 `ui.js`  
├─ 🎨 `renderForm()` → 📄 `ui.js`  
├─ 🎨 `unRenderForm()` → 📄 `ui.js`  
├─ 🎨 `renderTotalSummary()` → 📄 `ui.js`  
└─ 🎨 `renderCategorySelect()` → 📄 `ui.js`

**📦 Импорты из transactions.js:**  
├─ 💾 `transactions` (массив) → 📄 `transactions.js`  
├─ ➕ `addTransaction()` → 📄 `transactions.js`  
└─ ❌ `deleteTransaction()` → 📄 `transactions.js`

**📦 Импорты из utils.js:**  
├─ 🛠️ `generateTransactionId()` → 📄 `utils.js`  
├─ 🛠️ `formatTransactionDate()` → 📄 `utils.js`  
├─ 🛠️ `dateForDateInput()` → 📄 `utils.js`  
├─ 🛠️ `getFormData()` → 📄 `utils.js`  
├─ 🛠️ `calculateTotal()` → 📄 `utils.js`  
└─ 🛠️ `addNewCategory()` → 📄 `utils.js`

**🔗 Основные обработчики событий в index.js:**

- 📋 Открытие формы → вызывает `renderForm()`
- 🧾 Закрытие формы (оверлей/крестик) → вызывает `unRenderForm()`
- ✅ Отправка формы → `getFormData()` → `addTransaction()` → `renderTableRow()` → `renderTotalSummary()` →
  `unRenderForm()`
- 🗑️ Удаление транзакции → `deleteTransaction()` → перерисовка итога
- 🏷️ Добавление категории → `addNewCategory()` → обновление `<select>` через `renderCategorySelect()`
- 🔍 Клик по описанию транзакции → показывает полный текст

---

- '/src/index.js' - главный файл, который запускает приложение и связывает все модули. Он отвечает за инициализацию,
  обработку событий и взаимодействие между UI и данными.

```javascript
import {renderCategorySelect, renderForm, renderTable, renderTableRow, renderTotalSummary, unRenderForm} from "./ui.js";
import {addTransaction, deleteTransaction, transactions} from "./transactions.js";
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
```

- '/src/transactions.js' - модуль для управления данными транзакций. Содержит массив транзакций и функции для добавления
  и удаления транзакций.

```javascript
import {generateTransactionId} from "./utils.js";
import {renderTotalSummary} from "./ui.js";

const transactions = [
    {
        id: 1,
        date: new Date('2025-03-01T10:30:00'),
        amount: 150.75,
        category: 'Продукты',
        description: 'Покупка в супермаркете'
    },
    {
        id: 2,
        date: new Date('2025-03-02T14:15:00'),
        amount: 2500.00,
        category: 'Аренда',
        description: 'Оплата аренды за март'
    },
    {
        id: 3,
        date: new Date('2025-03-03T09:45:00'),
        amount: 89.99,
        category: 'Развлечения',
        description: 'Билет в кино'
    },
    {
        id: 4,
        date: new Date('2025-03-04T18:20:00'),
        amount: 45.50,
        category: 'Транспорт',
        description: 'Такси до дома'
    },
    {
        id: 5,
        date: new Date('2025-03-05T12:00:00'),
        amount: 1200.00,
        category: 'Зарплата',
        description: 'Аванс за март'
    }
];

/**
 * @param transactionData
 * @return {{id: *, date: Date, amount: number, category: string, description: string}}
 */
function addTransaction(transactionData) {
    const newTransaction = {
        id: generateTransactionId(transactions),
        date: new Date(transactionData.date),
        amount: Number(transactionData.amount),
        category: transactionData.category.trim(),
        description: transactionData.description.split(' ').slice(0, 4).join(' ')
    };

    transactions.push(newTransaction);
    return newTransaction;
}

/**
 * Функция удаления существующей транзакции из таблицы
 * @param id
 */
function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        const row = document.querySelector(`#transactionTable tr[data-id='${id}']`);
        if (row) row.remove();
        renderTotalSummary();
    }
}

export {transactions, addTransaction, deleteTransaction};
```

- '/src/ui.js' - модуль для управления пользовательским интерфейсом. Содержит функции для отрисовки таблицы, формы и
  других элементов UI.

```javascript
import {calculateTotal, dateForDateInput, formatTransactionDate} from "./utils.js";

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

export {renderTableRow, renderTable, renderForm, unRenderForm, renderTotalSummary, renderCategorySelect};
```

'src/utils.js' - модуль для вспомогательных функций, таких как генерация ID, форматирование дат и расчет общей суммы.

```javascript
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


export {generateTransactionId, formatTransactionDate, calculateTotal, getFormData, dateForDateInput, addNewCategory};
```

index.html - основной HTML файл, который содержит структуру страницы и подключает все скрипты и стили.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная № 5</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="overlay" id="overlay"></div>
<div class="wrapper">
    <div>
        <h1 id="totalSummary">Общая сумма: </h1>
    </div>
    <table border="1" cellpadding="15" cellspacing="0" class="transactionTable" id="transactionTable">
        <tr>
            <th>Дата и время</th>
            <th>Категория транзакции</th>
            <th>Краткое описание транзакции</th>
            <th>Действие (Кнопка удаления транзакции)</th>
        </tr>
    </table>
    <!-- From Uiverse.io by gharsh11032000 -->
    <button class="addTransactionModal" type="button" id="addTransactionModal">
        <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
        </svg>
        <span class="text">Добавить транзакцию</span>
        <span class="circle"></span>
        <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
            <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
        </svg>
    </button>
    <form action="" class="formAddTransaction" id="formAddTransaction">
        <button type="button" class="closeTransactionForm cancelButtons" id="closeTransactionForm">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15" fill="#f1f1f1" stroke="#ddd" stroke-width="1"/>
                <path d="M21 11L11 21M11 11L21 21"
                      stroke="#333"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
        </button>

        <div class="input-group">
            <input type="datetime-local" id="date" name="date" placeholder=" " required>
            <label for="date">Дата транзакции</label>
        </div>

        <div class="input-group">
            <input type="number" id="amount" name="amount" placeholder=" " required>
            <label for="amount">Сумма транзакции</label>
        </div>

        <div class="input-group">
            <select name="category" id="category" required>
            </select>
            <label for="category"></label>
        </div>

        <div class="input-group">
            <input type="text" id="description" name="description" placeholder=" " required
                   pattern="^.{3,120}$"
                   title="Описание: от 3 до 120 символов">
            <label for="description">Описание транзакции</label>
        </div>

        <div class="button-group">
            <button class="addTransactionModal" type="button" id="submitTransactionButton">
                Добавить транзакцию
            </button>
            <button class="addTransactionModal" type="button" id="addCategoryTransactionButton">
                Добавить добавить категорию
            </button>
        </div>
    </form>
</div>
<div>
    <h2 id="descriptionHeader">Выберите транзакцию для получения описания</h2>
    <p id="descriptionSection">

    </p>
</div>
</body>
<script src="src/index.js" type="module"></script>
</html>
```

'/style.css' - файл со стилями для оформления страницы и элементов UI.