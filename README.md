<div class="form-container">
    <h2>Add Transactions</h2>
        <form id = "transaction-form" action="">
        <div class = "form-group">
            <label for="description">Description</label>
                <input type="text" id = "description" placeholder = "Enter Description..." required>
        </div>

<div class = "form-group">
    <label for="amount">Amount</label>
        <input type="number" id = "amount" placeholder = "Enter Amount..." required>
            <small>Use negative (-) for expenses</small>
</div>

<button type = "submit">Add Transaction</button>
        </form>
</div>

const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");



let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransactions)


.balance-container {
    text-align: center;
    margin-bottom: 35px;
    padding: 24px;
    background: linear-gradient(135deg, #a8d5ba, #6b8e23);
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.balance-container h1 {
    font-size: 3rem;
    margin: 15px 0;
    margin-bottom: 20px;
}

.summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;
}

       