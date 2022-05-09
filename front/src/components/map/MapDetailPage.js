import { useLocation } from "react-router-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";

import SideBar from "./SideBar";
import CountryMap from "./CountryMap";
import styles from "../../css/map/MapDetailPage.module.css";

const DetailPage = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const countryName = params.get("country");

  const [restaurants, setRestaurants] = useState([]);
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = (restaurantId) => {
    const restaurant = restaurants.filter((r) => r._id === restaurantId);
    setRestaurants(restaurant);
    setClicked(true);
  };

  return (
    <section className={styles.container}>
      <SideBar
        countryName={countryName}
        restaurants={restaurants}
        clicked={clicked}
        handleClick={handleClick}
        setRestaurants={setRestaurants}
        setClicked={setClicked}
      />
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
