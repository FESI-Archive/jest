// 1. Jest Matcher
// expect() 함수 뒤에 체이닝되어 예상 결과를 검증하는 함수

// toBe: 엄격한 동등 비교 (===)
// 원시 타입(숫자, 문자열, boolean 등)이 특정 값과 정확히 일치하는지 비교
test('두 숫자가 같아야 함', () => {
  expect(2 + 2).toBe(4);
});

test('두 문자열이 같아야 함', () => {
  expect('hello').toBe('hello');
});

// toEqual - 깊은 동등 비교
// 객체, 배열의 내용이 같으면 일치한다고 판단
test('두 객체의 내용이 같아야 함', () => {
  const data = { one: 1, two: 2 };
  expect(data).toEqual({ one: 1, two: 2 });
});

test('두 배열의 내용이 같아야 함', () => {
  const arr = [1, 2, 3];
  expect(arr).toEqual([1, 2, 3]);
});

// toStrictEqual - 매우 엄격한 동등 비교
// toEqual보다 더 엄격하게 비교한다. undefined 속성과 배열의 빈 슬롯도 비교
test('두 객체가 같은지 판단', () => {
  expect({ a: undefined, b: 2 }).toEqual({ b: 2 }); // a: undefined인 경우 a의 키가 없어도 같다고 판단
  expect([, 1, 2]).toEqual([undefined, 1, 2]); // 둘 다 같다고 판단
});

test('두 객체가 엄격히 같아야 함', () => {
  expect({ a: undefined, b: 2 }).toStrictEqual({ a: undefined, b: 2 }); // toStrictEqual은 undefined를 고려하여 더 엄격하게 판단한다.
  expect([, 1, 2]).not.toStrictEqual([undefined, 1, 2]); // 빈 슬롯과 undefined는 다름
});

// toStrictEqual - 깊은 비교 + 타입 / undefined / 프로토타입까지 엄격 비교
class Order {
  constructor(id) {
    this.id = id;
  }
}
test('toStrictEqual의 엄격함', () => {
  // 1. undefined 체크
  expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 });

  // 2. 클래스 인스턴스 체크
  // 구조는 같지만, 하나는 일반 객체이고 하나는 Order 인스턴스이므로 실패함
  expect(new Order(1)).not.toStrictEqual({ id: 1 });
});

// 2. 진리값 테스트 Matcher
// toBeTruthy / toBeFalsy - 자바스크립트에서 truthy / falsy 값에 대한 테스트를 수행
test('truthy 값 확인', () => {
  expect(true).toBeTruthy();
  expect(1).toBeTruthy();
  expect('hello').toBeTruthy();
  expect({}).toBeTruthy();
  expect([]).toBeTruthy();
});

test('falsy 값 확인', () => {
  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(NaN).toBeFalsy();
});

// toBeNull / toBeUndefined / toBeDefined - 값이 null인지, undefined인지, 정의되어 있는지 확인하는 매쳐
test('null 테스트', () => {
  expect(null).toBeNull(); // 성공
  expect(undefined).toBeNull(); // 실패
});

test('undefined 테스트', () => {
  let value;
  expect(value).toBeUndefined(); // 성공
  expect(null).toBeUndefined(); // 실패
});

test('정의된 값 테스트', () => {
  const value = 0;
  let undefinedValue;
  expect(value).toBeDefined(); // 성공
  expect(undefinedValue).toBeDefined(); // 실패
});

// 3. 숫자 비교 Matcher
// toBeGreaterThan / toBeGreaterThanOrEqual - 값이 특정 숫자보다 큰지 또는 크거나 같은지 확인
test('숫자 크기 비교', () => {
  expect(10).toBeGreaterThan(5); // 성공
  expect(10).toBeGreaterThan(10); // 실패

  expect(10).toBeGreaterThanOrEqual(10); // 성공
  expect(10).toBeGreaterThanOrEqual(5); // 성공
  expect(10).toBeGreaterThanOrEqual(15); // 실패
});

// toBeLessThan / toBeLessThanOrEqual - 값이 특정 숫자보다 작은지 또는 작거나 같은지 확인
test('숫자 작은 값 비교', () => {
  expect(5).toBeLessThan(10); // 성공
  expect(10).toBeLessThan(10); // 실패

  expect(10).toBeLessThanOrEqual(10); // 성공
  expect(5).toBeLessThanOrEqual(10); // 성공
  expect(15).toBeLessThanOrEqual(10); // 실패
});

// toBeCloseTo - 부동 소수점(floating point) 비교
test('부동 소수점 비교', () => {
  // 0.1 + 0.2는 정확히 0.3이 아님 (부동소수점 오차)
  expect(0.1 + 0.2).toBe(0.3); // 실패

  // toBeCloseTo를 사용하면 근사값 비교 가능
  // 기본 소수점 2자리까지 비교
  expect(0.1 + 0.2).toBeCloseTo(0.3); // 성공
});

