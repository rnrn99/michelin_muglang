import React, { useState, useEffect } from "react";
import styles from "../../css/modal/LoginRequestModal.module.css";

const LoginRequestModal = ({ setLoginRequestModal }) => {
  const [effect, setEffect] = useState(styles.mount);

  const handleClick = () => {
    setEffect(styles.unmount);
    setTimeout(() => {
      setLoginRequestModal(false);
    }, 300);
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
        <div className={styles.content}>
          <span>로그인이 필요한 서비스입니다.</span>
          <span>로그인하시겠습니까?</span>
        </div>
        <div className={styles.buttons}>
          <div className={styles.left_btn}>
            <button>
              <a href="/login">로그인</a>
            </button>
            <button>
              <a href="/register">회원가입</a>
            </button>
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
