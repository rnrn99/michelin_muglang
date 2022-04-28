import React from "react";

import styles from "../../css/header/Header.module.css";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";

import NavLinks from "./NavLinks";
import Menu from "./Menu";

function Header() {
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

        {!menuVisible ? <NavLinks /> : <Menu />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
