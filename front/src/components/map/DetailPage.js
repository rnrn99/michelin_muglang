import { useLocation } from "react-router-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";

import Header from "../header/Header";
import CountryMap from "./CountryMap";
import Restaurants from "../../data/restaurants.json";

import styles from "./DetailPage.module.css";
import "../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  const [restaurants, setRestaurants] = useState(
    Restaurants.filter((r) => r.country === countryName),
  );
  const [content, setContent] = useState("");

  const handleClick = (id) => {
    const restaurant = restaurants.filter((r) => r._id === id);
    setRestaurants(restaurant);
  };

  return (
    <>
      <Header />
      <section className={styles.detail}>
        <div className={styles.detail_restaurantsList}>
          {restaurants.map((r) => (
            <div
              className={styles.detail_restaurant}
              key={r._id}
              onClick={() => handleClick(r._id)}
            >
              <div className={styles.restaurant_box}>
                <h3 className={styles.name}>{r.name}</h3>
                <span className={styles.cuisine}>
                  {r.cuisine.map((c) => (
                    <span>{c}</span>
                  ))}
                </span>
              </div>
              <div className={styles.restaurant_box}>
                <FontAwesomeIcon icon={faLocationArrow} />
                <span style={{ marginLeft: "5px" }}>{r.address}</span>
              </div>
              <div className={styles.restaurant_box}>
                <FontAwesomeIcon icon={faPhone} />
                <span style={{ marginLeft: "5px" }}>{r.phoneNumber}</span>
              </div>
              <p style={{ color: "green" }}>영업 중</p>
            </div>
          ))}
        </div>
        <CountryMap
          countryName={countryName}
          restaurants={restaurants}
          setTooltipContent={setContent}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
};

export default DetailPage;
