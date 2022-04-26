import React from "react";
import styles from "../../css/main/MainPage.module.css";
import SectionCovid from "./SectionCovid";
import { FullPage, Slide } from "react-full-page";

function MainPage() {
  return (
    <FullPage controls>
      {/* Greeting */}
      <Slide>
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
      </Slide>

      {/* Covid Weekly Graph */}
      <Slide>
        <section className={styles.graph}>
          <SectionCovid container={styles.container} />
        </section>
      </Slide>

      {/* Vaccinated Ratio Graph */}
      <Slide>
        <section className={styles.graph}></section>
      </Slide>

      {/* Service Info */}
      <Slide>
        <section></section>
      </Slide>
    </FullPage>
  );
}

export default MainPage;
