import React, { useState } from "react";
import styles from "../../../css/user/MyPageContent.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const mock = [
  { name: "The Table Kevin Fehling", country: "Germany" },
  { name: "Aqua", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
];

const MyBookmark = () => {
  const [flag, setFlag] = useState(0);
  const bookmarkLength = mock.length;
  const leftChevronValid = bookmarkLength > 4 && flag !== 0;
  const rightCehvronValid = bookmarkLength > 4 && flag < bookmarkLength - 4;

  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 북마크</div>
      <div className={styles.slider}>
        <button
          className={styles.slider_left_btn}
          disabled={!leftChevronValid}
          style={
            !leftChevronValid ? { color: "#d8d8d8" } : { cursor: "pointer" }
          }
          onClick={() => {
            setFlag((cur) => (cur -= 1));
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </button>
        <div className={styles.bookmark_list_container}>
          <div
            className={styles.bookmark_list}
            style={{
              width: bookmarkLength * 250 + (bookmarkLength - 1) * 25,
              transform: `translateX(${-flag * 275}px)`,
            }}
          >
            {mock.map((restaurant) => {
              return <div>{restaurant.name}</div>;
            })}
          </div>
        </div>
        <button
          className={styles.slider_right_btn}
          disabled={!rightCehvronValid}
          style={
            !rightCehvronValid ? { color: "#d8d8d8" } : { cursor: "pointer" }
          }
          onClick={() => {
            setFlag((cur) => (cur += 1));
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default MyBookmark;
