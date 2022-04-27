import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/user/MyPage.module.css";
import MyBookmark from "./MyBookmark";
import MyReview from "./MyReview";
import UserUpdateModal from "./UserUpdateModal";

const MyPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.title}>
            <div className={styles.image}>
              <img src="mypageImg.svg" alt="img" />
            </div>
            <div className={styles.text}>
              <div className={styles.user}>
                <span className={styles.user_name}>{user.name}</span>
                <span className={styles.user_text}>님의 마이페이지</span>
                <div className={styles.user_email}>{user.email}</div>
              </div>
              <div
                className={styles.modify}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                회원 정보 수정하기
              </div>
            </div>
          </div>
          <MyBookmark />
          <MyReview />
        </div>
      </div>
      {isModalOpen && <UserUpdateModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default MyPage;
