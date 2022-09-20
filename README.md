# 미슐랭 먹을랭

해외의 다양한 미슐랭 맛집을 한눈에 찾고 음식점을 북마크 하거나 리뷰를 남길 수 있는 웹프로젝트 입니다.  
데이터 분석을 통해 미슐랭 음식점에 대한 정보를 수집 및 필터링하였으며 지도로 음식점의 위치, 정보를 보여줍니다.  

![main2](https://user-images.githubusercontent.com/28249915/175803659-41c0a85b-fa91-4613-9063-c52c67d0da68.gif)


<br />


## 관련 링크
- [프로젝트 정리](https://velog.io/@rnrn99/Project-%EB%AF%B8%EC%8A%90%EB%9E%AD-%EB%A8%B9%EC%9D%84%EB%9E%AD-%EC%A0%95%EB%A6%AC)  
- [Application](https://michelin-muglang.netlify.app/)  
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


### 👀 기술 스택 적용 이유(프론트)
#### React
- 컴포넌트 기반으로 이루어져있어 복잡한 UI도 간단하게 만들 수 있고 생산성이 좋습니다.
- Virtual DOM을 사용하여 변화가 필요한 곳만 렌더링하기 때문에 성능이 좋습니다.
- 커뮤니티가 활성화되어있어 유지보수가 원활히 이루어지며 활용할 수 있는 라이브러리가 많습니다.
#### Redux-toolkit
- 기본 Redux보다 문법이 간단하며 Redux에서 권장하는 문법입니다.
#### MUI
- 다양한 디자인된 컴포넌트들을 간단하게 사용할 수 있고 빠르게 UI를 만들 수 있게 되어 생산성을 올려줍니다.
- ```sx```와 같은 속성을 통해 디자인을 커스텀할 수 있습니다.
- css 역량을 기르기 위해 로그인, 회원가입 페이지 구현 시에만 사용하고 나머지 페이지에는 사용하지 않았습니다.


<br />


## 트러블슈팅
![scroll-animation](https://velog.velcdn.com/images/rnrn99/post/1c50135a-009a-44b9-81ec-3ca250382de0/image.gif)
### 🙅‍ 어려움
위 사진처럼 메인페이지를 4개의 section으로 구분했고 그에따라 스크롤 애니메이션을 적용하고 싶었습니다. 

구현하고자 했던 애니메이션의 상세 내용은 다음과 같습니다.

1. 오른쪽의 nav button을 눌러 해당 section으로 이동.
   (이때 내용이 보기 쉽도록 화면 중앙에 위치할 것.)
2. 직접 스크롤 또는 nav button 버튼을 클릭해 section 이동 시 해당 section의 애니메이션(그래프, 텍스트 강조 등)이 활성화될 것.

우선 1의 기능을 구현하기 위해 `react-fullpage`와 `react-full-page`라는 라이브러리를 찾았지만 두 라이브러리의 weekly downloads 수는 각각 4,141과 2,465로 적은 편에 속했고 업데이트도 원활히 되지 않아 사용하기에는 적절하지 않은 라이브러리라고 판단했습니다.

### 🙆‍♀️ 해결방법
적절하지 않은 라이브러리에 대한 의존성을 높이고 원하는 결과를 내는 것보다 직접 구현하여 의존성을 줄이는 것이 옳다고 판단했습니다.
```js
  const handleScrollEvent = useCallback(() => {
    let yOffset = window.scrollY;
    let height = window.innerHeight / 1.5;

    for (let i = 0; i < section.length; i++) {
      if (
        yOffset > section[i].offsetTop - height &&
        yOffset <= section[i].offsetTop - height + section[i].offsetHeight
      ) {
        setActiveBtn(i);
        break;
      }
    }
  }, [section]);
```
먼저 scroll event에 대한 handler 함수인 `handleScrollEvent`를 구현하여 스크롤된 위치에 따라 어느 section이 활성화되었는지 확인했습니다.

```js
  useEffect(() => {
    // 스크롤 이벤트 핸들러
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handleScrollEvent, section]);
```
`useEffect`를 이용해 스크롤 이벤트 핸들러를 등록하였고 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거해 주었습니다.

```js
// nav 버튼 클릭 핸들러
  const clickPointBtn = (e) => {
    if (e.target.id) {
      const pageNum = e.target.id;

      window.scrollTo({
        top: section[pageNum].offsetTop - headerHeight,
        behavior: "smooth",
      });

      setActiveBtn(pageNum);
    }
  };
// nav btn 활성화
  useEffect(() => {
    const pointBtn = pointRef.current.getElementsByTagName("li");

    for (var i = 0; i < pointBtn.length; i++) {
      pointBtn[i].classList.remove(styles.active);
    }
    pointBtn[activeBtn].classList.add(styles.active);
  }, [activeBtn]);
```
이후 활성화된 section에 따라 nav button의 active 여부를 지정하고 className을 추가하거나 삭제했습니다.

```jsx
{/* Covid Weekly Graph */}
<section>
    <SectionCovid active={activeBtn === 1} />
</section>

{/* Vaccinated Ratio Graph */}
<section>
    <SectionVaccine active={activeBtn === 2} />
</section>
```

같은 원리를 이용해 section이 활성화되었는지의 여부를 active라는 prop으로 전달해 애니메이션과 관련된 className을 추가하거나 삭제했습니다.



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
