import React from "react";
import styles from "../../../css/user/MyPage.module.css";
import MyBookmark from "./MyBookmark";
import MyReview from "./MyReview";

const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>
          <div className={styles.image}>
            <img src="mypageImg.svg" alt="img" />
          </div>
          <div className={styles.text}>
            <div className={styles.user}>
              <span className={styles.user_name}>엘리스</span>
              <span className={styles.user_text}>님의 마이페이지</span>
              <div className={styles.user_email}>test@elice.com</div>
            </div>
            <div className={styles.modify}>회원 정보 수정하기</div>
          </div>
        </div>
        <MyBookmark />
        <MyReview />
      </div>
    </div>
  );
};

export default MyPage;
