import React, { useState, useEffect } from "react";
import styles from "../../css/main/MainPage.module.css";
import SectionCovid from "./SectionCovid";
import SectionVaccine from "./SectionVaccine";

function MainPage() {
  const [section, setSection] = useState([]); // section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 nav btn 저장할 상태

  // section 세팅
  useEffect(() => {
    const s = document.getElementsByTagName("section");
    setSection(s);
  }, []);

  // nav btn 활성화
  useEffect(() => {
    const pointBtn = document.getElementsByTagName("li");

    for (var i = 0; i < pointBtn.length; i++) {
      pointBtn[i].classList.remove(styles.active);
    }
    pointBtn[activeBtn].classList.add(styles.active);
  }, [activeBtn]);

  // nav 버튼 클릭 핸들러
  const clickPointBtn = (e) => {
    const pageNum = e.target.id;

    window.scrollTo({
      top: section[pageNum].offsetTop - 32,
      behavior: "smooth",
    });

    setActiveBtn(pageNum);
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
    <>
      {/* nav btn */}
      <ul className={styles.pointWrap} onClick={clickPointBtn}>
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
          <p>미슐랭 먹을랭과 함께 전세계 맛집을 탐방해요!</p>

          <a href="/">
            <span className={styles.text}>미슐랭 찾아보기 →</span>
            <span className={`${styles.line} ${styles.right}`}></span>
            <span className={`${styles.line} ${styles.top}`}></span>
            <span className={`${styles.line} ${styles.left}`}></span>
            <span className={`${styles.line} ${styles.bottom}`}></span>
          </a>
        </div>
        <div className={styles.greeting_img}>
          <img src="greeting.png" alt="main_img" />
        </div>
      </section>

      {/* Covid Weekly Graph */}
      <section>
        <SectionCovid active={activeBtn === 1} />
      </section>

      {/* Vaccinated Ratio Graph */}
      <section>
        <SectionVaccine />
      </section>

      {/* Service Info */}
      <section></section>
    </>
  );
}

export default MainPage;
