import React from "react";
import { gsap } from "gsap";
import styles from "../../css/main/MainPage.module.css";
import SectionCovid from "./SectionCovid";

function MainPage() {
  return (
    <div>
      {/* Greeting */}
      <section>
        <div className={styles.greeting}>
          <h1>
            <span>끝나가는 코로나!</span>{" "}
            <span>이제는 맛집을 찾으러 여행할 타이밍.</span>
          </h1>
          <p>미슐랭 먹을랭과 함께 전세계 맛집을 탐방해요!</p>
          <div>
            <a href="/">미슐랭 찾아보기 →</a>
          </div>
        </div>
        <div className={styles.greeting_img}>
          <img src="greeting.png" alt="main_img" />
        </div>
      </section>

      {/* Graph */}
      <section id={styles.sectionPin}>
        <div className={styles.pin_wrap}>
          <h2>
            예전처럼 다시 <br />
            여행갈 수 있을까요?
          </h2>
          <SectionCovid />
          <SectionCovid />
        </div>
      </section>

      {/* Service */}
      <section></section>
    </div>
  );
}

export default MainPage;
