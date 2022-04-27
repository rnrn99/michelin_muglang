import React from "react";
import Slider from "./Slider";
import styles from "../../../css/user/MyBookmark.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
const mock = [
  {
    _id: "626370999dcb2f0f3041e88a",
    name: "Aqua",
    country: "Germany",
    bookmarkCount: 1,
  },
  {
    _id: "626370999dcb2f0f3041e88b",
    name: "No. 69 Fangzhuanchang Zhajiangmian (Fangzhuanchang Hutong)",
    country: "China",
    bookmarkCount: 1,
  },
  {
    _id: "626370999dcb2f0f3041e88c",
    name: "L'Auberge de St-Rémy-de-Provence - Fanny Rey & Jonathan Wahid",
    country: "France",
    bookmarkCount: 1,
  },
  {
    _id: "626370999dcb2f0f3041e88d",
    name: "The Table Kevin Fehling",
    country: "Germany",
    bookmarkCount: 1,
  },
  {
    _id: "626370999dcb2f0f3041e88e",
    name: "Fried Banana Rama 5",
    country: "Thailand",
    bookmarkCount: 1,
  },
];

const MyBookmark = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 북마크</div>
      <Slider contentLength={mock.length}>
        {mock.map((restaurant) => (
          <div className={styles.restaurant}>
            <span className={styles.restaurant_name}>{restaurant.name}</span>
            <span className={styles.restaurant_country}>
              {restaurant.country}
            </span>
            <div className={styles.icon_delete}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyBookmark;
