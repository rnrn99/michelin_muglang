import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setup } from "../../redux/restaurantSlice";
import { get } from "../../api";
import styles from "../../css/restaurant/RestaurantDetailPage.module.css";
import BookmarkOutlineIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Information from "./Information";
import Review from "./Review";
import NearbyRestaurant from "./NearbyRestaurant";

const mockBookmark = 16;

function RestaurantDetailPage() {
  const [bookmark, setBookmark] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  const getRestaurantInfo = async () => {
    const res = await get("restaurants", id);
    const data = res.data;
    dispatch(setup(data));
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <span className={styles.title}>{restaurant.name}</span>
        <div
          className={styles.bookmark}
          onClick={() => {
            setBookmark((cur) => !cur);
          }}
        >
          {bookmark ? <BookmarkIcon /> : <BookmarkOutlineIcon />} {mockBookmark}
          번 북마크됨
        </div>
        <Information />
        <Review />
        <NearbyRestaurant />
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
