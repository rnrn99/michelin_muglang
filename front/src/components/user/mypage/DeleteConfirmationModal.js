import React, { useState } from "react";
import styles from "../../../css/user/DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ setIsModalOpen, modalContent }) => {
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
          <span>{modalContent} 정말 삭제하시겠습니까?</span>
        </div>
        <div className={styles.buttons}>
          <div className={styles.left_btn}>
            <button>
              <a href="#">삭제</a>
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

export default DeleteConfirmationModal;
