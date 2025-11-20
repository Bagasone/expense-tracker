/* Initial rendering */
window.addEventListener('load', () => {
  renderExpenses();
});

/* Variables */
// Data store
const dailyExpenses = [];

/* DOM variables */
// Info expenses
const infoExpenses = document.querySelector('.info__total');

// Variables form add
const nameExpense = document.getElementById('expense-name');
const categoryExpense = document.getElementById('expense-category');
const quantityExpense = document.getElementById('expense-quantity');
const priceExpense = document.getElementById('expense-price');
const btnAddExpense = document.querySelector('.btn-add');

// Variables form edit
const modalEdit = document.getElementById('modal-edit');
const nameEdited = document.getElementById('edited-name');
const categoryEdited = document.getElementById('edited-category');
const quantityEdited = document.getElementById('edited-quantity');
const priceEdited = document.getElementById('edited-price');
const btnSave = document.querySelector('.btn-save');
const btnClose = document.querySelector('.btn-close');

// Lists
const lists = document.querySelector('.lists');

// Current expense id
let currentId = null;

/* Application functionalities */
// Add expense item
btnAddExpense.addEventListener('click', function (e) {
  e.preventDefault();
  addExpense();
});

// Actionable list
lists.addEventListener('click', function (e) {
  e.preventDefault();

  // Edit expense
  if (e.target.closest('.btn-edit')) {
    currentId = e.target.closest('.btn-edit').dataset.id;

    editExpense(currentId);
  }

  // Delete expense
  if (e.target.closest('.btn-delete')) {
    currentId = e.target.closest('.btn-delete').dataset.id;

    deleteExpense(currentId);
  }
});

// Close modal
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  closeModal();
});

// Save update
btnSave.addEventListener('click', function (e) {
  e.preventDefault();

  updateExpense(currentId);
});

/* Application logic */
function addExpense() {
  const expenseData = {
    id: Date.now(),
    name: nameExpense.value,
    category: categoryExpense.value,
    qty: quantityExpense.value,
    price: priceExpense.value,
    date: new Date(),
  };

  if (filterInputs(expenseData)) {
    dailyExpenses.push(expenseData);

    renderExpenses();
    clearInputs();
  }
}

function editExpense(id) {
  const currentExpense = dailyExpenses.find(
    (expense) => expense.id === Number(id)
  );

  if (!currentExpense) {
    alert('Expense is not exist');
    return;
  }

  nameEdited.value = currentExpense.name;
  categoryEdited.value = currentExpense.category;
  quantityEdited.value = currentExpense.qty;
  priceEdited.value = currentExpense.price;

  modalEdit.showModal();
}

function updateExpense(id) {
  const expenseIndex = dailyExpenses.findIndex(
    (expense) => expense.id === Number(id)
  );

  const updatedData = {
    name: nameEdited.value,
    category: categoryEdited.value,
    qty: quantityEdited.value,
    price: priceEdited.value,
  };

  // It there is expense and input is valid
  if (expenseIndex !== -1 || filterInputs(updatedData)) {
    dailyExpenses[expenseIndex] = {
      ...dailyExpenses[expenseIndex],
      ...updatedData,
    };

    renderExpenses();
    closeModal();
  }
}

function renderExpenses() {
  if (!isExpensesEmpty(dailyExpenses)) {
    renderListsItem();
    calculateTotal();
  }
}

function deleteExpense(id) {
  const confirmDelete = confirm(
    'Are you sure you want to delete this expense?'
  );

  if (confirmDelete) {
    const expenseIndex = dailyExpenses.findIndex(
      (expense) => expense.id === Number(id)
    );

    if (expenseIndex !== -1) {
      dailyExpenses.splice(expenseIndex, 1);
      renderExpenses();
    }
  }
}

function renderListsItem() {
  lists.innerHTML = dailyExpenses
    .map((expense) => generateListItem(expense))
    .join('');
}

function generateListItem({ name, category, qty, price, date, id }) {
  return `<li class="list-item border shadow-md">
              <div class="list-info">
                <div class="list-head">
                    <h3 class="list-name">${name}</h3>
                    <span class="list-category border shadow-sm">${category}</span>
                </div>
                <div class="list-details">
                    <div class="list-qty">Quantity: <span>${qty}</span></div>
                    <div class="list-price">Price: <span>${currencyFormat(
                      price
                    )}</span></div>
                    <div class="list-date">Date: <span>${timeFormat(
                      date
                    )}</span></div>
                </div>
                <div class="list-total">Total: <span>
                ${currencyFormat(qty * price)}</span>
                </div>
            </div>
            <div class="list-actions">
                <button data-id=${id} class="btn btn-edit border shadow-sm">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button data-id=${id}  class="btn btn-delete border shadow-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </li>`;
}

function filterInputs({ name, category, qty, price }) {
  if (name.trim() === '') {
    alert('Expense name cannot be empty');
    return false;
  }

  if (category === '') {
    alert('Pick one category');
    return false;
  }

  if (qty.trim() === '' || isNaN(qty) || Number(qty) <= 0) {
    alert('Quantity must be a positive number');
    return false;
  }

  if (price.trim() === '' || isNaN(price) || Number(price) <= 0) {
    alert('Price must be a positive number');
    return false;
  }

  return true;
}

function calculateTotal() {
  const totalExpenses = dailyExpenses.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );

  infoExpenses.innerHTML = currencyFormat(totalExpenses);
}

function closeModal() {
  currentId = null;
  modalEdit.close();
}

function clearInputs() {
  nameExpense.value = '';
  categoryExpense.value = '';
  priceExpense.value = '';
  quantityExpense.value = '';
}

function isExpensesEmpty(dailyExpenses) {
  if (dailyExpenses.length === 0) {
    infoExpenses.innerHTML = 'No Expenses';
    lists.innerHTML = `
    <div class="border empty-card shadow-md">
      <p class="empty">No expenses</p>
    </div>
    `;
    return true;
  }
}

// Formats function
// IDR currency format
function currencyFormat(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumSignificantDigits: 3,
  }).format(amount);
}

// Time format
const options = {
  dateStyle: 'short',
  timeStyle: 'short',
  // year: '2-digit',
  // month: 'short',
  // weekday: 'short',
  // day: '2-digit',
};

function timeFormat(time) {
  return new Intl.DateTimeFormat('id-ID', options).format(time);
}
