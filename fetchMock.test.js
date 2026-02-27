const { fetchUserData } = require('./fetchMock');

test('fetchUserData 함수 테스트', async () => {
  // 여기에 코드 작성
  // 1. global.fetch를 모킹하세요
  // 2. 모킹된 함수가 특정 응답을 반환하도록 설정하세요
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: 1, name: '혜빈' }),
  });

  // 3. fetchUserData 함수를 호출하고 결과를 검증하세요
  const userData = await fetchUserData(1);
  expect(userData).toEqual({ id: 1, name: '혜빈' });
});
