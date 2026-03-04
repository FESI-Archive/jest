const { calculatePrice } = require('./discountCalculator');

describe('할인 계산기 테스트', () => {
  describe('가격별 할인율 적용 테스트', () => {
    test('구매 가격이 5만원 미만 구매 시 할인이 적용되지 않는지 테스트', () => {
      const price = 30000; // 3만원
      const result = calculatePrice(price);

      expect(result).toBe(30000); // 할인 적용 X
    });

    test('5만원 이상 구매 시 5% 할인 적용', () => {
      const price = 50000;
      const totalPrice = calculatePrice(price);
      expect(totalPrice).toBe(47500);
    });

    test('10만원 이상 구매 시 10% 할인 적용', () => {
      const price = 100000;
      const totalPrice = calculatePrice(price);
      expect(totalPrice).toBe(90000);
    });

    test('20만원 이상 구매 시 20% 할인 적용', () => {
      const price = 200000;
      const totalPrice = calculatePrice(price);
      expect(totalPrice).toBe(160000);
    });
  });

  describe('회원 등급에 따른 추가 할인', () => {
    test('일반 회원 - 추가 할인 없음', () => {
      const price = 100000;
      const membership = 'regular';
      const finalPrice = calculatePrice(price, membership);
      expect(finalPrice).toBe(90000);
    });

    test('실버 회원 - 2% 추가 할인', () => {
      const price = 100000;
      const membership = 'silver';
      const finalPrice = calculatePrice(price, membership);
      expect(finalPrice).toBe(88200);
    });

    test('골드 회원 - 5% 추가 할인', () => {
      const price = 100000;
      const membership = 'gold';
      const finalPrice = calculatePrice(price, membership);
      expect(finalPrice).toBe(85500);
    });

    test('VIP 회원 - 10% 추가 할인', () => {
      const price = 100000;
      const membership = 'vip';
      const finalPrice = calculatePrice(price, membership);
      expect(finalPrice).toBe(81000);
    });
  });

  describe('쿠폰 할인 테스트', () => {
    test('정액 쿠폰 적용 시, 쿠폰에 따라 할인이 적용', () => {
      const price = 100000;
      const membership = 'regular';
      const coupon = {
        type: 'fixed',
        amount: 5000,
      };

      const finalPrice = calculatePrice(price, membership, coupon);
      expect(finalPrice).toBe(85000);
    });

    test('비율 쿠폰 적용 시 쿠폰에 따라 할인이 적용되어야 함', () => {
      const price = 100000;
      const membership = 'regular';
      const coupon = {
        type: 'percentage',
        amount: 10,
      };

      const finalPrice = calculatePrice(price, membership, coupon);
      expect(finalPrice).toBe(81000);
    });
  });

  describe('최대 할인(50%) 제한 테스트', () => {
    test('최대 할인율이 50%를 초과하지 않도록 테스트', () => {
      const price = 100000; // 10% 할인
      const membership = 'vip'; // 10% 추가 할인
      const coupon = {
        type: 'percentage',
        amount: 50, // 50% 추가 할인
      };

      const finalPrice = calculatePrice(price, membership, coupon);
      expect(finalPrice).toBe(50000); // 최대 할인 적용 후 50,000
    });
  });
});
