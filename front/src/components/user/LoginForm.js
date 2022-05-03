import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import * as Api from "../../api";
import { Button, TextField, Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "../../css/account/Account.module.css";

const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?client_id=917b9ed78684b8588577e8aced2a84d2&redirect_uri=http://localhost:5000/users/login/kakao&response_type=code";

function LoginForm() {
  const [email, setEmail] = useState(""); // email 저장할 상태
  const [password, setPassword] = useState(""); // password 저장할 상태

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

      if (location.state) {
        navigate(location.state.pathname);
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log("로그인 실패\n", err);
    }
  };

  const handleGoToRegister = () => {
    if (location.state) {
      navigate("/register", {
        state: { pathname: location.state.pathname },
      });
    } else {
      navigate("/register");
    }
  };

  return (
    <div className={`${styles.container} ${styles.login}`}>
      <Card
        sx={{
          display: "flex",
          position: "absolute",
          width: "420px",
          top: "25%",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
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
          <StyledTextField
            required
            name="email"
            label="이메일 주소"
            fullWidth
            autoComplete="email"
            margin="normal"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isEmailValid && (
            <p style={{ color: "#FF9F1C" }}>이메일 형식이 올바르지 않습니다.</p>
          )}

          <StyledTextField
            required
            name="password"
            label="비밀번호"
            type="password"
            fullWidth
            autoComplete="current-password"
            margin="normal"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isPasswordValid && (
            <p style={{ color: "#FF9F1C" }}>비밀번호는 4글자 이상입니다.</p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <StyledButton
              type="submit"
              name="LOGIN"
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              로그인
            </StyledButton>

            <a
              href={KAKAO_AUTH_URL}
              style={{ marginTop: "24px", marginBottom: "8px" }}
            >
              <img
                src="images/kakao_login_button.png"
                alt="카카오 로그인"
                width="200px"
              />
            </a>
          </div>

          <Button
            variant="text"
            onClick={handleGoToRegister}
            sx={{ color: "#FF9F1C" }}
          >
            회원가입하기
          </Button>
        </Box>
      </Card>
    </div>
  );
}

export default LoginForm;

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FF9F1C",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FF9F1C",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#FF9F1C",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#FF9F1C",
  width: "200px",
  height: "49.17px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#FFBF69",
  },
});
