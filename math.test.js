const { calculator } = require('./math');

test('calculator.add 함수 모킹 테스트', () => {
  // 여기에 코드 작성
  // 1. calculator.add를 jest.fn()으로 모킹하세요
  calculator.add = jest.fn();
  // 2. 모킹된 함수가 호출되었는지 검증하세요
  calculator.add(100, 200);
  expect(calculator.add).toHaveBeenCalled();
  // 3. 호출 인자를 검증하세요
  expect(calculator.add).toHaveBeenCalledWith(100, 200);
});

test('calculator.subtract 함수 모킹 테스트', () => {
  // 여기에 코드 작성
  // 1. calculator.subtract가 1을 반환하도록 jest.fn()으로 모킹하세요
  calculator.subtract = jest.fn().mockReturnValue(1);
  // 2. 모킹된 함수를 호출하고, 호출 여부를 검증하세요.
  //    -> subtract 함수에는 5와 3을 인자로 전달하세요.
  calculator.subtract(5, 3);
  expect(calculator.subtract).toHaveBeenCalled();
  // 3. calculator.subtract 함수가 1을 반환하는지 검증하세요.
  //    -> 5 - 3은 2지만 모킹으로 인해 1이 반환됩니다.
  expect(calculator.subtract(5, 3)).toBe(1);
});

test('calculator.multiply 함수 모킹 테스트', () => {
  // 여기에 코드 작성
  // 1. calculator.multiply를 spyOn으로 모킹하세요
  const multiplySpy = jest.spyOn(calculator, 'multiply');
  // 2. 모킹된 함수가 호출되었는지 검증하세요
  //    -> 이때 첫 번째 인자는 2, 두 번째 인자는 3을 넣어주세요.
  multiplySpy(2, 3);
  expect(multiplySpy).toHaveBeenCalled();
  // 3. 호출 결과가 올바르게 계산되는지 검증하세요 (2 * 3 = 6)
  expect(multiplySpy(2, 3)).toBe(6);
});
