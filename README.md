# Jest

> 테스트 프레임워크 학습용 레포입니다.  
> ES 모듈 환경에서는 추가 설정이 필요하므로 본 레포지토리는 CommonJS(require) 방식으로 진행합니다.

Facebook(Meta)에서 개발한 JavaScript 테스트 프레임워크

<br>

## 설치 및 환경설정 (⚠️ Next.js 아님)

### 설치

```bash
# 설치
npm init # npm init -y

# jest 설치
npm install --save-dev jest # npm i -D jest

```

### package.json 설정

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll"
  }
}
```

### 테스트 실행

- `npm test` : 테스트 실행
- `npm run test:watch` : watch 모드 실행 (파일 변경 시 자동 재실행)
