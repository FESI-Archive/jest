const { validatePassword } = require('./validateRefactor');

// 길이 검사 테스트
test('비밀번호가 유효한 길이인 경우 유효함을 반환해야 함', () => {
  const result = validatePassword('passWord123@');
  expect(result.isValid).toBe(true);
});

// - 객체 비교 시에는 toEqual로 수정
test('비밀번호가 8자 미만인 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('short');
  expect(result).toEqual({
    isValid: false,
    reason: '비밀번호는 8자 이상, 20자 이하여야 합니다.',
  });
});

// - 객체 비교 시에는 toEqual로 수정
test('비밀번호가 20자 초과인 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('thisisaverylongpassword1234567890');
  expect(result).toEqual({
    isValid: false,
    reason: '비밀번호는 8자 이상, 20자 이하여야 합니다.',
  });
});

// 대문자 검사 테스트
// - 객체 내의 reason이 너무 길고, 핵심 문자만 포함되는지 확인하고 싶다면 toContain을 사용할 수도 있다.
test('대문자가 포함되지 않은 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('password123!');
  expect(result.isValid).toBe(false);
  expect(result.reason).toContain('대문자');
});

// 소문자 검사 테스트
test('소문자가 포함되지 않은 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('PASSWORD123!');
  expect(result.isValid).toBe(false);
  expect(result.reason).toContain('소문자');
});

// 숫자 검사 테스트
test('숫자가 포함되지 않은 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('Password!');
  expect(result.isValid).toBe(false);
  expect(result.reason).toContain('숫자');
});

// 특수문자 검사 테스트
test('특수문자가 포함되지 않은 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('Password123');
  expect(result.isValid).toBe(false);
  expect(result.reason).toContain('특수문자');
});

// 금지된 특수문자 검사 테스트
test('금지된 특수문자가 포함된 경우 유효하지 않음을 반환해야 함', () => {
  const result = validatePassword('Password123<');
  expect(result.isValid).toBe(false);
  expect(result.reason).toContain('보안상 위험한 문자');
});

// 통합 테스트
test('모든 조건을 충족하는 비밀번호는 유효함을 반환해야 함', () => {
  const result = validatePassword('StrongP@ss123');
  expect(result.isValid).toBe(true);
  expect(result.reason).toBe('유효한 비밀번호입니다.');
});
