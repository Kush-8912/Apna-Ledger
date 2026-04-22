# Apna Ledger

A simple, fully functional **DOM-based Credit & Debit Tracker** built using **HTML, CSS, and Vanilla JavaScript**.  
It helps users add transactions, view totals (Credit/Debit/Balance), filter transactions, delete entries, clear all data, and visualize spending using charts. Data is stored in the browser using **LocalStorage**, so it remains saved even after refresh.

---

## Problem Statement

Many students and individuals want an easy way to track their daily credits and debits without using complex apps.  
**Apna Ledger** provides a clean and interactive solution to manage basic money flow and instantly see a financial summary.

---

## Features Implemented

- Add a transaction with:
  - Type (Credit / Debit)
  - Amount
  - Note
- Real-time **Summary**:
  - Total Credit
  - Total Debit
  - Balance (Credit - Debit)
- **Transaction List** (dynamic DOM rendering)
- Delete individual transactions
- Filter transactions by type (Credit / Debit)
- Show all transactions (clear filter)
- Clear all transactions with confirmation
- Data persistence using **LocalStorage**
- Charts:
  - Doughnut Chart (Credit vs Debit)
  - Bar Chart (Credit vs Debit)

---

## DOM Concepts Used

- `getElementById()` for selecting elements
- `createElement()` for creating `<li>`, `<div>`, `<button>` dynamically
- `appendChild()` to render new elements in the UI
- `innerText` / `textContent` to update summary values and list text
- Clearing UI and re-rendering using `list.innerHTML = ""`
- Conditional rendering:
  - Showing “No transactions to show.” when list is empty or filtered result is empty
- Dynamic DOM updates based on state changes (add/delete/filter/clear)

---

## Event Handling Used

- `addEventListener("click", ...)` for:
  - Add Transaction
  - Filter
  - Show All
  - Clear All
- `addEventListener("keydown", ...)` for Enter key support (Amount/Note input)
- **Event Delegation** on the transaction list for Delete button clicks

---

## JavaScript Logic & State Handling

- Application state stored in an array: `data`
- State is saved and loaded using:
  - `localStorage.setItem()`
  - `localStorage.getItem()`
- UI is updated through a single `render()` function after every state change
- Filtering handled using `currentFilter`

---

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, Responsive Layout)
- Vanilla JavaScript (ES6+)
- Browser API: LocalStorage
- Chart.js (CDN)

---

## Steps to Run the Project

1. Download or clone this repository
2. Make sure these files are present:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in any browser (Chrome recommended)
4. Start adding transactions

---

## Known Limitations

- No edit/update transaction feature (only add/delete)
- No date/time stored for each transaction
- Data is stored only in the browser (LocalStorage), not on a server

---

## Demo Video

Demo Video Link: **(https://drive.google.com/file/d/12WDYfA-20ojCJ8aYBWK44fLg1LauzbdV/view?usp=sharing)**

---

## Live Project Link

Live Link: **<a href="https://kush-8912.github.io/Apna-Ledger/" target="_blank">Apna Ledger</a>**

---

## Author

**Kushagra Aggarwal**  
Created with ❤️ using HTML, CSS and JavaScript.
