import { useState, useEffect } from "react";

import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import RestaurantCard from "./RestaurantCard";
import styles from "../../css/map/SideBar.module.css";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";
const perPage = 10;

const SideBar = ({
  countryName,
  restaurants,
  clicked,
  handleClick,
  setRestaurants,
  setClicked,
}) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("음식점 이름");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
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
          <div className={styles.searchForm}>
            <form>
              <select className={styles.searchForm_select}>
                <option value="name">음식점 이름</option>
                <option value="address">주소</option>
                <option value="location">{"지역(도시)"}</option>
                <option value="cuisine">요리 종류</option>
                <option value="award">미슐랭 등급</option>
              </select>
              <input
                placeholder="음식점을 검색해보세요"
                className={styles.searchForm_container_input}
              />
              <button
                type="submit"
                className={styles.searchForm_container_submitBtn}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
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
    </>
  );
};

export default SideBar;
