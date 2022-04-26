import React from "react";
import Slider from "./Slider";
import styles from "../../../css/user/MyContent.module.css";
const mock = [
  { name: "The Table Kevin Fehling", country: "Germany" },
  { name: "Aqua", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
  { name: "Restaurant Überfahrt Christian Jürgens", country: "Germany" },
];

const MyBookmark = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 북마크</div>
      <Slider contenetLength={mock.length}>
        {mock.map((restaurant) => (
          <div>{restaurant.name}</div>
        ))}
      </Slider>
    </div>
  );
};

export default MyBookmark;
