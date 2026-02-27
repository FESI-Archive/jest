const { fetchData } = require('./apiClient');

describe('apiClient.js 테스트', () => {
  test('API 호출 후 데이터 포맷이 올바르게 되는지 확인', async () => {
    // Arrange - fetch를 모킹하여 실제 네트워크 요청 없이 가짜 응답을 반환
    // jest.fn().mockResolvedValue() = 비동기로 특정 값을 반환하는 모킹 함수 생성
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true, // fetch가 성공적으로 호출되었음을 나타냄
      json: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Leanne Graham',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
        },
      }),
    });

    // 참고: 모킹 없이 실제 fetch를 직접 교체하면 호출 여부를 추적할 수 없음
    // fetch = async () => {
    //   return {
    //     json: () => {
    //       return {};
    //     },
    //   };
    // };

    const url = 'https://jsonplaceholder.typicode.com/users/1';

    // Act: fetchData 호출 → 내부에서 모킹된 fetch가 실행됨
    const result = await fetchData(url);

    // Assert: fetchData가 원본 데이터를 아래 형식으로 변환했는지 검증
    // - id → userId
    // - name → formattedName (대문자 변환)
    // - address 객체 → "street suite city" 형식의 문자열
    expect(result).toEqual({
      userId: 1,
      formattedName: 'LEANNE GRAHAM',
      address: 'Kulas Light Apt. 556 Gwenborough',
    });
  });

  test('callback 함수가 인자로 들어가면 호출이 되는지 확인', async () => {
    // Arrange: 두 번째 테스트용 fetch 모킹 (globalThis = 환경에 관계없이 전역 객체 참조)
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: 1,
        name: '김철수',
        address: {
          street: '테스트 거리',
          suite: '테스트 호수',
          city: '서울',
        },
      }),
    });

    // Arrange
    const url = 'https://api.example.com/user/1';

    // jest.fn()으로 모킹해야 나중에 "호출되었는지", "어떤 인자로 호출되었는지" 검증 가능
    // 일반 함수 () => {} 는 Jest가 추적할 수 없어서 expect로 검증 불가
    const callback = jest.fn();

    // Act: callback을 인자로 넘겨서 fetchData 호출
    await fetchData(url, callback);

    // Assert: callback이 변환된 데이터를 인자로 받아 호출되었는지 검증
    // toHaveBeenCalled - 호출 여부만 확인 (인자 상관없음)
    // toHaveBeenCalledWith() - 특정 인자로 호출되었는지까지 확인
    expect(callback).toHaveBeenCalledWith({
      userId: 1,
      formattedName: '김철수',
      address: '테스트 거리 테스트 호수 서울',
    });
  });
});
