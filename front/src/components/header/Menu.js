import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Drawer, Box, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Menu({ isLogin, logout, pathname }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <IconButton size="large" aria-label="menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box role="presentation" onClick={() => setOpen(false)}>
          <List>
            <ListItem button onClick={() => navigate("/map")}>
              미슐랭 찾아보기
            </ListItem>
            <ListItem button onClick={() => navigate("/service-info")}>
              서비스 소개
            </ListItem>
            <ListItem button onClick={() => navigate("/team-craft")}>
              팀 소개
            </ListItem>
            {!isLogin ? (
              <ListItem
                button
                onClick={() => navigate("/login", { state: { pathname } })}
              >
                LOGIN
              </ListItem>
            ) : (
              <>
                <ListItem button onClick={() => navigate("/mypage")}>
                  마이페이지
                </ListItem>
                <ListItem button onClick={logout}>
                  LOGOUT
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Menu;
