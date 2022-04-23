import React from "react";
import Googlemap from "./Googlemap";
import GoogleReviews from "./GoogleReviews";
import styles from "../../css/restaurant/Information.module.css";
import StarIcon from "@mui/icons-material/StarBorderRounded";
import FoodIcon from "@mui/icons-material/LocalDiningRounded";
import MoneyIcon from "@mui/icons-material/AttachMoneyRounded";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import CallIcon from "@mui/icons-material/Call";
import LinkIcon from "@mui/icons-material/Link";

function Information({ mock }) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Information</span>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.information_list}>
            <div className={styles.information}>
              <StarIcon />
              <span>{mock.star}</span>
            </div>
            <div className={styles.information}>
              <FoodIcon />
              <span>{mock.cuisine}</span>
            </div>
            <div className={styles.information}>
              <MoneyIcon />
              <span>
                {mock.minPrice} - {mock.maxPrice} ({mock.currency})
              </span>
            </div>
            <hr />
            <div className={styles.information}>
              <LocationIcon />
              <span>{mock.address}</span>
            </div>
            <div className={styles.information}>
              <CallIcon />
              <span>{mock.phoneNumber}</span>
            </div>
            <div className={styles.information}>
              <LinkIcon />
              <span>{mock.website}</span>
            </div>
          </div>
          <div className={styles.map}>
            <Googlemap />
          </div>
        </div>
        <div className={styles.right}>
          <GoogleReviews />
        </div>
      </div>
    </div>
  );
}

export default Information;
