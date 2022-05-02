import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../css/restaurant/NearbyRestaurants.module.css";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material/";
import { Tooltip } from "@mui/material";

function NearbyRestaurants() {
  const { restaurantNearby } = useSelector((state) => state.restaurant);
  const [flag, setFlag] = useState(0);
  const showChevron = restaurantNearby.length > 4;
  const leftChevronValid = showChevron && flag !== 0;
  const rightCehvronValid = showChevron && flag < restaurantNearby.length - 4;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.title_text}>Nearby Restaurants</span>
        <span className={styles.title_info}>
          <Tooltip
            title="반경 30km 이내에 위치한 미슐랭 레스토랑 목록입니다."
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </span>
      </div>
      <div className={styles.slider}>
        <button
          onClick={() => setFlag((cur) => (cur -= 1))}
          disabled={!leftChevronValid}
          style={
            showChevron
              ? {
                  color: leftChevronValid && "#ff9f1c",
                  cursor: leftChevronValid && "pointer",
                }
              : { color: "white" }
          }
        >
          <ChevronLeftIcon fontSize="large" />
        </button>

        <div className={styles.slider_contents}>
          <div
            className={styles.restaurants}
            style={{
              width:
                restaurantNearby.length * 235 +
                (restaurantNearby.length - 1) * 20,
              transform: `translateX(${-flag * 255}px)`,
            }}
          >
            {restaurantNearby.map((nearby) => (
              <div
                className={styles.restaurant}
                key={nearby._id}
                style={{
                  backgroundImage: `linear-gradient( rgba(100, 100, 100, 0.3), rgba(100, 100, 100, 0.3) ), url(${nearby.imageUrl[0]})`,
                }}
              >
                <a
                  href={`/restaurants/${nearby._id}`}
                  className={styles.restaurant_link}
                >
                  <span className={styles.restaurant_name}>{nearby.name}</span>
                  <span className={styles.restaurant_country}>
                    {nearby.country}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setFlag((cur) => cur + 1)}
          disabled={!rightCehvronValid}
          style={
            showChevron
              ? {
                  color: rightCehvronValid && "#ff9f1c",
                  cursor: rightCehvronValid && "pointer",
                }
              : { color: "white" }
          }
        >
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default NearbyRestaurants;
