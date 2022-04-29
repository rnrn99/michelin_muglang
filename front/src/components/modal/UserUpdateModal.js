import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/userSlice";
import { put } from "../../api";
import styles from "../../css/modal/UserUpdateModal.module.css";

const UserUpdateModal = ({ setIsModalOpen }) => {
  const { user } = useSelector((state) => state.user);
  const [effect, setEffect] = useState(styles.mount);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user.name);

  const dispatch = useDispatch();

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

  const handleUpdate = async () => {
    const updatedUser = await put("users", { name, email, password });
    dispatch(update(updatedUser));
    handleCancelClick();
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `
        position: "";
        top: "";
      `;
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className={`${styles.container} ${effect}`}>
      <section>
        <span className={styles.modal_title}>회원 정보 수정</span>
        <form className={styles.update_form}>
          <div>
            <input
              id="updated-email"
              type="text"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="updated-email">
              <span>이메일 주소 *</span>
            </label>
            {!isEmailValid && <p>이메일 형식이 올바르지 않습니다.</p>}
          </div>

          <div>
            <input
              id="updated-password"
              type="password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="updated-password">
              <span>비밀번호 *</span>
            </label>
            {!isPasswordValid && (
              <p>비밀번호는 4글자 이상으로 설정해 주세요.</p>
            )}
          </div>

          <div>
            <input
              id="comfirm-password"
              type="password"
              required
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label htmlFor="comfirm-password">
              <span>비밀번호 확인 *</span>
            </label>
            {!isPasswordSame && <p>비밀번호가 일치하지 않습니다.</p>}
          </div>

          <div>
            <input
              id="updated-name"
              type="text"
              required
              autocomplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="updated-name">
              <span>이름 *</span>
            </label>
            {!isNameValid && <p>이름은 2글자 이상으로 설정해 주세요.</p>}
          </div>

          <button
            className={!isFormValid && styles.invalid_button}
            disabled={!isFormValid}
            onClick={handleUpdate}
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
