import { useState } from "react";
import { Button, TextField, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "../../css/account/Account.module.css";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("password-reset", {
        email,
      });
      //console.log(res);
      const {
        data: { msg },
      } = res.data;
      setMessage(msg);
    } catch (err) {
      setMessage("등록된 이메일이 아니거나, 이메일을 잘못 입력했습니다.");
    }
    setIsSubmitted(true);
    setEmail("");
  };
  return (
    <div className={`${styles.container} ${styles.reset}`}>
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
        <Typography sx={{ fontSize: "20px" }}>임시 비밀번호 발급</Typography>
        <div>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <StyledTextField
              required
              label="이메일을 입력해주세요"
              autoComplete="email"
              margin="normal"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <StyledButton
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={!email}
              fullWidth
            >
              전송
            </StyledButton>
          </form>

          {isSubmitted && (
            <div style={{ textAlign: "center", margin: "20px 0px" }}>
              <h4 style={{ color: "green" }}>{message}</h4>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={() => navigate("/register")}
              sx={{ color: "#FF9F1C" }}
            >
              회원가입하기
            </Button>

            <Button
              variant="text"
              sx={{ color: "#FF9F1C" }}
              onClick={() => navigate("/login")}
            >
              로그인하기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordResetPage;

const StyledTextField = styled(TextField)({
  width: "350px",
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
  width: "350px",
  backgroundColor: "#FF9F1C",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#FFBF69",
  },
});
