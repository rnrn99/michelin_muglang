import "../../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = ({ r, handleClick }) => {
  return (
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
  );
};

export default RestaurantCard;
