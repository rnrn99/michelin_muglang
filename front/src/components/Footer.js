import React from "react";
import styles from "../css/footer/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div>미슐랭 먹을랭</div>
          <div>© 2022, 크래프트(수제 코드 맛집) All rights reserved</div>
        </div>
        <div className={styles.right}>
          <div>엘리스 AI 트랙.</div>
          <div>데이터 분석 웹 서비스 프로젝트</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
