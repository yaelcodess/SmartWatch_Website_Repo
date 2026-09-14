// ===== Read plan info from the URL (?plan=Pro&price=2199) =====
const params = new URLSearchParams(window.location.search);
const planName = params.get('plan') || 'Pro';
const unitPrice = Number(params.get('price')) || 2199;

const SHIPPING_FEE = 150;
let quantity = 1;

// ===== Format numbers as 1,234 =====
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

// ===== Elements =====
const planNameEl = document.getElementById('planName');
const unitPriceEl = document.getElementById('unitPrice');
const qtyValueEl = document.getElementById('qtyValue');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');

// ===== Set initial plan info =====
planNameEl.textContent = planName;
unitPriceEl.textContent = formatNumber(unitPrice);
shippingEl.textContent = formatNumber(SHIPPING_FEE);

// ===== Recalculate totals whenever quantity changes =====
function updateTotals() {
  const subtotal = unitPrice * quantity;
  const total = subtotal + SHIPPING_FEE;

  qtyValueEl.textContent = quantity;
  subtotalEl.textContent = formatNumber(subtotal);
  totalEl.textContent = formatNumber(total);
}

document.getElementById('qtyPlus').addEventListener('click', () => {
  quantity++;
  updateTotals();
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    updateTotals();
  }
});

updateTotals();

// ===== Handle order submission =====
const form = document.getElementById('checkoutForm');
const confirmScreen = document.getElementById('confirmScreen');
const confirmSummary = document.getElementById('confirmSummary');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const fullName = data.get('fullName');
  const address = data.get('address');
  const city = data.get('city');
  const payment = data.get('payment');
  const total = totalEl.textContent;

  confirmSummary.textContent =
    `Thanks, ${fullName}! Your PULSERA VITA ${planName} (x${quantity}) worth ₱${total} ` +
    `will be delivered to ${address}, ${city}. Payment method: ${payment}.`;

  confirmScreen.classList.add('show');
});
