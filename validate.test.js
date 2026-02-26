const { validatePassword, validateEmail } = require('./validate');

// 비밀번호가 8자 이상인 경우 true가 반환되는지 확인하는 테스트 케이스를 작성해보세요.
test('비밀번호가 8자 이상인 경우 true가 반환되는지 확인', () => {
  expect(validatePassword('passwordddddd')).toBe(true);
});

// 비밀번호가 8자 미만인 경우 false가 반환되는지 확인하는 테스트 케이스를 작성해보세요.
test('비밀번호가 8자 미만인 경우 false가 반환되는지 확인', () => {
  expect(validatePassword('pas')).toBe(false);
});

test('유효한 이메일 입력 시 true를 반환하는지 확인', () => {
  expect(validateEmail('test@example.com')).toBeTruthy();
});

test('유효하지 않은 이메일 입력 시 false를 반환하는지 확인', () => {
  expect(validateEmail('testexample.com')).toBeFalsy();
});

// not을 사용하여 true가 아님을 확인
test('도메인 없이 이메일을 허용하지 않아야 함', () => {
  expect(validateEmail('test@')).not.toBeTruthy();
});
