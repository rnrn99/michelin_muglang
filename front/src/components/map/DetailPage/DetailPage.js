import { useLocation } from "react-router-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";

import Header from "../../header/Header";
import CountryMap from "../CountryMap";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

import Restaurants from "../../../data/restaurants.json";

import styles from "./DetailPage.module.css";
import "../../reset.css";

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  const [restaurants, setRestaurants] = useState(
    Restaurants.filter((r) => r.country === countryName),
  );
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = (id) => {
    const restaurant = restaurants.filter((r) => r._id === id);
    setRestaurants(restaurant);
    setClicked(true);
  };

  return (
    <>
      <Header />
      <section className={styles.detail}>
        <div className={styles.detail_restaurantsList}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              handleClick={handleClick}
              clicked={clicked}
              setContent={setClicked}
            />
          ))}
        </div>

        <CountryMap
          countryName={countryName}
          restaurants={restaurants}
          setTooltipContent={setContent}
          handleClick={handleClick}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
};

export default DetailPage;
