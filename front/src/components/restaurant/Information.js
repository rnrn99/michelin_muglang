import React from "react";
import { useSelector } from "react-redux";
import Googlemap from "./Googlemap";
import GoogleReviews from "./GoogleReviews";
import styles from "../../css/restaurant/Information.module.css";
import StarIcon from "@mui/icons-material/StarBorderRounded";
import FoodIcon from "@mui/icons-material/LocalDiningRounded";
import MoneyIcon from "@mui/icons-material/AttachMoneyRounded";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import CallIcon from "@mui/icons-material/Call";
import LinkIcon from "@mui/icons-material/Link";

function Information() {
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Information</span>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.information_list}>
            <div className={styles.information}>
              <StarIcon />
              <span>{restaurant.award}</span>
            </div>
            <div className={styles.information}>
              <FoodIcon />
              <span>{restaurant.cuisine.join(", ")}</span>
            </div>
            <div className={styles.information}>
              <MoneyIcon />
              {/* 환전을 어떻게 하지 */}
              <span>
                {restaurant.minPrice} - {restaurant.maxPrice} (
                {restaurant.currency})
              </span>
            </div>
            <div className={styles.information}>
              <LocationIcon />
              <span>{restaurant.address}</span>
            </div>
            <div className={styles.information}>
              <CallIcon />
              <span>{restaurant.phoneNumber}</span>
            </div>
            <div className={styles.information}>
              <LinkIcon />
              <span>
                <a
                  target="_blank"
                  href={
                    restaurant.websiteUrl
                      ? restaurant.websiteUrl
                      : restaurant.url
                  }
                >
                  Restaurant Website
                </a>
              </span>
            </div>
          </div>
          <div className={styles.map}>{/* <Googlemap /> */}</div>
        </div>
        <div className={styles.right}>
          <GoogleReviews />
        </div>
      </div>
    </div>
  );
}

export default Information;
