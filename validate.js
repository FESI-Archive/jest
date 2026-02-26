// 공통으로 사용되는 유효성 검사 함수
function validatePassword(password) {
  return password.length >= 8;
}

module.exports = { validatePassword };
