# Datarize Frontend 과제 전형

지원자 : 안은소

## 📋 목차

- [과제 요구사항](#-과제-요구사항)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [구현 기능](#-구현-기능)
- [추가 구현 사항](#-추가-구현-사항)

## 🎯 과제 요구사항

쇼핑몰의 7월 한 달간 구매 데이터를 기반으로 다음 정보를 제공합니다:

- 가격대별 구매 빈도 시각화 (바 차트)
- 고객별 구매 통계 및 검색/정렬 기능
- 고객별 상세 구매 내역 조회

## 🛠 기술 스택

### Frontend

- **React 18.3.1** - UI 라이브러리
- **TypeScript 5.2.2** - 타입 안정성
- **Vite 5.3.4** - 빌드 도구 및 개발 서버
- **TanStack Query (React Query) 5.90.12** - 서버 상태 관리 및 데이터 페칭
- **Styled Components 6.1.19** - CSS-in-JS 스타일링
- **Recharts 3.6.0** - 차트 라이브러리
- **React Router 7.11.0** - 라우팅
- **React Error Boundary 6.0.0** - 에러 핸들링

### Testing & Development Tools

- **Vitest** - 유닛 테스트 프레임워크
- **Testing Library** - React 컴포넌트 테스팅
- **Storybook 8.4.7** - UI 컴포넌트 개발 환경
- **MSW (Mock Service Worker)** - API 모킹

### 기술 선택 이유

- **TanStack Query**: 서버 상태 관리, 캐싱, 리페칭 등을 자동으로 처리하여 개발 생산성 향상
- **Styled Components**: 컴포넌트 기반 스타일링으로 유지보수성 향상 및 타입스크립트 지원
- **Recharts**: React 친화적이며 커스터마이징이 용이한 선언적 차트 라이브러리
- **Vitest**: Vite와 통합이 잘 되며 빠른 테스트 실행 속도
- **Storybook**: 독립적인 컴포넌트 개발 및 문서화 가능

## 📁 프로젝트 구조

```
apps/
│
└── frontend/
    └── src/
        ├── features/           # 기능별 모듈
        │   ├── customer/       # 고객 관련 기능
        │   │   ├── apis/       # API 호출 함수
        │   │   ├── components/ # 컴포넌트
        │   │   ├── hooks/      # Custom Hooks
        │   │   └── utils/      # 유틸리티 함수
        │   └── purchase/       # 구매 관련 기능
        │       ├── apis/
        │       ├── components/
        │       ├── hooks/
        │       └── utils/
        │
        ├── pages/              # 페이지 컴포넌트
        │   └── dashboard/      # 대시보드 페이지
        │       ├── CustomerSection/
        │       └── PurchaseSection/
        │
        ├── shared/             # 공유 리소스
        │   ├── config/         # 설정 (API, QueryClient)
        │   ├── error/          # 에러 처리
        │   ├── style/          # 공통 스타일 컴포넌트
        │   └── utils/          # 공통 유틸리티
        │
        ├── mocks/              # MSW 목 데이터
        └── test/               # 테스트 설정
```

### 아키텍처 설계 패턴

- **Feature-Sliced Design**: 기능별로 모듈화하여 관심사 분리
- **Custom Hooks 패턴**: 비즈니스 로직을 hooks로 추상화
- **Presentational/Container 패턴**: UI와 로직 분리
- **Atomic Design**: 디자인 토큰 기반의 공통 컴포넌트를 재사용 가능한 단위로 구성

## ✅ 구현 기능

### 1. 가격대별 구매 빈도 차트

**구현 내용**

- Recharts를 활용한 반응형 바 차트
- 가격대별(2만원 이하 ~ 10만원 이상, 만원 단위) 구매 건수 시각화
- 날짜 범위 선택 기능 (DateRangePicker)
- 단일 날짜 조회 가능
- 가격대별 색상 구분 (상 : 초록, 중 : 주황, 하 : 보라)

![1-purchase](https://github.com/user-attachments/assets/ca210227-9074-4fd0-aeb9-788aa3c160f4)

<details>
<summary><b>주요 파일</b></summary>

- `features/purchase/components/BarChart/BarChart.tsx`
- `features/purchase/components/DateRangePicker/DateRangePicker.tsx`
- `features/purchase/hooks/usePurchaseFrequency.ts`
- `features/purchase/apis/getPurchaseFrequency.ts`

</details>

### 2. 고객 목록 및 검색/정렬 기능

**구현 내용**

- 고객 ID, 이름, 총 구매 횟수, 총 구매 금액 표시
- 구매 금액 기준 오름차순/내림차순 정렬
- 고객 이름 검색 기능 (실시간 검색)
- 검색 결과 초기화 기능
- 테이블 형태의 데이터 표시

![2-1](https://github.com/user-attachments/assets/3df4fe18-06e6-4118-be27-dea106f4a2c8)

<details>
<summary><b>주요 파일</b></summary>

- `pages/dashboard/CustomerSection/CustomerTableSection/CustomerTable.tsx`
- `features/customer/components/SearchBar/SearchBar.tsx`
- `features/customer/hooks/useCustomers.ts`
- `features/customer/apis/getCustomers.ts`

</details>

### 3. 고객 상세 구매 내역

**구현 내용**

- 고객 Row 클릭 시 모달로 상세 내역 표시
- 구매 날짜, 제품명, 가격, 상품 썸네일 표시
- 모달 외부 클릭/닫기 버튼으로 닫기 기능
- 총 구매 금액 및 구매 건수 요약 정보

![3-customer-detail](https://github.com/user-attachments/assets/933e51cb-b116-460b-bf78-570627cbd45e)

<details>
<summary><b>주요 파일</b></summary>

- `pages/dashboard/CustomerSection/CustomerDetailSection/CustomerDetailSection.tsx`
- `features/customer/hooks/useCustomerPurchases.ts`
- `features/customer/apis/getCustomerPurchases.ts`

</details>

### 4. 로딩 및 에러 처리

**구현 내용**

- Skeleton UI를 활용한 로딩 상태 표시
- ErrorBoundary를 활용한 전역 에러 핸들링
- API 에러 발생 시 사용자 친화적인 에러 메시지 표시
- 재시도 기능 제공

![0](https://github.com/user-attachments/assets/8ff21552-90f2-455f-8350-41a2e721dd21)

<details>
<summary><b>주요 파일</b></summary>

- `shared/error/ErrorBoundary/ErrorBoundary.tsx`
- `shared/style/components/Skeleton/Skeleton.tsx`
- `shared/style/components/ErrorFallback/ErrorFallback.tsx`

</details>

### 5. Storybook을 활용한 컴포넌트 개발

**구현 내용**

- 공통 컴포넌트(Button, Input, Table, Modal 등)를 Storybook으로 문서화
- 컴포넌트별 다양한 상태(variant, size, disabled 등)를 시각적으로 테스트

![4-storybook-1](https://github.com/user-attachments/assets/a0d0f9a9-d36b-47d8-804a-e741fd323f3d)

<details>
<summary><b>주요 파일</b></summary>

- `shared/style/components/Button/Button.stories.tsx`
- `shared/style/components/Input/Input.stories.tsx`
- `shared/style/components/Table/Table.stories.tsx`
- `shared/style/components/Modal/Modal.stories.tsx`
- 기타 공통 컴포넌트 Stories

</details>

## 💡 추가 구현 사항

### 완료된 추가 기능

- ✅ Skeleton UI를 활용한 로딩 상태 개선
- ✅ Storybook을 활용한 컴포넌트 문서화
- ✅ 검색어 초기화 버튼
- ✅ 가격대별 색상 그라데이션

### 개선하고 싶은 부분

- 🔄 CustomerTableSection에 페이지네이션 추가
- 🔄 고객 상세 정보 모달의 썸네일 이미지 스켈레톤 적용
- 🔄 에러 처리를 더 상세하게 구현 (에러 타입별 다른 메시지 표시, 네트워크 에러 감지 등)
- 🔄 에러 및 로딩 처리에 대한 테스트 코드 추가
- 🔄 차트 데이터 Export 기능 (CSV, Excel)
- 🔄 E2E 테스트 추가 (cypress)

---

## 📝 과제 원본 요구사항

과제의 원본 요구사항은 [REQUIREMENT.md](./REQUIREMENT.md)에서 확인하실 수 있습니다.
