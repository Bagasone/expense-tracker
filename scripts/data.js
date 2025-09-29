// User name
const userName = 'Bagas Wanson';

// Log in status
let isLoggedIn = true;

// Daily expense
const dailyExpense = [
  {
    id: 1,
    name: 'Creammy Latte Coffee',
    price: 15000,
    quantity: 1,
    time: '2025-09-28T12:30:00',
  },
  {
    id: 2,
    name: 'Fried Chicken',
    price: 25000,
    quantity: 1,
    time: '2025-09-28T12:30:00',
  },
  {
    id: 3,
    name: 'Green Tea',
    price: 20000,
    quantity: 1,
    time: '2025-09-28T18:30:00',
  },
  {
    id: 4,
    name: 'Ramen',
    price: 35000,
    quantity: 1,
    time: '2025-09-28T18:30:00',
  },
];

// Total expense
const totalExpend = dailyExpense.reduce((acc, currVal) => acc + currVal.price * currVal.quantity, (acc = 0));

// Print data in the structured way
console.log('User:', userName);
console.log('Is Logged In:', isLoggedIn);
console.log('Expenses:', dailyExpense);
console.log('Total expenses today:', totalExpend);
