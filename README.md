# 미슐랭 먹을랭

해외의 다양한 미슐랭 맛집을 한눈에 찾고 음식점을 북마크 하거나 리뷰를 남길 수 있는 웹프로젝트 입니다.  
데이터 분석을 통해 미슐랭 음식점에 대한 정보를 수집 및 필터링하였으며 지도로 음식점의 위치, 정보를 보여줍니다.  

![main2](https://user-images.githubusercontent.com/28249915/175803659-41c0a85b-fa91-4613-9063-c52c67d0da68.gif)


<br />


## Application
https://michelin-muglang.netlify.app/ 

heroku와 netlify를 이용해 배포하였습니다.


<br />


## 프로젝트 설명

![main3](https://user-images.githubusercontent.com/28249915/175803914-50fba17a-e061-4793-884c-8ac52f1bcf1f.gif)

### 메인 페이지
- 서비스에 대한 유저의 흥미 유발을 위해 헤더의 메뉴 버튼, 메인 페이지의 버튼, 차트, 서비스 소개 등에 애니메이션을 적용하였습니다.
- 서비스에 대해 간단한 소개를 하며 서비스가 필요한 이유를 차트와 함께 보여줍니다.
- 소페이지로 바로 이동할 수 있도록 스크롤 메뉴를 제공합니다. 이때 스크롤에 따라 애니메이션이 적용됩니다.

<br />
<br />

![map](https://user-images.githubusercontent.com/28249915/175804122-7e27f53e-b2d4-458b-a658-282169e5acbc.gif)

### 세계 지도, 국가별 지도 페이지
- 세계 지도에서 국가별 미슐랭 음식점의 위치 정보 및 개수를 확인할 수 있습니다.
- 세계 지도에서 국가명 검색을 통해 입력한 나라의 지도로 바로 이동할 수 있습니다.
- 국가별 지도에서 미슐랭 음식점의 주소와 별점 등의 간단한 정보를 확인할 수 있습니다.
- 음식점 이름, 주소, 지역, 요리 종류, 별점 등으로 음식점의 정보를 검색 및 필터링할 수 있습니다.

<br />
<br />

![info](https://user-images.githubusercontent.com/28249915/175804162-8f7674ab-8902-449d-bff1-d4c5e49f0cc7.gif)

### 음식점 상세 정보 페이지
- 음식점 이름, 종류, 주소, 별점 등의 음식점 정보를 확인할 수 있습니다.
- 음식점의 사진을 볼 수 있습니다.
- 환율 정보를 제공하여 음식점의 가격대를 확인할 수 있습니다.
- 음식점에 대한 구글 리뷰를 제공하여 다양한 사람들의 리뷰를 확인할 수 있습니다.
- 음식점 위치에 대해 구글 지도를 제공하여 정확한 음식점의 위치를 파악할 수 있습니다.
- 유저가 직접 해당 음식점에 대해 리뷰를 남길 수 있습니다.
- 해당 음식점으로부터 30km 이내의 다른 음식점을 확인할 수 있습니다.

<br />
<br />

![service](https://user-images.githubusercontent.com/28249915/175804349-c3e588b5-3465-4046-a8be-81a00534c320.gif)

### 서비스 소개 페이지
- 서비스에 대한 기획 의도를 글과 차트를 통해 상세히 제공합니다.
- 스크롤 메뉴를 통해 확인하고 싶은 페이지로 바로 이동할 수 있습니다.

<br />
<br />

![login](https://user-images.githubusercontent.com/28249915/175804630-f5d88d8c-c98e-4111-b5ab-e6b8e1a79b41.gif)

### 로그인/회원가입 페이지
- 이메일, 비밀번호, 이름으로 회원가입이 가능합니다.
- 이메일, 비밀번호로 로그인이 가능합니다.
- 비밀번호를 잊어버렸을 경우 회원가입 시 이용했던 이메일을 통해 임시 비밀번호를 발급받을 수 있습니다.
- 카카오톡 계정을 통해 로그인이 가능합니다.

<br />
<br />

![team](https://user-images.githubusercontent.com/28249915/175804722-63c57206-7abf-4502-975c-f7cfecc9c6aa.gif)

### 팀 소개 페이지
- 프로젝트를 만든 팀원들을 확인할 수 있습니다.
- 각 팀원의 사진과 이름, 역할을 폴라로이드 사진과 같이 표현하였습니다.

<br />
<br />

## 기획 의도 (문제 정의와 가설 설정 방법)

인생의 재미와 여행의 묘미 중 하나는 ‘맛있는 음식’을 찾아 먹는 것이다.  
하지만 코로나로 인해 자유로운 활동에 제약이 생겼고 이러한 영향으로 2021년 서울관광재단의 설문조사 결과, 서울에서 코로나19 이후 가장 하고 싶은 활동 1위로 ‘맛집 탐방’이 뽑혔다.  
이제는 백신 접종 등으로 코로나 확진자 수가 줄어드는 추세이다.  
이에 따라 앞으로는 여행의 기회가 늘어나 여행 수요가 증가할 것으로 보여, ‘해외의 다양한 미슐랭 맛집을 한눈에 소개하는 웹서비스’를 제공하고자 한다.  


<br />


## 사용한 데이터셋

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


<br />


## 프로젝트 구성도

- [피그마 사용한 와이어프레임](https://www.figma.com/file/0D7Nak8ICaCEyJGaG0boSr/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%EC%83%81?node-id=0%3A1)


<br />



## 기술 스택과 라이브러리

| Back-End        | Front-End         | Data-analysis |
| --------------- | ----------------- | ------------- |
| Node.js         | Marker Clustering | Numpy         |
| Express         | React             | Pandas        |
| Mongo DB        | Redux             | Matplotlib    |
| Goggle Maps api | MUI               | Seaborn       |
| nodemailer      | React Simple Maps | pymongo       |


<br />



## 제작 기간 및 팀 소개
**크래프트 (코드 수제 맛집)**

| 이름   | 역할         |
| ------ | ------------ |
| 이동준 | 팀장, 백엔드 |
| 임은나 | 백엔드       |
| 정윤지 | 백엔드       |
| 배서영 | 프론트엔드   |
| 선민경 | 프론트엔드   |
| 백지유 | 프론트엔드   |

- 제작 기간
  - 22.04.20 ~ 22.05.07 (3주)
