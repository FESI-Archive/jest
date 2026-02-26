const { calculateTotal } = require('./calculator');

test('기본 계산 - 1000원 상품 2개의 가격은 2000원이 나오는지 확인', () => {
  expect(calculateTotal(1000, 2)).toBe(2000);
});

test('기본 계산 - 2000원 상품 4개의 가격은 8000원이 나오는지 확인', () => {
  expect(calculateTotal(2000, 4)).toBe(8000);
});

test('할인 적용 - 1000원 상품 2개를 10% 할인하면 1800원이 나오는지 확인', () => {
  expect(calculateTotal(1000, 2, 0.1)).toBe(1800);
});

test('할인율 적용 - 5000원 상품 3개를 50% 할인하면 7500원이 나오는지 확인', () => {
  expect(calculateTotal(5000, 3, 0.5)).toBe(7500);
});

test('할인율이 0인 경우 - 3000원 상품 2개를 0% 할인하면 6000원이 나오는지 확인', () => {
  expect(calculateTotal(3000, 2, 0)).toBe(6000);
});
