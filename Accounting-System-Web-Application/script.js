function checkSessionAndStart() {
  // Direct initialization - no auth required
  loadData();
  renderAccounts();
  renderEntries();
  document.getElementById("currentDateSpan").innerText = new Date()
    .toISOString()
    .split("T")[0];
}

// ------------- ACCOUNTING FUNCTIONS (unchanged) --------------
const STANDARD_ACCOUNTS = [{
    code: "101001",
    name: "Fixed Assets - Equipment",
    type: "Asset"
  },
  {
    code: "102001",
    name: "Bank Account - CIB",
    type: "Asset"
  },
  {
    code: "102002",
    name: "Petty Cash - Main",
    type: "Asset"
  },
  {
    code: "103001",
    name: "Accounts Receivable",
    type: "Asset"
  },
  {
    code: "105001",
    name: "Inventory - Raw Materials",
    type: "Asset"
  },
  {
    code: "201001",
    name: "Paid-in Capital",
    type: "Equity"
  },
  {
    code: "202001",
    name: "Retained Earnings",
    type: "Equity"
  },
  {
    code: "301001",
    name: "Accounts Payable",
    type: "Liability"
  },
  {
    code: "401001",
    name: "Sales Revenue",
    type: "Revenue"
  },
  {
    code: "501001",
    name: "Salaries & Wages",
    type: "Expense"
  },
  {
    code: "502001",
    name: "Office Expenses",
    type: "Expense"
  },
];
let accounts = [],
  entries = [],
  editIndex = null,
  currentFromDate = "2026-01-01",
  currentToDate = "2026-12-31",
  currentFilteredEntries = [];

function loadData() {
  const storedAcc = localStorage.getItem("datech_accounts_v1");
  const storedEnt = localStorage.getItem("datech_entries_v1");
  if (storedAcc) accounts = JSON.parse(storedAcc);
  else accounts = [...STANDARD_ACCOUNTS];
  if (storedEnt) entries = JSON.parse(storedEnt);
  else
    entries = [{
        date: "2026-01-10",
        account: "Petty Cash - Main",
        type: "Debit",
        amount: 150000.0,
      },
      {
        date: "2026-01-10",
        account: "Paid-in Capital",
        type: "Credit",
        amount: 150000.0,
      },
      {
        date: "2026-02-01",
        account: "Inventory - Raw Materials",
        type: "Debit",
        amount: 60000.0,
      },
      {
        date: "2026-02-01",
        account: "Bank Account - CIB",
        type: "Credit",
        amount: 60000.0,
      },
      {
        date: "2026-03-15",
        account: "Salaries & Wages",
        type: "Debit",
        amount: 12000.0,
      },
      {
        date: "2026-03-15",
        account: "Petty Cash - Main",
        type: "Credit",
        amount: 12000.0,
      },
      {
        date: "2026-04-01",
        account: "Sales Revenue",
        type: "Credit",
        amount: 95000.0,
      },
      {
        date: "2026-04-01",
        account: "Accounts Receivable",
        type: "Debit",
        amount: 95000.0,
      },
      {
        date: "2026-04-17",
        account: "Petty Cash - Main",
        type: "Credit",
        amount: 5000.0,
      },
      {
        date: "2026-04-17",
        account: "Office Expenses",
        type: "Debit",
        amount: 5000.0,
      },
    ];
  updateFilteredEntries();
}

function updateFilteredEntries() {
  currentFilteredEntries = entries.filter(
    (e) => e.date >= currentFromDate && e.date <= currentToDate,
  );
}

function saveAccounts() {
  localStorage.setItem("datech_accounts_v1", JSON.stringify(accounts));
  renderAccounts();
}

function saveEntries() {
  localStorage.setItem("datech_entries_v1", JSON.stringify(entries));
  updateFilteredEntries();
  renderEntries();
}
window.filterAccounts = function () {
  const term = document
    .getElementById("accountSearch")
    .value.toLowerCase();
  const filtered = accounts.filter(
    (a) =>
    a.name.toLowerCase().includes(term) ||
    (a.code || "").toLowerCase().includes(term),
  );
  renderAccountsFiltered(filtered);
};

