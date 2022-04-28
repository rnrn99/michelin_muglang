import { useLocation } from "react-router-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Header from "../../header/Header";
import CountryMap from "../CountryMap";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

import Restaurants from "../../../data/restaurants.json";

import styles from "./DetailPage.module.css";
import "../../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  const countryRestaurants = Restaurants.filter(
    (r) => r.country === countryName,
  );
  const [restaurants, setRestaurants] = useState(countryRestaurants);
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
        {!clicked && (
          <form>
            <input
              placeholder="음식점을 검색해보세요"
              className={styles.detail_searchInput}
            />
            <button type="submit" className={styles.detail_submitBtn}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        )}
        <div className={styles.detail_restaurantsList}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              handleClick={handleClick}
              clicked={clicked}
              countryRestaurants={countryRestaurants}
              setClicked={setClicked}
              setRestaurants={setRestaurants}
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
