import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

import { Link } from "@mui/material";
import styles from "../../css/header/Header.module.css";

function NavLinks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태
  const isLogin = !!userState.user;

  // 로그아웃 핸들러
  const logoutHandler = () => {
    sessionStorage.removeItem("userToken");
    dispatch(logout(userState));
    navigate("/");
  };

  return (
    <>
      <Link className={styles.menu__link}>
        <span className={styles.menu__title}>
          <span className={styles.menu__first_word} data-hover="미슐랭">
            미슐랭
          </span>
          <span className={styles.menu__second_word} data-hover="찾아보기">
            찾아보기
          </span>
        </span>
      </Link>

      <Link className={styles.menu__link}>
        <span className={styles.menu__title}>
          <span className={styles.menu__first_word} data-hover="팀">
            팀
          </span>
          <span className={styles.menu__second_word} data-hover="소개">
            소개
          </span>
        </span>
      </Link>

      {isLogin ? (
        <>
          <Link className={styles.menu__link}>
            <span className={styles.menu__title}>
              <span className={styles.menu__first_word} data-hover="마이">
                마이
              </span>
              <span className={styles.menu__second_word} data-hover="페이지">
                페이지
              </span>
            </span>
          </Link>

          <Link className={styles.menu__link} href="#" onClick={logoutHandler}>
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
      ) : (
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
      )}
    </>
  );
}

export default NavLinks;
