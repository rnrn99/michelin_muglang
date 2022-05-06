import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faPhone,
  faStar,
  faMoneyBill1Wave,
  faLink,
  faUtensils,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/map/RestaurantCard.module.css";
import { useNavigate } from "react-router-dom";

const RestaurantDetailCard = ({ restaurant, goToList }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.restaurant_common} ${styles.restaurant_clicked}`}>
      <div className={styles.restaurant_box}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <button
          className={styles.temp}
          onClick={() => navigate(`/restaurants/${restaurant._id}`)}
        >
          상세 정보 바로가기
        </button>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faBookmark} />
        <span style={{ marginLeft: "10px" }}>
          {restaurant.bookmarkCount}회 북마크됨
        </span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faUtensils} />
        <span style={{ marginLeft: "10px" }}>
          {restaurant.cuisine.map((cuisineName) => (
            <span key={cuisineName} style={{ marginRight: "5px" }}>
              {cuisineName}
            </span>
          ))}
        </span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faStar} />
        <span style={{ marginLeft: "10px" }}>{restaurant.award}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faMoneyBill1Wave} />
        <span
          style={{ marginLeft: "10px" }}
        >{`${restaurant.minPrice} ~ ${restaurant.maxPrice} ${restaurant.currency}`}</span>
      </div>
      <div className={`${styles.restaurant_box} ${styles.seperate}`}>
        <FontAwesomeIcon icon={faLocationArrow} />
        <span style={{ marginLeft: "10px" }}>{restaurant.address}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faPhone} />
        <span style={{ marginLeft: "10px" }}>{restaurant.phoneNumber}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faLink} />
        <a
          className={styles.restaurant_link}
          href={restaurant.websiteUrl ? restaurant.websiteUrl : restaurant.url}
          target="_blank"
          style={{ marginLeft: "10px" }}
        >
          Restaurant Website
        </a>
      </div>
      <div className={styles.container_returnBtn}>
        <a className={styles.returnBtn} onClick={goToList}>
          음식점 리스트로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default RestaurantDetailCard;
