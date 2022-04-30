import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/user/UnregisterConfirmationPage.module.css";

const UnregisterConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src="unregister.svg" alt="회원탈퇴" />
      <div>회원탈퇴가 완료되었습니다.</div>
      <div>그동한 미슐랭 먹을랭 서비스를 이용해 주셔서 감사합니다.</div>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        미슐랭 먹을랭 첫 화면
      </button>
    </div>
  );
};

export default UnregisterConfirmationPage;
