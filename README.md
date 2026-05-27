# 서울시 공공자전거 실시간 대여정보 🚲

서울시 공공자전거(따릉이) 실시간 대여 정보를\
**카카오 지도 위에 마커로 보여주는 웹 페이지**입니다.

API 키는 `.env`에 두고, **Express 서버**가 서울 열린데이터 API를 프록시하고\
카카오 지도 설정을 내려줍니다. `index.html`만 직접 열면 동작하지 않습니다.

---

## ✨ 기능 개요

- **서울시 열린데이터 API**에서 실시간 자전거 대여소 정보 조회
- **카카오 지도** 위에 대여소 위치 마커 표시
- **잔여 자전거 대수에 따라 마커 색상 구분**
  - 0대: 🔴 빨간색 마커
  - 1 \~ 4대: 🟡 노란색 마커
  - 5대 이상: 🟢 초록색 마커
- 마커 클릭 시 **대여소 이름 정보창(인포윈도우)** 표시
- **현재 위치 기준**으로 지도 초기 중심 설정 (브라우저 Geolocation 사용)
- 상단 **「새로고침」 버튼**으로 실시간 데이터 재요청
- 데이터 로딩 중 전체 화면에 **로딩 오버레이 + 스피너 표시**

---

## 🧱 사용 기술

- HTML5 / CSS3 (Pretendard 폰트)
- JavaScript (ES6+)
- Node.js, Express
- Kakao Maps JavaScript API
- 서울열린데이터광장 자전거 API

---

## 📁 폴더 구조

```
bike-map/
├─ images/
│  ├─ red.png
│  ├─ yellow.png
│  └─ green.png
├─ index.html
├─ script.js
├─ style.css
├─ server.js          # API 프록시, /config.js 제공
├─ package.json
├─ .env.example       # 환경 변수 예시 (복사 후 .env 로 사용)
└─ .gitignore
```

---

## ⚙️ 사전 준비

### 1. Node.js

[Node.js](https://nodejs.org/) LTS 버전 설치

### 2. API 키 발급

| 용도 | 발급처 | `.env` 변수명 |
|------|--------|----------------|
| 서울 공공자전거 API | [서울열린데이터광장](https://data.seoul.go.kr/) | `SEOUL_OPENAPI_KEY` |
| 카카오 지도 | [Kakao Developers](https://developers.kakao.com/) | `KAKAO_MAP_APP_KEY` |

### 3. 카카오 지도 Web 플랫폼 도메인 등록

카카오 개발자 콘솔 → 앱 → **플랫폼 → Web** 에서 아래 주소를 등록합니다.

- 로컬: `http://localhost:3000` (또는 `.env`의 `PORT`에 맞는 URL)

도메인을 등록하지 않으면 지도 SDK 로드가 실패할 수 있습니다.

### 4. 환경 변수 파일

프로젝트 루트에 `.env` 파일을 만듭니다.

```bash
cp .env.example .env
```

`.env` 예시:

```env
SEOUL_OPENAPI_KEY=발급받은_서울_API_인증키
KAKAO_MAP_APP_KEY=발급받은_카카오_JavaScript_키
PORT=3000
```

> `.env`는 Git에 올리지 마세요. (`.gitignore`에 포함됨)

---

## 🚀 실행 방법

### 레포 클론

```bash
git clone https://github.com/soominn/bike-map.git
cd bike-map
```

### 의존성 설치 및 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 **http://localhost:3000** 접속

(`PORT`를 바꿨다면 해당 포트로 접속)

---

## 🔐 키가 노출되는 위치

| 키 | 저장 위치 | 브라우저 노출 |
|----|-----------|----------------|
| 서울 API 인증키 | 서버 `.env`만 | ❌ (`/api/bikeList` 프록시) |
| 카카오 지도 앱 키 | 서버 `.env` → `/config.js` | ⚠️ 클라이언트에서 SDK 로드에 필요 |

카카오 JavaScript 키는 지도 SDK 특성상 브라우저에서 사용됩니다.\
서울 API 키는 서버에만 두어 소스 코드·프론트에 넣지 않습니다.

---

## ✍️ 작성자

- GitHub: https://github.com/soominn
