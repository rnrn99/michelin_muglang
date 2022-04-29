import React from "react";

import { Link } from "@mui/material";
import styles from "../../css/header/Header.module.css";

function NavLinks({ isLogin, logout }) {
  return (
    <>
      <Link className={styles.menu__link} href="/map">
        <span className={styles.menu__title}>
          <span className={styles.menu__first_word} data-hover="미슐랭">
            미슐랭
          </span>
          <span className={styles.menu__second_word} data-hover="찾아보기">
            찾아보기
          </span>
        </span>
      </Link>

      <Link className={styles.menu__link} href="/team-craft">
        <span className={styles.menu__title}>
          <span className={styles.menu__first_word} data-hover="팀">
            팀
          </span>
          <span className={styles.menu__second_word} data-hover="소개">
            소개
          </span>
        </span>
      </Link>

      {!isLogin ? (
        <Link className={styles.menu__link} href="/login">
          <span className={styles.menu__title}>
            <span className={styles.menu__first_word} data-hover="LOG">
              LOG
            </span>
            <span className={styles.menu__second_word} data-hover="IN">
              IN
            </span>
          </span>
        </Link>
      ) : (
        <>
          <Link className={styles.menu__link} href="/mypage">
            <span className={styles.menu__title}>
              <span className={styles.menu__first_word} data-hover="마이">
                마이
              </span>
              <span className={styles.menu__second_word} data-hover="페이지">
                페이지
              </span>
            </span>
          </Link>

          <Link className={styles.menu__link} onClick={logout}>
            <span className={styles.menu__title}>
              <span className={styles.menu__first_word} data-hover="LOG">
                LOG
              </span>
              <span className={styles.menu__second_word} data-hover="OUT">
                OUT
              </span>
            </span>
          </Link>
        </>
      )}
    </>
  );
}

export default NavLinks;
