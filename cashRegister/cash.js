const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const myForm = document.getElementById('form');

// Default price and cash in drawer
let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// Currency values
const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// Helper: rounding to avoid floating-point issues
const round = (num) => Math.round(num * 100) / 100;

// Update display drawer UI
function updateDrawerDisplay() {
  for (let [unit, amount] of cid) {
    const element = document.getElementById(unit.replace(' ', '_'));
    if (element) {
      const displayName = unit.toLowerCase();
      element.innerText = `${displayName.charAt(0).toUpperCase() + displayName.slice(1)}: $${amount.toFixed(2)}`;
    }
  }
}

myForm.addEventListener('submit', (e) => {
  e.preventDefault();

  price = round(price);
  const cashProvided = round(Number(cash.value));

  if (isNaN(cashProvided)) {
    alert('Please enter a valid number for cash.');
    return;
  }

  if (cashProvided < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  let changeNeeded = round(cashProvided - price);
  const totalCID = round(cid.reduce((sum, curr) => sum + curr[1], 0));

  if (round(changeNeeded) === 0) {
    changeDue.classList.remove('hide');
    changeDue.innerText = 'No change due - customer paid with exact cash';
    return;
  }

  const originalCID = JSON.parse(JSON.stringify(cid));
  let drawer = JSON.parse(JSON.stringify(cid)).reverse();
  let change = [];
  let remaining = changeNeeded;

  for (let [unit, amountInDrawer] of drawer) {
    const unitValue = currencyUnit[unit];
    let amountUsed = 0;

    while (remaining >= unitValue && amountInDrawer >= unitValue) {
      remaining = round(remaining - unitValue);
      amountInDrawer = round(amountInDrawer - unitValue);
      amountUsed = round(amountUsed + unitValue);
    }

    if (amountUsed > 0) {
      change.push([unit, amountUsed]);
    }
  }

  const changeTotal = round(change.reduce((sum, curr) => sum + curr[1], 0));
  changeDue.classList.remove('hide');

  if (changeTotal < changeNeeded) {
    changeDue.innerText = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  if (changeTotal === totalCID && remaining === 0) {
    let closedText = 'Status: CLOSED\n';
    const reversedOriginal = [...originalCID].reverse();

    for (let [unit, amount] of reversedOriginal) {
      closedText += `${unit}: $${amount.toFixed(2)}\n`;
    }

    changeDue.innerText = closedText.trim();
    cid = cid.map(([unit]) => [unit, 0]);

  } else {
    let openText = 'Status: OPEN\n';
    for (let [unit, amountUsed] of change) {
      openText += `${unit}: $${amountUsed.toFixed(2)}\n`;
    }

    changeDue.innerText = openText.trim();

    change.forEach(([unit, amountUsed]) => {
      const drawerUnit = cid.find(([cidUnit]) => cidUnit === unit);
      if (drawerUnit) {
        drawerUnit[1] = round(drawerUnit[1] - amountUsed);
      }
    });
  }

  cash.value = ''; // Optional UX improvement
  updateDrawerDisplay();
});

updateDrawerDisplay(); // Initialize display
