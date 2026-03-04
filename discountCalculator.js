// 할인 계산기
// 적용 순서: 가격 구간 할인 → 멤버십 할인 → 쿠폰 할인 → 최소 가격 하한(원가 * MIN_PRICE_RATIO)

const PRICE_TIERS = [
  { minPrice: 200000, rate: 0.8 }, // 20만원 이상 20% 할인
  { minPrice: 100000, rate: 0.9 }, // 10만원 이상 10% 할인
  { minPrice: 50000, rate: 0.95 }, // 5만원 이상 5% 할인
].sort((a, b) => b.minPrice - a.minPrice); // 높은 금액 구간부터 적용

const MEMBERSHIP_RATES = {
  regular: 1,
  silver: 0.98, // 2% 할인
  gold: 0.95, // 5% 할인
  vip: 0.9, // 10% 할인
};

const MIN_PRICE_RATIO = 0.5; // 원가의 50% 이하로 불가

const COUPON_TYPE = {
  FIXED: 'fixed',
  PERCENTAGE: 'percentage',
};

function calculatePrice(originalPrice, membership = 'regular', coupon = null) {
  let price = originalPrice;

  // 1. 가격 구간 할인
  price = applyPriceDiscount(price, PRICE_TIERS);

  // 2. 멤버십 할인
  price = applyMembershipDiscount(price, membership, MEMBERSHIP_RATES);

  // 3. 쿠폰 할인 적용
  price = applyCouponDiscount(price, coupon);

  // 4. 최소 가격 제한 적용 (원가의 50% 이하로 내려가지 않도록)
  return applyMinimumPriceLimit(price, originalPrice, MIN_PRICE_RATIO);
}

function applyPriceDiscount(price, tiers) {
  const tier = tiers.find((t) => price >= t.minPrice);
  return tier ? price * tier.rate : price;
}

function applyMembershipDiscount(price, membership, rates) {
  const rate = rates[membership] ?? rates.regular;
  return price * rate;
}

function applyCouponDiscount(price, coupon) {
  if (!coupon) return price;

  if (coupon.type === COUPON_TYPE.PERCENTAGE) {
    return price * (1 - coupon.amount / 100);
  }

  if (coupon.type === COUPON_TYPE.FIXED) {
    return price - coupon.amount;
  }

  return price;
}

function applyMinimumPriceLimit(discountedPrice, originalPrice, minRatio) {
  return Math.max(discountedPrice, originalPrice * minRatio);
}

module.exports = {
  calculatePrice,
};
