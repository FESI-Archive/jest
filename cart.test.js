const { filterCartItems } = require('./cart');

const cart = [
  { name: '노트북', price: 1000 },
  { name: '마우스', price: 50 },
  { name: '키보드', price: 80 },
];

test('장바구니에 노트북이 있는지 확인', () => {
  // filterCartItems(cart, "노트북") -> [{ name: "노트북", price: 1000 }]
  expect(filterCartItems(cart, '노트북')).toContain(cart[0]);
});

test('장바구니에 없는 아이템을 찾을 수 없는지 확인', () => {
  expect(filterCartItems(cart, '휴대폰')).not.toContain(cart[0]);
});

test('장바구니에 마우스의 정확한 아이템 객체를 반환하는지 확인', () => {
  expect(filterCartItems(cart, '마우스')).toEqual([
    { name: '마우스', price: 50 },
  ]);
});
