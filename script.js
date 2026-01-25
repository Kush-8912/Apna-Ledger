var STORAGE_KEY = "apna_ledger_data";
var data = [];
var currentFilter = "all";
var pieChart = null;
var barChart = null;
function loadData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    var parsed = [];
    if (raw) {
      parsed = JSON.parse(raw);
    }
    if (Array.isArray(parsed)) {
      data = parsed;
    } else {
      data = [];
    }
  } catch (e) {
    data = [];
  }
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function initFooter() {
  var footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML =
      "Created with ❤️ by <span>Kushagra</span> using HTML, CSS and JS";
  }
}
function initCharts() {
  if (!window.Chart) return;
  var pieEl = document.getElementById("pieChart");
  var barEl = document.getElementById("barChart");
  if (!pieEl || !barEl) return;
  pieChart = new Chart(pieEl, {
    type: "doughnut",
    data: {
      labels: ["Credit", "Debit"],
      datasets: [{ data: [0, 0], backgroundColor: ["#2d6cdf", "#ff4d4d"] }],
    },
    options: { plugins: { legend: { position: "bottom" } } },
  });
  barChart = new Chart(barEl, {
    type: "bar",
    data: {
      labels: ["Credit", "Debit"],
      datasets: [
        {
          label: "Amount",
          data: [0, 0],
          backgroundColor: ["#2d6cdf", "#ff4d4d"],
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } },
    },
  });
}
function updateCharts(creditTotal, debitTotal) {
  if (pieChart) {
    pieChart.data.datasets[0].data = [creditTotal, debitTotal];
    pieChart.update();
  }
  if (barChart) {
    barChart.data.datasets[0].data = [creditTotal, debitTotal];
    barChart.update();
  }
}
function addItem() {
  var typeEl = document.getElementById("type");
  var amountEl = document.getElementById("amount");
  var noteEl = document.getElementById("note");
  var type = "";
  var amountValue = "";
  var note = "";
  if (typeEl) type = typeEl.value;
  if (amountEl) amountValue = amountEl.value;
  if (noteEl) note = noteEl.value.trim();
  if (type === "" || amountValue === "" || note === "") {
    alert("Please fill all fields.");
    return;
  }
  var amount = Number(amountValue);
  if (!isFinite(amount) || amount <= 0) {
    alert("Enter a valid amount!");
    return;
  }
  data.push({ type: type, amount: amount, note: note });
  saveData();
  if (amountEl) amountEl.value = "";
  if (noteEl) noteEl.value = "";
  render();
}
function deleteItem(index) {
  if (index < 0 || index >= data.length) return;
  data.splice(index, 1);
  saveData();
  render();
}
function clearAll() {
  if (data.length === 0) return;
  var ok = confirm("Are you sure you want to clear all transactions?");
  if (!ok) return;
  data = [];
  saveData();
  render();
}
function applyFilter() {
  var filterEl = document.getElementById("filterType");
  if (filterEl) {
    currentFilter = filterEl.value;
  } else {
    currentFilter = "all";
  }
  render();
}
function clearFilter() {
  currentFilter = "all";
  render();
}
function render() {
  var creditTotal = 0;
  var debitTotal = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].type === "credit") creditTotal += data[i].amount;
    else debitTotal += data[i].amount;
  }
  var creditEl = document.getElementById("credit");
  var debitEl = document.getElementById("debit");
  var balanceEl = document.getElementById("balance");
  if (creditEl) creditEl.innerText = "₹" + creditTotal;
  if (debitEl) debitEl.innerText = "₹" + debitTotal;
  if (balanceEl) balanceEl.innerText = "₹" + (creditTotal - debitTotal);
  var list = document.getElementById("list");
  if (!list) return;
  list.innerHTML = "";
  var shown = 0;
  for (var j = 0; j < data.length; j++) {
    if (currentFilter !== "all" && data[j].type !== currentFilter) continue;
    shown++;
    var li = document.createElement("li");
    var left = document.createElement("div");
    left.textContent = data[j].type.toUpperCase() + " - ₹" + data[j].amount + " (" + data[j].note + ")";
    var delBtn = document.createElement("button");
    delBtn.className = "del";
    delBtn.textContent = "X";
    delBtn.setAttribute("data-index", String(j));
    li.appendChild(left);
    li.appendChild(delBtn);
    list.appendChild(li);
  }
  if (shown === 0) {
    var emptyLi = document.createElement("li");
    emptyLi.textContent = "No transactions to show.";
    list.appendChild(emptyLi);
  }
  updateCharts(creditTotal, debitTotal);
}
function setupEvents() {
  var addBtn = document.getElementById("addBtn");
  var filterBtn = document.getElementById("filterBtn");
  var showAllBtn = document.getElementById("showAllBtn");
  var clearAllBtn = document.getElementById("clearAllBtn");
  if (addBtn) addBtn.addEventListener("click", addItem);
  if (filterBtn) filterBtn.addEventListener("click", applyFilter);
  if (showAllBtn) showAllBtn.addEventListener("click", clearFilter);
  if (clearAllBtn) clearAllBtn.addEventListener("click", clearAll);
  var list = document.getElementById("list");
  if (list) {
    list.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.classList && target.classList.contains("del")) {
        var idx = Number(target.getAttribute("data-index"));
        if (isFinite(idx)) deleteItem(idx);
      }
    });
  }
  var amountEl = document.getElementById("amount");
  var noteEl = document.getElementById("note");
  if (amountEl) {
    amountEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addItem();
    });
  }
  if (noteEl) {
    noteEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addItem();
    });
  }
}
initFooter();
loadData();
initCharts();
setupEvents();
render();