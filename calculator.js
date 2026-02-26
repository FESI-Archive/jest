function calculateTotal(price, quantity, discount = 0) {
  return price * quantity * (1 - discount);
}

module.exports = { calculateTotal };
