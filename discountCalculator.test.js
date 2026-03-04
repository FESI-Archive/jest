const { calculatePrice } = require('./discountCalculator');

describe('할인 계산기', () => {
  describe('가격 구간별 할인 적용', () => {
    test.each([
      ['5만원 미만이면 할인 없음', 30000, 30000],
      ['5만원 이상이면 5% 할인', 50000, 47500],
      ['10만원 이상이면 10% 할인', 100000, 90000],
      ['20만원 이상이면 20% 할인', 200000, 160000],
    ])('%s', (_, price, expected) => {
      expect(calculatePrice(price)).toBe(expected);
    });
  });

  describe('회원 등급 추가 할인', () => {
    test.each([
      ['regular(추가 할인 없음)', 'regular', 90000],
      ['silver(2% 추가 할인)', 'silver', 88200],
      ['gold(5% 추가 할인)', 'gold', 85500],
      ['vip(10% 추가 할인)', 'vip', 81000],
    ])('%s', (_, membership, expected) => {
      expect(calculatePrice(100000, membership)).toBe(expected);
    });
  });

  describe('쿠폰 할인', () => {
    test.each([
      ['정액 쿠폰 적용', { type: 'fixed', amount: 5000 }, 85000],
      ['비율 쿠폰 적용', { type: 'percentage', amount: 10 }, 81000],
    ])('%s', (_, coupon, expected) => {
      expect(calculatePrice(100000, 'regular', coupon)).toBe(expected);
    });
  });

  describe('최소 가격 제한', () => {
    test('최종 가격은 원가의 50% 이하로 내려가지 않음', () => {
      expect(
        calculatePrice(100000, 'vip', { type: 'percentage', amount: 50 }),
      ).toBe(50000);
    });
  });
});
