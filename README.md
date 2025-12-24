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

![2-customers](https://github.com/user-attachments/assets/c8af4fa2-dceb-4bfd-b88b-0386b5aca65e)


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

![4-storybook](https://github.com/user-attachments/assets/96892293-266b-48f8-ab97-7295f50580f9)


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

<details>
<summary>클릭하여 원본 요구사항 보기</summary>

### 과제 개요

지원자님은 쇼핑몰의 구매 데이터를 시각화하고 분석할 수 있는 간단한 대시보드 애플리케이션을 개발하게 됩니다.  
이 애플리케이션은 `7월 한 달` 동안 발생한 구매 데이터를 기반으로 몇 가지 주요 정보를 제공해야 합니다.

### 요구 사항

- 가격대별 구매 빈도 차트

  - 한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 보여주는 차트를 구현하세요. 가격대는 2만원 이하부터 10만원 이상까지 만원 단위로 구분됩니다. 차트는 바 차트 형태로 시각화되어야 합니다. 날짜를 선택해서 특정 기간을 조회할 수 있도록 구현해주세요.

- 가장 많이 구매한 고객 목록 및 검색 기능

  - 한 달 동안 가장 많이 구매한 고객을 내림차순/오름차순으로 정렬하여 보여주는 목록을 구현하세요. 기본 정렬은 ID입니다. 각 고객의 ID, 이름, 총 구매 횟수, 총 구매 금액을 표시하세요. 고객의 이름을 통해서 검색 가능해야 합니다.

- 고객 ID 기반 상세 기능
  - 특정 고객 Row를 클릭하면 해당 고객의 상세 구매 내역을 표시할 수 있는 기능을 구현하세요. 검색 결과에는 해당 고객의 구매 날짜, 구매한 제품 목록, 각 제품의 가격, 상품 썸네일이 포함되어야 합니다.

### API 명세

1. GET `/api/purchase-frequency` - 한 달 동안의 모든 구매 데이터를 반환합니다.

   - 쿼리 파라미터 (optional)
     - from: 시작 날짜 (ISO 8601 형식)
     - to: 종료 날짜 (ISO 8601 형식)

2. GET `/api/customers` - 고객 목록을 반환합니다.

   - 쿼리 파라미터 (optional)
     - sortBy: 정렬 기준 (가능한 값: asc, desc - 구매 금액 순 정렬)
     - name: 이름 검색

3. GET `/api/customers/{id}/purchases` - 특정 고객의 구매 내역을 반환합니다.

</details>
