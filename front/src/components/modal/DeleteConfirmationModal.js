import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as Api from "../../api";
import styles from "../../css/modal/DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({
  setIsModalOpen,
  modalContent,
  api,
  action,
}) => {
  const [effect, setEffect] = useState(styles.mount);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setEffect(styles.unmount);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 200);
  };

  const handleDelete = () => {
    Api.delete(api.endpoint, api.params);
    dispatch(action);
    handleCancel();
  };

  return (
    <div className={`${styles.container} ${effect}`}>
      <section>
        <div className={styles.content}>
          <span>{modalContent} 정말 삭제하시겠습니까?</span>
        </div>
        <div className={styles.buttons}>
          <div className={styles.left_btn}>
            <button onClick={handleDelete}>삭제</button>
          </div>
          <div className={styles.right_btn}>
            <button
              onClick={() => {
                handleCancel();
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
