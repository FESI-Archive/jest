const { calculateTotal } = require('./calculator');

test('기본 계산 - 1000원 상품 2개의 가격은 2000원이 나오는지 확인', () => {
  expect(calculateTotal(1000, 2)).toBe(2000);
});

test('할인 적용 - 1000원 상품 2개를 10% 할인하면 1800원이 나오는지 확인', () => {
  expect(calculateTotal(1000, 2, 0.1)).toBe(1800);
});
