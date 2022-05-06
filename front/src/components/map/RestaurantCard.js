import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faSquareArrowUpRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/map/RestaurantCard.module.css";

const RestaurantCard = ({ restaurant, handleClick }) => {
  return (
    <div className={`${styles.restaurant_common} ${styles.restaurant}`}>
      <div
        className={styles.detailBtn}
        onClick={() => handleClick(restaurant._id)}
      >
        <FontAwesomeIcon icon={faSquareArrowUpRight} size="2x" />
      </div>
      <div className={styles.restaurant_box}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <span className={styles.cuisine}>
          {restaurant.cuisine.map((cuisineName) => (
            <span key={cuisineName}>{cuisineName}</span>
          ))}
        </span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faLocationArrow} />
        <span style={{ marginLeft: "5px" }}>{restaurant.address}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faStar} />
        <span style={{ marginLeft: "5px" }}>{restaurant.award}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
