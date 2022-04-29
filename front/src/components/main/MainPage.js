import React, { useState, useEffect, useRef } from "react";
import styles from "../../css/main/MainPage.module.css";
import SectionCovid from "./SectionCovid";
import SectionVaccine from "./SectionVaccine";

function MainPage() {
  const sectionRef = useRef(null);
  const pointRef = useRef(null);
  const [section, setSection] = useState([]); // section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 nav btn 저장할 상태

  // section 세팅
  useEffect(() => {
    const s = sectionRef.current.getElementsByTagName("section");
    setSection(s);
  }, []);

  // nav btn 활성화
  useEffect(() => {
    const pointBtn = pointRef.current.getElementsByTagName("li");

    for (var i = 0; i < pointBtn.length; i++) {
      pointBtn[i].classList.remove(styles.active);
    }
    pointBtn[activeBtn].classList.add(styles.active);
  }, [activeBtn]);

  // nav 버튼 클릭 핸들러
  const clickPointBtn = (e) => {
    if (e.target.id) {
      const pageNum = e.target.id;

      window.scrollTo({
        top: section[pageNum].offsetTop - 32,
        behavior: "smooth",
      });

      setActiveBtn(pageNum);
    }
  };

  // 스크롤 이벤트 핸들러
  window.addEventListener("scroll", function (event) {
    let yOffset = this.scrollY;
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
  });

  return (
    <div ref={sectionRef}>
      {/* nav btn */}
      <ul className={styles.pointWrap} onClick={clickPointBtn} ref={pointRef}>
        <li id="0"></li>
        <li id="1"></li>
        <li id="2"></li>
        <li id="3"></li>
      </ul>

      {/* Greeting */}
      <section>
        <div className={styles.greeting}>
          <h1>
            <span>끝나가는 코로나!</span>{" "}
            <span>이제는 맛집을 찾으러 여행할 타이밍.</span>
          </h1>
          <div>
            <p>미슐랭 먹을랭과 함께 전세계 맛집을 탐방해요!</p>

            <a href="/">
              <span className={styles.text}>미슐랭 찾아보기 →</span>
              <span className={`${styles.line} ${styles.right}`}></span>
              <span className={`${styles.line} ${styles.top}`}></span>
              <span className={`${styles.line} ${styles.left}`}></span>
              <span className={`${styles.line} ${styles.bottom}`}></span>
            </a>
          </div>
        </div>
        <div className={styles.greeting_img}>
          <img src="images/greeting.png" alt="main_img" />
        </div>
      </section>

      {/* Covid Weekly Graph */}
      <section>
        <SectionCovid active={activeBtn === 1} />
      </section>

      {/* Vaccinated Ratio Graph */}
      <section>
        <SectionVaccine active={activeBtn === 2} />
      </section>

      {/* Service Info */}
      <section className={styles.info}>
        <h1>
          잠깐! 짐 싸기 전에 <span>맛집 체크</span> 하셨나요?
        </h1>
        <div className={styles.info_img}>
          <img
            src="images/window.png"
            alt="service_info_1"
            className={activeBtn === 3 ? styles.active : ""}
          />
          <img
            src="images/window.png"
            alt="service_info_2"
            className={activeBtn === 3 ? styles.active : ""}
          />
        </div>
        <p>
          전세계 미슐랭 레스토랑 <strong>위치</strong>부터{" "}
          <strong>상세 정보</strong>까지! <br />
          <span>미슐랭 먹을랭</span>에서 한눈에 확인할 수 있어요!
        </p>
      </section>
    </div>
  );
}

export default MainPage;
