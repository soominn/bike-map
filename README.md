# 서울시 공공자전거 실시간 대여정보 🚲

서울시 공공자전거(따릉이) 실시간 대여 정보를\
**카카오 지도 위에 마커로 보여주는 간단한 웹 페이지**입니다.

브라우저에서 바로 열 수 있는 정적 페이지라서,\
`index.html`만 열어도 지도가 뜨도록 구성되어 있습니다.

---

## ✨ 기능 개요

- **서울시 열린데이터 API**에서 실시간 자전거 대여소 정보 조회
- **카카오 지도** 위에 대여소 위치 마커 표시
- **잔여 자전거 대수에 따라 마커 색상 구분**
  - 0대: 🔴 빨간색 마커\
  - 1 \~ 4대: 🟡 노란색 마커\
  - 5대 이상: 🟢 초록색 마커
- 마커 클릭 시 **대여소 이름 정보창(인포윈도우)** 표시
- **현재 위치 기준**으로 지도 초기 중심 설정 (브라우저 Geolocation
  사용)
- 상단 **「새로고침」 버튼**으로 실시간 데이터 재요청
- 데이터 로딩 중 전체 화면에 **로딩 오버레이 + 스피너 표시**

---

## 🧱 사용 기술

- HTML5\
- CSS3 (Pretendard 폰트 사용)\
- JavaScript (ES6+)\
- Kakao Maps JavaScript API\
- 서울열린데이터광장 자전거 API

---

## 📁 폴더 구조

    bike-map/
    ├─ images/
    │  ├─ red.png
    │  ├─ yellow.png
    │  └─ green.png
    ├─ index.html
    ├─ script.js
    └─ style.css

---

## ⚙️ 사전 준비

### 1. 카카오 지도 앱 키 등록

`index.html`에서 `앱키`를 본인의 앱 키로 변경:

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=앱키&libraries=services,clusterer"
></script>
```

### 2. 서울시 공공자전거 API 인증키 설정

`script.js`:

```javascript
const serviceKey = "인증키";
```

---

## 🚀 실행 방법

### 레포 클론

```bash
git clone https://github.com/soominn/bike-map.git
cd bike-map
```

### 실행

#### 방법 1: index.html 직접 실행

더블클릭 → 브라우저에서 열기

#### 방법 2: VS CODE Extension Live Server 사용

VS CODE를 다운 받아서 'Live Server' Extension 다운받고 Alt + L + O 눌러서 열기

#### 방법 3: 로컬 서버 실행

```bash
python -m http.server 8000
```

> 혹시나 저의 앱키 또는 인증키를 사용하신다면 무조건 방법 2번을 사용해주시고 포트번호도 5500번을 사용해주셔야 합니다.

---

## ✍️ 작성자

- GitHub: https://github.com/soominn