// 부동 소수점(Floating Point) 오차 해결
// 컴퓨터는 숫자를 이진수로 처리하기 때문에 0.1 + 0.2는 0.30000000000000004가 됩니다.
// 따라서 소수점 계산 시에는 toBe 대신 반드시 이 매처를 사용해야 합니다.
test('부동 소수점 계산 테스트', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5); // 소수점 5자리까지 일치하는지 확인
});

// 4. 문자열 Matcher
// toMatch - 정규식과 매칭
test('문자열이 정규식과 일치해야 함', () => {
  // - / (슬래시): 정규식의 시작과 끝을 나타내는 구분자
  // - i (플래그): 정규식의 끝 부분에 위치한 플래그로, "ignore case"의 약자
  expect('Hello, World!').toMatch(/Hello/); //  "Hello"라는 문자열을 찾는 정규식
  expect('Hello, World!').toMatch(/world/i); // 대소문자 무시
});

// toContain - 문자열 포함 여부
test('문자열이 특정 부분 문자열을 포함해야 함', () => {
  expect('Hello, World!').toContain('World');
});

// 5. 배열과 이터러블 Matcher
// toContain - 배열 내 항목 포함 여부
test('배열이 특정 항목을 포함해야 함', () => {
  const shoppingList = ['apple', 'banana', 'orange'];
  expect(shoppingList).toContain('banana');
});

// toHaveLength - 배열 길이 확인
test('배열의 길이가 3이어야 함', () => {
  const colors = ['red', 'green', 'blue'];
  expect(colors).toHaveLength(3);
});

// 6. 부정 Matcher
// 모든 matcher는 .not 수식어를 사용하여 부정할 수 있다
test('not 수식어 사용 예', () => {
  expect(1 + 1).not.toBe(3);
  expect('hello').not.toMatch(/world/);
  expect(['apple', 'banana']).not.toContain('orange');
});

// 7. 예외 테스트 Matcher
// toThrow - 예외 발생 테스트
function throwError() {
  throw new Error('에러가 발생했습니다.');
}

test('함수가 에러를 발생시켜야 함', () => {
  // 함수를 직접 실행하면 테스트 전에 에러가 발생함
  // Jest가 실행할 수 있도록 함수 레퍼런스를 전달해야 함
  expect(throwError).toThrow();
  expect(() => throwError()).toThrow('에러가 발생했습니다.');
  expect(() => throwError()).toThrow(/에러/);
});

// ⚠️ 주의: toThrow를 사용할 때는 함수를 직접 호출하지 않고 함수 레퍼런스를 전달해야 함
// 잘못된 사용법: 테스트 실행 전에 에러가 발생함
// expect(throwError()).toThrow();

test('toThrow 올바른 사용법 예시', () => {
  expect(() => throwError()).toThrow();
});

// 8. 객체 및 배열
// toMatchObject - 객체의 일부 속성만 포함되어 있는지 확인
test('응답 객체 중 필요한 정보만 있는지 확인', () => {
  const user = { id: 1, name: 'Jest', email: 'jest@google.com' };
  // 전체를 다 적지 않고, 검증하고 싶은 속성만 적어도 통과된다.
  expect(user).toMatchObject({ name: 'Jest' });
});

// 9. 비동기 테스트 (Async/Await)
// Promise를 반환하는 함수는 async/await를 사용하여 결과값을 검증한다.
test('Promise matcher 사용', () => {
  const fetchData = () => Promise.resolve('success');
  return expect(fetchData()).resolves.toBe('success');
});

test('reject 테스트', async () => {
  const fetchData = () => Promise.reject('error');
  await expect(fetchData()).rejects.toBe('error');
});

// jest-extended 라이브러리 예시
test('jest-extended matcher 예제', () => {
  // 배열 관련
  // 배열 타입 확인
  expect([1, 2, 3]).toBeArray();
  // 배열 포함 여부 확인 -> 모두 포함되어야 함
  expect([1, 2, 3]).toIncludeAllMembers([1, 2]);
  // 배열 포함 여부 확인 -> 하나라도 포함되어야 함
  expect([1, 2, 3]).toIncludeAnyMembers([1, 4]);
  // 배열 모든 요소 확인 -> 모든 요소가 조건을 만족해야 함
  expect([1, 2, 3]).toSatisfyAll((n) => n > 0);

  // 객체 관련
  expect({ a: 1, b: 2 }).toBeObject();
  // 객체 키 포함 여부 확인 -> 일부 키만 포함해도 가능 (단, 하나라도 불일치하면 안됨)
  expect({ a: 1, b: 2 }).toContainKeys(['a', 'b']);
  // 객체 키 포함 여부 확인 -> 모든 키를 포함해야 함
  expect({ a: 1, b: 2 }).toContainAllKeys(['a', 'b']);

  // 숫자 관련
  expect(123).toBePositive();
  expect(-123).toBeNegative();
  expect(3).toBeWithin(1, 5);

  // 문자열 관련
  expect('hello').toBeString();
  expect('hello').toStartWith('he');
  expect('hello').toEndWith('lo');

  // 날짜 관련
  const date = new Date();
  expect(date).toBeDate();
  expect(date).toBeBefore(new Date('2099-12-31'));
  expect(date).toBeAfter(new Date('1970-01-01'));
});
