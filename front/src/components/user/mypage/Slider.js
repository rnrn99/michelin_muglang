import React, { useState } from "react";
import styles from "../../../css/user/Slider.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Slider = ({ children, contentLength }) => {
  const [flag, setFlag] = useState(0);
  const leftChevronValid = contentLength > 4 && flag !== 0;
  const rightCehvronValid = contentLength > 4 && flag < contentLength - 4;

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
            width: contentLength * 250 + (contentLength - 1) * 25,
            transform: `translateX(${-flag * 250}px)`,
          }}
        >
          {children}
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
