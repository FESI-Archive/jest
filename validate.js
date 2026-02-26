// 공통으로 사용되는 유효성 검사 함수
function validatePassword(password) {
  return password.length >= 8;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { validatePassword, validateEmail };
