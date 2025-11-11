// app.js
(() => {
  // STATE
  const expenses = [];

  // DOM
  const form = document.getElementById('expense-form');
  const nameInput = document.getElementById('name');
  const categoryInput = document.getElementById('category');
  const qtyInput = document.getElementById('qty');
  const priceInput = document.getElementById('price');
  const errorEl = document.getElementById('form-error');

  const listEl = document.getElementById('expense-list');
  const todayTotalEl = document.getElementById('today-total');
  const expenseCountEl = document.getElementById('expense-count');

  // UTIL
  function formatCurrency(n) {
    // For IDR simple formatting
    return n.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    });
  }

  function isSameDay(isoA, isoB) {
    const a = new Date(isoA);
    const b = new Date(isoB);
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function uid() {
    return 'e-' + Date.now() + '-' + Math.floor(Math.random() * 9999);
  }

  // CORE
  function createExpense({ name, qty, price, category }) {
    return {
      id: uid(),
      name: String(name).trim(),
      qty: Number(qty),
      price: Number(price),
      category: String(category),
      date: new Date().toISOString(),
    };
  }

  function addExpense(exp) {
    expenses.unshift(exp); // newest first
    render();
  }

  function removeExpense(id) {
    const idx = expenses.findIndex((e) => e.id === id);
    if (idx === -1) return;
    expenses.splice(idx, 1);
    render();
  }

  function getTodayTotal() {
    const now = new Date().toISOString();
    return expenses
      .filter((e) => isSameDay(e.date, now))
      .reduce((sum, e) => sum + e.qty * e.price, 0);
  }

  // RENDER
  function renderExpenses() {
    listEl.innerHTML = '';
    if (expenses.length === 0) {
      listEl.innerHTML = '<li class="small">No expenses yet</li>';
      return;
    }
    for (const e of expenses) {
      const li = document.createElement('li');
      li.className = 'expense-item';
      li.innerHTML = `
        <div class="expense-meta">
          <strong>${escapeHtml(e.name)}</strong>
          <span class="small">${escapeHtml(e.category)} • ${new Date(
        e.date
      ).toLocaleString()}</span>
        </div>
        <div class="expense-actions">
          <div class="small">${e.qty} x ${formatCurrency(
        e.price
      )} = <strong>${formatCurrency(e.qty * e.price)}</strong></div>
          <button data-id="${e.id}" class="del-btn" title="Delete">✕</button>
        </div>
      `;
      listEl.appendChild(li);
    }
  }

  function renderTotals() {
    const total = getTodayTotal();
    todayTotalEl.textContent = formatCurrency(total);
    expenseCountEl.textContent = expenses.length;
  }

  function render() {
    renderExpenses();
    renderTotals();
  }

  // VALIDATION & SANITIZE
  function validateForm(data) {
    const errors = [];
    if (!data.name || data.name.trim().length === 0)
      errors.push('Name required');
    if (!Number.isFinite(Number(data.qty)) || Number(data.qty) < 1)
      errors.push('Quantity must be at least 1');
    if (!Number.isFinite(Number(data.price)) || Number(data.price) < 0)
      errors.push('Price must be >= 0');
    return errors;
  }

  // SAFETY: basic escaping for rendered text
  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  // EVENTS
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    errorEl.textContent = '';
    const data = {
      name: nameInput.value,
      category: categoryInput.value,
      qty: Number(qtyInput.value),
      price: Number(priceInput.value),
    };
    const errors = validateForm(data);
    if (errors.length) {
      errorEl.textContent = errors.join(' • ');
      return;
    }
    const exp = createExpense(data);
    addExpense(exp);
    form.reset();
    qtyInput.value = 1;
    priceInput.value = 0;
    nameInput.focus();
  });

  // delegate delete
  listEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button.del-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;
    if (!confirm('Delete this expense?')) return;
    removeExpense(id);
  });

  // initial render
  render();
})();
