import "../../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = ({ restaurant, handleClick }) => {
  return (
    <div
      className={styles.detail_restaurant}
      onClick={() => handleClick(restaurant._id)}
    >
      <div className={styles.restaurant_box}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <span className={styles.cuisine}>
          {restaurant.cuisine.map((cuisineName) => (
            <span>{cuisineName}</span>
          ))}
        </span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faLocationArrow} />
        <span style={{ marginLeft: "5px" }}>{restaurant.address}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faPhone} />
        <span style={{ marginLeft: "5px" }}>{restaurant.phoneNumber}</span>
      </div>
      <p style={{ color: "green" }}>영업 중</p>
    </div>
  );
};

export default RestaurantCard;
