import React, { useState } from "react";
import styles from "../css/restaurant/Review.module.css";

let mock = [
  {
    username: "엘리스",
    date: "2030.04.04",
    content:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
  {
    username: "토끼",
    date: "2040.04.04",
    content:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
];

function Review() {
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(mock);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewText) return;

    const today = new Date();
    const y = today.getFullYear();
    const m =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : `${today.getMonth() + 1}`;
    const d =
      today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    const date = `${y}.${m}.${d}`;
    setReviewList((cur) => {
      return [...cur, { username: "김뚜떼", date, content: reviewText }];
    });
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Review</span>
      <div className={styles.review_input}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="리뷰를 입력해주세요."
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div className={styles.review_list}>
        {reviewList.map((review, idx) => {
          return (
            <div className={styles.review} key={idx}>
              <div>
                <span className={styles.username}>{review.username}</span>
                <span className={styles.date}>{review.date}</span>
              </div>
              <div className={styles.content}>{review.content}</div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Review;
