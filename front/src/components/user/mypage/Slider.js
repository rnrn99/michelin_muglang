import React, { useState } from "react";
import styles from "../../../css/user/Slider.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Slider = ({ children, contentNum, noContentText }) => {
  const [flag, setFlag] = useState(0);
  const leftChevronValid = contentNum > 4 && flag !== 0;
  const rightCehvronValid = contentNum > 4 && flag < contentNum - 4;
  const cardWidth = 230;
  const cardGap = 20;
  const sliderWidth = 1000;

  return (
    <div className={styles.slider}>
      <button
        disabled={!leftChevronValid}
        style={leftChevronValid ? { cursor: "pointer" } : { color: "#d8d8d8" }}
        onClick={() => {
          setFlag((cur) => (cur -= 1));
        }}
      >
        <ChevronLeftIcon fontSize="large" />
      </button>
      <div className={styles.list_container}>
        <div
          className={styles.list}
          style={{
            width:
              contentNum * cardWidth + (contentNum - 1) * cardGap + sliderWidth,
            transform: `translateX(${-flag * 250}px)`,
          }}
        >
          <>
            {children}
            {contentNum < 1 && (
              <div className={styles.no_content}>{noContentText}</div>
            )}
            {contentNum < 2 && (
              <div className={styles.no_content}>{noContentText}</div>
            )}
            {contentNum < 3 && (
              <div className={styles.no_content}>{noContentText}</div>
            )}
            {contentNum < 4 && (
              <div className={styles.no_content}>{noContentText}</div>
            )}
          </>
        </div>
      </div>
      <button
        disabled={!rightCehvronValid}
        style={rightCehvronValid ? { cursor: "pointer" } : { color: "#d8d8d8" }}
        onClick={() => {
          setFlag((cur) => (cur += 1));
        }}
      >
        <ChevronRightIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Slider;
