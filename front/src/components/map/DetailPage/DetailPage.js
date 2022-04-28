import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ReactTooltip from "react-tooltip";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import CountryMap from "../CountryMap";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

import Restaurants from "../../../data/restaurants.json";

import styles from "./DetailPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";
const perPage = 10;

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  const [restaurantList, setRestaurantList] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(
        serverUrl +
          `restaurants?country=${countryName}&page=${page}&pageSize=${perPage}`,
      );
      setRestaurantList(res.data);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, [page]);

  const handleClick = (id) => {
    const restaurant = restaurants.filter((r) => r._id === id);
    setRestaurants(restaurant);
    setClicked(true);
  };

  return (
    <section className={styles.detail}>
      {!clicked && (
        <>
          <button
            className={styles.prevBtn}
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={styles.nextBtn}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= 3}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}

      <div className={styles.detail_restaurantsList}>
        {!clicked && (
          <>
            <form>
              <input
                placeholder="음식점을 검색해보세요"
                className={styles.searchForm_input}
              />
              <button type="submit" className={styles.searchForm_submitBtn}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </>
        )}
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            handleClick={handleClick}
            clicked={clicked}
            restaurantList={restaurantList}
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
  );
};

export default DetailPage;
