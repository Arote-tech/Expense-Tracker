const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    if (description === "" || isNaN(amount)) {
        // invalid input; don't add
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();
}

function updateTransactionList() {
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>
            ${formsCurrency(transaction.amount)}
            <button class="delete-btn">X</button>
        </span>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => removeTransaction(transaction.id));

    return li;
}

function updateSummary () {
    const amounts = transactions.map(t => t.amount);

    const balance = amounts.reduce((acc, val) => acc + val, 0);

    const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0);

    const expenses = amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0);

    balanceEl.textContent = formsCurrency(balance);
    incomeAmountEl.textContent = formsCurrency(income);
    expenseAmountEl.textContent = formsCurrency(Math.abs(expenses));

}

function formsCurrency (number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number);
}

function removeTransaction (id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

updateSummary();
updateTransactionList();