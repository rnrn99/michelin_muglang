import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setupBookmarks, setupReviews } from "../../../redux/userSlice";
import { get } from "../../../api";
import styles from "../../../css/user/MyPage.module.css";
import MyBookmark from "./MyBookmark";
import MyReview from "./MyReview";
import Footer from "../../Footer";
import UserUpdateModal from "../../modal/UserUpdateModal";

const MyPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMyPageInfo = async () => {
    const getBookmarks = get("bookmarks", user.id);
    const getReviews = get("reviewlist/user", user.id);

    try {
      const [userBookmarks, userReviews] = await Promise.all([
        getBookmarks,
        getReviews,
      ]);

      dispatch(setupBookmarks(userBookmarks.data));
      dispatch(setupReviews(userReviews.data));
    } catch (e) {
      // 에러처리 어떻게 해야할까
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }

    getMyPageInfo();
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
      <Footer />
      {isModalOpen && <UserUpdateModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default MyPage;
