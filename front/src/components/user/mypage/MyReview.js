import React, { useState } from "react";
import styles from "../../../css/user/MyPageContent.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const mock = [
  {
    date: "2022.04.04",
    name: "The Table Kevin Fehling",
    review:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
  {
    date: "2022.04.04",
    name: "Aqua",
    review:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
  {
    date: "2022.04.04",
    name: "Restaurant Überfahrt Christian Jürgens",
    review:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
  {
    date: "2022.04.04",
    name: "Restaurant Überfahrt Christian Jürgens",
    review:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
  {
    date: "2022.04.04",
    name: "Restaurant Überfahrt Christian Jürgens",
    review:
      "나는 이 멋진 식사에 대해 할 말이 없습니다. 접시에 멋지게 보이는 형언할 수 없는 즐거움. 맛의 축제가 혀에 불을 붙일 것입니다..!",
  },
];

const MyBookmark = () => {
  const [flag, setFlag] = useState(0);
  const reviewLength = mock.length;
  const leftChevronValid = reviewLength > 4 && flag !== 0;
  const rightCehvronValid = reviewLength > 4 && flag < reviewLength - 4;

  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 리뷰</div>
      <div className={styles.slider}>
        <button
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
        <div className={styles.list_container}>
          <div
            className={styles.list}
            style={{
              width: reviewLength * 250 + (reviewLength - 1) * 25,
              transform: `translateX(${-flag * 275}px)`,
            }}
          >
            {mock.map((restaurant) => {
              return <div>{restaurant.date}</div>;
            })}
          </div>
        </div>
        <button
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
