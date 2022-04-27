import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../css/user/UserUpdateModal.module.css";

const UserUpdateModal = ({ setIsModalOpen }) => {
  const { user } = useSelector((state) => state.user);
  const [effect, setEffect] = useState(styles.mount);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user.name);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleCancelClick = () => {
    setEffect(styles.unmount);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <div className={`${styles.container} ${effect}`}>
      <section>
        <span className={styles.modal_title}>회원 정보 수정</span>
        <form className={styles.update_form}>
          <div>
            <input
              type="email"
              placeholder="이메일 주소 *"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {!isEmailValid && <p>이메일 형식이 올바르지 않습니다.</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호 *"
              autoComplete="on"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!isPasswordValid && (
              <p>비밀번호는 4글자 이상으로 설정해 주세요.</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호 확인 *"
              autoComplete="on"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {!isPasswordSame && <p>비밀번호가 일치하지 않습니다.</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="이름 *"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {!isNameValid && <p>이름은 2글자 이상으로 설정해 주세요.</p>}
          </div>

          <button
            disabled={!isFormValid}
            style={
              !isFormValid
                ? { backgroundColor: "#e0e0e0", color: "#9c9c9c" }
                : {}
            }
          >
            수정
          </button>
        </form>
        <div className={styles.modal_buttons}>
          <span>회원탈퇴</span>
          <span onClick={handleCancelClick}>닫기</span>
        </div>
      </section>
    </div>
  );
};

export default UserUpdateModal;
