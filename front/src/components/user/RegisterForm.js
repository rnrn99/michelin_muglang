import React, { useState } from "react";
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

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // email 저장할 상태
  const [password, setPassword] = useState(""); // password 저장할 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // cofirmPassword 저장할 상태
  const [name, setName] = useState(""); // name 저장할 상태

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
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("users/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
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
        <Typography sx={{ fontSize: "20px" }}>회원가입</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            name="email"
            label="Email"
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
            autoComplete="off"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isPasswordValid && (
            <p className="text-success">
              비밀번호는 4글자 이상으로 설정해 주세요.
            </p>
          )}

          <TextField
            required
            name="confirmpassword"
            label="비밀번호 확인"
            type="password"
            fullWidth
            autoComplete="off"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {!isPasswordSame && (
            <p className="text-success">비밀번호가 일치하지 않습니다.</p>
          )}

          <TextField
            required
            name="name"
            label="이름"
            type="text"
            fullWidth
            autoComplete="off"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {!isNameValid && (
            <p className="text-success">이름은 2글자 이상으로 설정해 주세요.</p>
          )}
          <Button
            type="submit"
            name="register"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            회원가입
          </Button>

          <Button variant="text" onClick={() => navigate("/login")}>
            로그인하기
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default RegisterForm;
