import { generateTransactionId} from "./utils.js";
import { renderTotalSummary} from "./ui.js";

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

export { transactions, addTransaction, deleteTransaction };
