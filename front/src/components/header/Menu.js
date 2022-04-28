import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Drawer, Box, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Menu({ isLogin, logout }) {
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
            <ListItem button>미슐랭 찾아보기</ListItem>
            <ListItem button>팀 소개</ListItem>
            {!isLogin ? (
              <ListItem button onClick={() => navigate("/login")}>
                LOG IN
              </ListItem>
            ) : (
              <>
                <ListItem button>마이페이지</ListItem>
                <ListItem button onClick={logout}>
                  LOG OUT
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
