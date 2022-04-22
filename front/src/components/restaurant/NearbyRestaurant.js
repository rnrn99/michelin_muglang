import React from "react";
import styles from "../../css/restaurant/NearbyRestaurant.module.css";

function NearbyRestaurant() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Nearby Restaurant</span>
      <div className={styles.restaurants}>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
        <div className={styles.restaurant}></div>
      </div>
    </div>
  );
}

export default NearbyRestaurant;
