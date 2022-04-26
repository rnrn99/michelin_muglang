import React, { useState } from "react";
import styles from "../../css/restaurant/LoginRequestModal.module.css";

const LoginRequestModal = ({ setIsModalOpen }) => {
  const [effect, setEffect] = useState(styles.mount);

  const handleClick = () => {
    setEffect(styles.unmount);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <div className={`${styles.container} ${effect}`}>
      <section>
        <div className={styles.content}>
          <span>로그인이 필요한 서비스입니다.</span>
          <span>로그인하시겠습니까?</span>
        </div>
        <div className={styles.buttons}>
          <div className={styles.left_btn}>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
          <div className={styles.right_btn}>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginRequestModal;
