import React, { useState } from "react";
import styles from "../css/restaurant/RestaurantDetailPage.module.css";
import BookmarkOutlineIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Information from "./Information";

const mock = {
  restaurantName: "The Table Kevin Fehling",
  star: "2 MICHELIN Start",
  cuisine: "Creative, Modern Cuisine",
  minPrice: "110",
  maxPrice: "200",
  currency: "EUR",
  address: "Shanghaiallee 15, Hamburg, 20457, 독일",
  phoneNumber: "+49 40 22867422",
  website: "http://www.the-table-hamburg.de/",
  bookmark: "16",
};

function RestaurantDetailPage() {
  const [bookmark, setBookmark] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <span className={styles.title}>{mock.restaurantName}</span>
        <div
          className={styles.bookmark}
          onClick={() => {
            setBookmark((cur) => !cur);
          }}
        >
          {bookmark ? <BookmarkIcon /> : <BookmarkOutlineIcon />}{" "}
          {mock.bookmark}번 북마크됨
        </div>
        <Information mock={mock} />
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