function renderAccountsFiltered(filtered) {
  const tbody = document.getElementById("accountsTableBody");
  tbody.innerHTML = "";
  filtered.forEach((acc, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${acc.code || "—"}</td><td>${acc.name}</td><td>${acc.type}</td><td><button class="action-btn" onclick="deleteAccount(${accounts.findIndex((a) => a.name === acc.name)})"><i class="fas fa-trash-alt"></i></button></td>`;
    tbody.appendChild(tr);
  });
}

function renderAccounts() {
  const tbody = document.getElementById("accountsTableBody");
  const select = document.getElementById("entryAccount");
  tbody.innerHTML = "";
  select.innerHTML = "";
  accounts.forEach((acc) => {
    tbody.innerHTML += `<tr><td>${acc.code || "—"}</td><td>${acc.name}</td><td>${acc.type}</td><td><button class="action-btn" onclick="deleteAccount(${accounts.indexOf(acc)})"><i class="fas fa-trash-alt"></i></button></td></tr>`;
    const opt = document.createElement("option");
    opt.value = acc.name;
    opt.textContent = `${acc.code || ""} ${acc.name}`;
    select.appendChild(opt);
  });
}

function renderEntries() {
  const tbody = document.getElementById("entriesTable");
  tbody.innerHTML = "";
  entries.forEach((e, i) => {
    tbody.innerHTML += `<tr><td>${e.date}</td><td>${e.account}</td><td>${e.type}</td><td>${e.amount.toFixed(2)}</td><td><button class="action-btn" onclick="editEntry(${i})"><i class="fas fa-edit"></i></button><button class="action-btn" onclick="deleteEntry(${i})"><i class="fas fa-trash"></i></button></td></tr>`;
  });
}
window.addAccount = function () {
  const name = document.getElementById("accName").value.trim();
  if (!name) return alert("Enter name");
  const code = prompt("Optional code");
  accounts.push({
    code: code || "",
    name,
    type: document.getElementById("accType").value,
  });
  saveAccounts();
  document.getElementById("accName").value = "";
};
window.deleteAccount = function (idx) {
  if (confirm("Delete?")) {
    accounts.splice(idx, 1);
    saveAccounts();
  }
};
window.addEntry = function () {
  const date = document.getElementById("date").value;
  const acc = document.getElementById("entryAccount").value;
  const type = document.getElementById("entryType").value;
  const amt = parseFloat(document.getElementById("amount").value);
  if (!date || !acc || isNaN(amt)) return alert("Fill fields");
  if (editIndex !== null) {
    entries[editIndex] = {
      date,
      account: acc,
      type,
      amount: amt
    };
    editIndex = null;
  } else entries.push({
    date,
    account: acc,
    type,
    amount: amt
  });
  saveEntries();
  clearEntryForm();
};
window.editEntry = function (i) {
  const e = entries[i];
  document.getElementById("date").value = e.date;
  document.getElementById("entryAccount").value = e.account;
  document.getElementById("entryType").value = e.type;
  document.getElementById("amount").value = e.amount;
  editIndex = i;
};
window.deleteEntry = function (i) {
  if (confirm("Delete?")) {
    entries.splice(i, 1);
    saveEntries();
  }
};
window.clearEntryForm = function () {
  document.getElementById("date").valueAsDate = new Date();
  document.getElementById("amount").value = "";
  editIndex = null;
};
window.applyDateFilter = function () {
  currentFromDate = document.getElementById("reportFromDate").value;
  currentToDate = document.getElementById("reportToDate").value;
  updateFilteredEntries();
  alert(`Filter ${currentFromDate} → ${currentToDate}`);
  if (document.getElementById("reportOutput").innerHTML.includes("Trial"))
    generateTrialBalance();
  else if (
    document.getElementById("reportOutput").innerHTML.includes("Income")
  )
    generateIncome();
  else if (
    document.getElementById("reportOutput").innerHTML.includes("Balance")
  )
    generateBalance();
};

function getAccountTypeByName(name) {
  const a = accounts.find((a) => a.name === name);
  return a ? a.type : null;
}
window.generateTrialBalance = function () {
  let map = new Map();
  currentFilteredEntries.forEach((e) => {
    let rec = map.get(e.account) || {
      dr: 0,
      cr: 0
    };
    if (e.type === "Debit") rec.dr += e.amount;
    else rec.cr += e.amount;
    map.set(e.account, rec);
  });
  let html = `<h3><i class="fas fa-balance-scale"></i> Trial Balance</h3>
                    <p style="font-size:0.9rem; color:#666; margin-bottom:15px;">Period: ${currentFromDate} to ${currentToDate}</p>
                    <table><thead><tr><th>Account</th><th>Debit</th><th>Credit</th></tr></thead><tbody>`;
  let tDr = 0,
    tCr = 0;
  for (let [name, val] of map.entries()) {
    html += `<tr><td>${name}</td><td>${val.dr > 0 ? val.dr.toFixed(2) : "-"}</td><td>${val.cr > 0 ? val.cr.toFixed(2) : "-"}</td></tr>`;
    tDr += val.dr;
    tCr += val.cr;
  }
  html += `<tr style="font-weight:bold; background:#f0f7ff;"><td>Total</td><td>${tDr.toFixed(2)}</td><td>${tCr.toFixed(2)}</td></tr></tbody></table>
                 <div style="margin-top:15px; text-align:center;">
                    <span class="badge ${Math.abs(tDr - tCr) < 0.01 ? "status-approved" : "btn-danger"}">
                        ${Math.abs(tDr - tCr) < 0.01 ? "✅ Balanced" : "⚠️ Unbalanced"}
                    </span>
                 </div>`;
  document.getElementById("reportOutput").innerHTML = html;
};

window.generateIncome = function () {
  let rev = 0,
    exp = 0;
  currentFilteredEntries.forEach((e) => {
    let t = getAccountTypeByName(e.account);
    if (t === "Revenue")
      rev += e.type === "Credit" ? e.amount : -e.amount;
    if (t === "Expense") exp += e.type === "Debit" ? e.amount : -e.amount;
  });
  let net = rev - exp;
  document.getElementById("reportOutput").innerHTML = `
            <div style="max-width:500px; margin:auto; border:1px solid #e1e8ed; border-radius:20px; padding:25px; background:white;">
                <h3 style="text-align:center; margin-bottom:20px;">Income Statement</h3>
                <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f0f4f7;">
                    <span>Total Revenue</span>
                    <span style="color:#27ae60; font-weight:600;">+ ${rev.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f0f4f7;">
                    <span>Total Expenses</span>
                    <span style="color:#c0392b; font-weight:600;">- ${exp.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:15px 0; font-size:1.2rem; font-weight:700;">
                    <span>Net ${net >= 0 ? "Profit" : "Loss"}</span>
                    <span style="color:${net >= 0 ? "#27ae60" : "#c0392b"};">${net.toFixed(2)}</span>
                </div>
            </div>`;
};

window.generateBalance = function () {
  let assets = 0,
    liab = 0,
    eq = 0,
    rev = 0,
    exp = 0;
  currentFilteredEntries.forEach((e) => {
    let t = getAccountTypeByName(e.account);
    let sign = e.type === "Debit" ? 1 : -1;
    let val = e.amount * sign;

    if (t === "Asset") assets += val;
    else if (t === "Liability") liab -= val;
    else if (t === "Equity") eq -= val;
    else if (t === "Revenue")
      rev -= val; // Credit balance
    else if (t === "Expense") exp += val; // Debit balance
  });

  let netProfit = rev - exp;
  let totalEquity = eq + netProfit;
  let totalLiabEquity = liab + totalEquity;

  document.getElementById("reportOutput").innerHTML = `
            <div style="background:#fff; border-radius:24px; border:1px solid #e1e8ed; padding:30px;">
                <h3 style="text-align:center; margin-bottom:25px;"><i class="fas fa-file-invoice-dollar"></i> Balance Sheet</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:40px;">
                    <div>
                        <h4 style="color:#1a3a4f; border-bottom:2px solid #2ecc71; padding-bottom:8px; margin-bottom:15px;">ASSETS</h4>
                        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:1.1rem; background:#f8fbf9; padding:12px; border-radius:12px;">
                            <span>Total Assets</span>
                            <span>${assets.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <h4 style="color:#1a3a4f; border-bottom:2px solid #3498db; padding-bottom:8px; margin-bottom:15px;">LIABILITIES & EQUITY</h4>
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>Liabilities</span>
                            <span>${liab.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>Equity (Capital)</span>
                            <span>${eq.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:12px; color:#27ae60; font-style:italic;">
                            <span>Net Profit (Current Period)</span>
                            <span>+ ${netProfit.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:1.1rem; background:#f0f7ff; padding:12px; border-radius:12px; border-top:1px solid #d0e0f0;">
                            <span>Total Liab + Equity</span>
                            <span>${totalLiabEquity.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div style="margin-top:30px; text-align:center;">
                    <div style="display:inline-block; padding:10px 30px; border-radius:50px; font-weight:700; font-size:1rem; 
                        ${Math.abs(assets - totalLiabEquity) < 0.01 ? "background:#d4edda; color:#155724;" : "background:#f8d7da; color:#721c24;"}">
                        ${Math.abs(assets - totalLiabEquity) < 0.01 ? '<i class="fas fa-check-double"></i> EQUATION BALANCED: Assets = Liabilities + Equity' : '<i class="fas fa-exclamation-triangle"></i> EQUATION UNBALANCED'}
                    </div>
                </div>
            </div>`;
};
window.exportToExcel = function () {
  const wsData = [
    ["Date", "Account", "Type", "Amount", "Range"]
  ];
  currentFilteredEntries.forEach((e) => {
    wsData.push([
      e.date,
      e.account,
      e.type,
      e.amount,
      `${currentFromDate} to ${currentToDate}`,
    ]);
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(
    wb,
    `Report_${currentFromDate}_to_${currentToDate}.xlsx`,
  );
};

function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("visible"));
  document.getElementById(sectionId).classList.add("visible");
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  const activeBtn = document.querySelector(
    `.nav-btn[data-section="${sectionId}"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");
}
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => showSection(btn.dataset.section));
});

checkSessionAndStart();
loadData();
renderAccounts();
renderEntries();
document.getElementById("date").valueAsDate = new Date();
document.getElementById("reportFromDate").value = currentFromDate;
document.getElementById("reportToDate").value = currentToDate;
window.showSection = showSection;