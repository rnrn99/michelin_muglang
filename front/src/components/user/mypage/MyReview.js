import React, { useState } from "react";
import Slider from "./Slider";
import styles from "../../../css/user/MyContent.module.css";

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
  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 리뷰</div>
      <Slider contenetLength={mock.length}>
        {mock.map((review) => (
          <div>{review.date}</div>
        ))}
      </Slider>
    </div>
  );
};

export default MyBookmark;
