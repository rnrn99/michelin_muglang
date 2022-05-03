import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

import styles from "../../css/header/Header.module.css";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";

import NavLinks from "./NavLinks";
import Menu from "./Menu";

function Header() {
  const { pathname } = useLocation();
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

  // menu button visible 여부
  const menuVisible = useMediaQuery("(max-width:800px)");

  return (
    <AppBar position="fixed" sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ bgcolor: "#ffbf69" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: "black", flexGrow: 1 }}
        >
          <a href="/" className={styles.title}>
            미슐랭 먹을랭
          </a>
        </Typography>

        {!menuVisible ? (
          <NavLinks
            isLogin={isLogin}
            logout={logoutHandler}
            pathname={pathname}
          />
        ) : (
          <Menu isLogin={isLogin} logout={logoutHandler} pathname={pathname} />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
