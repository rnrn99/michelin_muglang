import React from "react";
import styles from "../../css/restaurant/NearbyRestaurants.module.css";

function NearbyRestaurants() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Nearby Restaurants</span>
      <div className={styles.restaurants}>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
      </div>
    </div>
  );
}

export default NearbyRestaurants;
