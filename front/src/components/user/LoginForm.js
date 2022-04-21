import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Card,
  Container,
  Typography,
  Box,
} from "@mui/material";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState(""); // email 저장할 상태
  const [password, setPassword] = useState(""); // password 저장할 상태

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>로그인</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            required
            name="email"
            label="이메일 주소"
            fullWidth
            autoComplete="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isEmailValid && (
            <p className="text-success">이메일 형식이 올바르지 않습니다.</p>
          )}

          <TextField
            required
            name="password"
            label="비밀번호"
            type="password"
            fullWidth
            autoComplete="current-password"
            value={password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isPasswordValid && (
            <p className="text-success">비밀번호는 4글자 이상입니다.</p>
          )}

          <Button
            type="submit"
            name="LOGIN"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            로그인
          </Button>

          <Button variant="text" onClick={() => navigate("/register")}>
            회원가입하기
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default LoginForm;
