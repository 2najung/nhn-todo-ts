# NHN Todo (TS)

NHN 프론트엔드 사전과제

## 🛠 기술 스택

- TypeScript
- Webpack + Babel
- Jest + jsdom (테스트)
- HTML/CSS (Vanilla)

## 📁 폴더 구조

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ClearCompleted.ts
│   │   ├── Filter.ts
│   │   ├── Input.ts
│   │   ├── List.ts
│   │   ├── Stats.ts
│   │   └── useDragAndDrop.ts
│   ├── __tests__/
│   │   ├── clearCompleted.test.ts
│   │   ├── Filter.test.ts
│   │   ├── Input.test.ts
│   │   ├── List.test.ts
│   │   └── useDragAndDrop.test.ts
│   ├── types.ts
│   └── index.ts
├── babel.config.js
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## ⚙ 실행 방법

```bash
npm install
npm start
```

## ✅ 테스트 실행

```bash
npm run test
```

- Jest + jsdom 환경에서 실행되며, DOM과 이벤트 중심으로 테스트합니다.
- 테스트 항목은 다음과 같습니다:

### `__tests__/clearCompleted.test.ts`
- 완료 항목이 있을 때 버튼 활성화 여부 테스트


### `__tests__/Filter.test.ts`
- 각 필터 버튼 클릭 시 필터 상태 변경 여부 테스트

### `__tests__/Input.test.ts`
- Enter 키 입력 시 콜백 호출 및 인풋 초기화 테스트

### `__tests__/List.test.ts`
- 리스트 렌더링 정상 동작 여부 테스트
- 완료 상태에 따른 클래스 적용 확인 테스트

### `__tests__/useDragAndDrop.test.ts`
- 드래그 시 미러 엘리먼트 생성 여부 테스트
- 드래그 종료 시 리셋 여부 테스트
- ESC 키 입력 시 드래그 취소 테스트
- 2초 후 preview 호출 여부 테스트

## 🧪 특징 및 구현 포인트

- 라이브러리 없이 `mousedown`, `mousemove`, `mouseup` 으로 DnD 구현
- 완료 전 항목만 드래그 가능
- 외부 드롭, ESC 입력 시 취소 처리
- 2초간 hover 시 preview 상태로 미리보기 적용
- preview 상태에서도 연속 이동 가능 (계속 기준이 처음 드래그한 항목 기준)
- 실제 드롭 시에만 `onReorder` 반영
