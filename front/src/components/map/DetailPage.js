import { useLocation } from "react-router-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";

import Header from "../header/Header";
import CountryMap from "./CountryMap";

import styles from "./DetailPage.module.css";
import "../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  const [content, setContent] = useState("");
  const [restaurants, setRestaurants] = useState([
    {
      name: "Xin Rong Ji",
      address: "8 Xinyuan South Road, Beijing, China Mainland",
      location: "Beijing",
      longitude: 116.450148,
      latitude: 39.94638,
      cuisine: "타이저우 음식",
      phoneNumber: "+861065015501",
    },
    {
      name: "Taian Table",
      address: "No.161, Lane 465, Zhenning Road, Shanghai, China Mainland",
      location: "Shanghai",
      longitude: 121.474049,
      latitude: 31.221807,
      cuisine: "이노베이티브",
      phoneNumber: "+8617301605350",
    },
    {
      name: "Jingji",
      address: "83A Jianguo Road, Beijing, China Mainland",
      location: "Beijing",
      longitude: 116.4856,
      latitude: 39.910623,
      cuisine: "베이징 음식",
      phoneNumber: "+861059695698",
    },
    {
      name: "Jiang by Chef Fei",
      address: "389 Tianhe Road, Guangzhou, China Mainland",
      location: "Guangzhou",
      longitude: 113.327867,
      latitude: 23.137134,
      cuisine: "광둥 음식",
      phoneNumber: "+862038088885",
    },
    {
      name: "Jiang by Chef Fe",
      address: "389 Tianhe Road, Guangzhou, China Mainland",
      location: "Guangzhou",
      longitude: 113.327867,
      latitude: 23.137134,
      cuisine: "광둥 음식",
      phoneNumber: "+862038088885",
    },
    {
      name: "Jiang by Chef F",
      address: "389 Tianhe Road, Guangzhou, China Mainland",
      location: "Guangzhou",
      longitude: 113.327867,
      latitude: 23.137134,
      cuisine: "광둥 음식",
      phoneNumber: "+862038088885",
    },
  ]);

  return (
    <>
      <Header />
      <section className={styles.detail}>
        <div className={styles.detail_restaurantsList}>
          {restaurants.map((r) => (
            <div className={styles.detail_restaurant} key={r.name}>
              <div className={styles.restaurant_box}>
                <h3 className={styles.name}>{r.name}</h3>
                <span className={styles.cuisine}>{r.cuisine}</span>
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
