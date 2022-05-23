# 미슐랭 먹을랭

- 전세계의 미슐랭 맛집을 알려드립니다!

## 1. 프로젝트 소개

### Application
https://michelin-muglang.netlify.app/ 

### 프로젝트 간단 설명

- 해외의 다양한 미슐랭 맛집을 한눈에 찾고 음식점을 북마크 하거나 리뷰를 남길 수 있는 웹프로젝트 입니다.

### 사용한 데이터셋

- 코로나 관련 데이터 (백신 접종률이 올라가고 확진자 수가 줄고 있음을 도출)

  - [COVID-19 World Vaccination Progress](https://www.kaggle.com/datasets/gpreda/covid-world-vaccination-progress)
  - [Covid-19 Weekly Trends In World - Latest Data](https://www.kaggle.com/datasets/anandhuh/covid19-weekly-trends-in-world-latest-data)

  - [Covid-19 Global Dataset](https://www.kaggle.com/datasets/josephassaker/covid19-global-dataset)

- 여행 관련 데이터 (맛집은 여행에서 중요한 부분이다는 것을 도출)

  - [Trips by US people(from 2019 to Nov 2021)](https://www.kaggle.com/datasets/ramjasmaurya/trips-by-distancefrom-2019-to-nov-2021)
  - [Travel Review Rating Dataset](https://www.kaggle.com/datasets/wirachleelakiatiwong/travel-review-rating-dataset)

- 미슐랭 가이드 관련 데이터 (미슐랭 식당의 위치와 세부 정보, 환율 통해 환전한 가격 알려줌)

  - [Michelin Guide Restaurants 2021](https://www.kaggle.com/datasets/ngshiheng/michelin-guide-restaurants-2021?select=michelin_my_maps.csv)
  - [Currency Exchange Rates](https://www.kaggle.com/datasets/ruchi798/currency-exchange-rates)

### 사용한 기술 스택과 라이브러리

| Back-End        | Front-End         | Data-analysis |
| --------------- | ----------------- | ------------- |
| Node.js         | Marker Clustering | Numpy         |
| Express         | React             | Pandas        |
| Mongo DB        | Redux             | Matplotlib    |
| Goggle Maps api | MUI               | Seaborn       |
| nodemailer      | React Simple Maps | pymongo       |

## 2. 프로젝트 목표

### 기획 의도 (문제 정의와 가설 설정 방법)

- 인생의 재미와 여행의 묘미 중 하나는 ‘맛있는 음식’을 찾아 먹는 것이다. 하지만 코로나로 인해 자유로운 활동에 제약이 생겼다. 이러한 영향으로 2021년 서울관광재단의 설문조사 결과, 서울에서 코로나19 이후 가장 하고 싶은 활동 1위로 ‘맛집 탐방’이 뽑혔다.
- 이제는 백신 접종 등으로 코로나 확진자 수가 줄어드는 추세이다. 이에 따라 앞으로는 여행의 기회가 늘어나 여행 수요가 증가할 것으로 보여, ‘해외의 다양한 미슐랭 맛집을 한눈에 소개하는 웹서비스’를 제공하고자 한다.

## 3. 프로젝트 기능 설명

### 메인 기능

- 국가별, 도시별 미슐랭 음식점 찾기 기능
  - 세계 지도에 국가별 미슐랭 음식점 수 표기
  - 국가별 지도에 미슐랭 음식점 위치 표기
  - 음식점 상세 페이지에 음식점 정보 제공 (식당 이름, 종류, 구글 리뷰 등)
  - 음식점을 필터링 또는 검색하여 찾아보는 기능
- 회원 기능
  - 계정을 만들어 마음에 드는 음식점을 북마크 해두는 기능
  - 개인 리뷰 작성 및 댓글 기능

### 서브 기능

- 편의 기능
  - 음식점 상세 페이지 하단에 근처 다른 식당을 추천해주는 기능
  - 환율을 계산해서 가격 알려주는 기능
- 회원 기능
  - SNS 로그인 (카카오)
  - 임시 비밀번호 발급

## 4. 프로젝트 구성도

- [피그마 사용한 와이어프레임](https://www.figma.com/file/0D7Nak8ICaCEyJGaG0boSr/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%EC%83%81?node-id=0%3A1)

## 5. 프로젝트 팀원 역할 분담

### 크래프트 (코드 수제 맛집)

| 이름   | 역할         |
| ------ | ------------ |
| 이동준 | 팀장, 백엔드 |
| 임은나 | 백엔드       |
| 정윤지 | 백엔드       |
| 배서영 | 프론트엔드   |
| 선민경 | 프론트엔드   |
| 백지유 | 프론트엔드   |
