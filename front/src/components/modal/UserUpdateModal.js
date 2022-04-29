import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, logout } from "../../redux/userSlice";
import * as Api from "../../api";
import styles from "../../css/modal/UserUpdateModal.module.css";
import { useNavigate } from "react-router-dom";

const UserUpdateModal = ({ setIsModalOpen }) => {
  const { user } = useSelector((state) => state.user);
  const [effect, setEffect] = useState(styles.mount);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmUnregister, setConfirmUnregister] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCancelClick = (e) => {
    setEffect(styles.unmount);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await Api.put("users", { name, email, password });
      dispatch(update(updatedUser.data));
      handleCancelClick();
    } catch (e) {
      setErrorMessage(e.response.data.msg);
      setTimeout(() => {
        setErrorMessage("");
      }, 3800);
    }
  };

  const handleUnregister = () => {
    try {
      Api.delete("users");
      dispatch(logout());
      navigate("/unregister");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;`;
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
        {errorMessage && (
          <div className={styles.error_message}>{errorMessage}</div>
        )}
        {confirmUnregister && (
          <div className={styles.unregister_confirmation}>
            <span>정말 탈퇴하시겠습니까?</span>
            <span onClick={handleUnregister}>탈퇴</span>
            <span
              onClick={() => {
                setConfirmUnregister(false);
              }}
            >
              취소
            </span>
          </div>
        )}
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
              autoComplete="off"
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
            className={!isFormValid ? styles.invalid_button : ""}
            disabled={!isFormValid}
            onClick={handleUpdate}
          >
            수정
          </button>
        </form>
        <div className={styles.modal_buttons}>
          <span
            onClick={() => {
              setConfirmUnregister(true);
            }}
          >
            회원탈퇴
          </span>
          <span onClick={handleCancelClick}>닫기</span>
        </div>
      </section>
    </div>
  );
};

export default UserUpdateModal;
