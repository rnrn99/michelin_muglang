import React, { useState } from "react";
import styles from "../../../css/user/Slider.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Slider = ({ children, contenetLength }) => {
  const [flag, setFlag] = useState(0);
  const leftChevronValid = contenetLength > 4 && flag !== 0;
  const rightCehvronValid = contenetLength > 4 && flag < contenetLength - 4;

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
            width: contenetLength * 250 + (contenetLength - 1) * 25,
            transform: `translateX(${-flag * 275}px)`,
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
