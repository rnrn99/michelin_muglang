import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Card,
  Container,
  Typography,
  Box,
} from "@mui/material";
import * as Api from "../../api";
import { login } from "../../redux/action/userAction";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const dataToSubmit = {
      email,
      password,
    };
    try {
      const res = await Api.post("users/login", dataToSubmit);
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);

      dispatch(login(user));
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인 실패\n", err);
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
