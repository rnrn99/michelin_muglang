import React from "react";
import styles from "../../css/team/TeamPage.module.css";

function TeamPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_dj.png" alt="이동준" />
            <div className={styles.caption}>
              백엔드(팀장)
              <br />
              이동준
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_yj.png" alt="정윤지" />
            <div className={styles.caption}>
              백엔드
              <br />
              정윤지
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_en.png" alt="임은나" />
            <div className={styles.caption}>
              백엔드
              <br />
              임은나
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_sy.png" alt="배서영" />
            <div className={styles.caption}>
              프론트엔드
              <br />
              배서영
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_mg.png" alt="선민경" />
            <div className={styles.caption}>
              프론트엔드
              <br />
              선민경
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img src="images/team/craft_jy.png" alt="백지유" />
            <div className={styles.caption}>
              프론트엔드
              <br />
              백지유
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
