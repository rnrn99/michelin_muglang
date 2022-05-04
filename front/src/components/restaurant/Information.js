import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../../api";
import Googlemap from "./Googlemap";
import GoogleReviews from "./GoogleReviews";
import { currencyList } from "./currency";
import styles from "../../css/restaurant/Information.module.css";
import {
  StarBorderRounded as StarIcon,
  LocalDiningRounded as FoodIcon,
  AttachMoneyRounded as MoneyIcon,
  LocationOnOutlined as LocationIcon,
  Call as CallIcon,
  Link as LinkIcon,
  ArrowRightOutlined as ArrowIcon,
  CurrencyExchangeOutlined as ExchangeIcon,
  CheckCircleOutlineOutlined as CheckIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

function Information() {
  const { restaurantInfo } = useSelector((state) => state.restaurant);
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [currency, setCurrency] = useState("KRW");
  const [exchangePrice, setExchangePrice] = useState({
    minPrice: 0,
    maxPrice: 0,
    date: "",
    name: "",
  });
  const exchangeDate = exchangePrice.date.split("/");

  const onClickExchangeBtn = () => {
    setShowSelectBox((cur) => !cur);
  };

  const changeCurrency = (e) => {
    setCurrency(e.target.value);
    get("restaurants", restaurantInfo._id, { currency: e.target.value }).then(
      (res) => {
        setExchangePrice(res.data.data);
        setShowSelectBox(false);
      },
    );
  };

  const SelectBox = () => {
    return (
      <select value={currency} onChange={changeCurrency}>
        {currencyList.map(([cur, country]) => (
          <option key={cur} value={cur}>
            {country}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {
    if (restaurantInfo._id && restaurantInfo.currency === "KRW") {
      get("restaurants", restaurantInfo._id, { currency: "USD" }).then(
        (res) => {
          setExchangePrice(res.data.data);
          setCurrency("USD");
        },
      );
    } else if (restaurantInfo._id) {
      get("restaurants", restaurantInfo._id, { currency: "KRW" }).then(
        (res) => {
          setExchangePrice(res.data.data);
        },
      );
    }
  }, [restaurantInfo._id]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Information</span>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.information_list}>
            <div className={styles.information}>
              <StarIcon />
              <span>{restaurantInfo.award}</span>
            </div>
            <div className={styles.information}>
              <FoodIcon />
              <span>{restaurantInfo.cuisine?.join(", ")}</span>
            </div>
            <div className={styles.information}>
              <MoneyIcon />
              <span>
                {restaurantInfo.minPrice === restaurantInfo.maxPrice
                  ? restaurantInfo.minPrice
                  : `${restaurantInfo.minPrice} - ${restaurantInfo.maxPrice}`}{" "}
                ({restaurantInfo.currency})
              </span>
              <ArrowIcon />
              {showSelectBox && (
                <>
                  <SelectBox />
                  <CheckIcon
                    className={styles.check_btn}
                    onClick={() => {
                      setShowSelectBox(false);
                    }}
                  />
                </>
              )}
              {!showSelectBox && (
                <>
                  <span>
                    {exchangePrice.minPrice === exchangePrice.maxPrice
                      ? Math.round(exchangePrice.minPrice)
                      : `${Math.round(exchangePrice.minPrice)} - ${Math.round(
                          exchangePrice.maxPrice,
                        )}`}{" "}
                    ({currency})
                  </span>
                  <Tooltip
                    title={`${exchangeDate[2]}년 ${exchangeDate[1]}월 ${exchangeDate[0]}일 환율 기준으로 환전합니다.`}
                    arrow
                    placement="top"
                  >
                    <ExchangeIcon
                      className={styles.exchange_btn}
                      onClick={onClickExchangeBtn}
                    />
                  </Tooltip>
                </>
              )}
            </div>
            <div className={styles.information}>
              <LocationIcon />
              <span>{restaurantInfo.address}</span>
            </div>
            <div className={styles.information}>
              <CallIcon />
              <span>{restaurantInfo.phoneNumber}</span>
            </div>
            <div className={styles.information}>
              <LinkIcon />
              <span>
                <a
                  target="_blank"
                  href={
                    restaurantInfo.websiteUrl
                      ? restaurantInfo.websiteUrl
                      : restaurantInfo.url
                  }
                  alt="website"
                  rel="noreferrer"
                >
                  Restaurant Website
                </a>
              </span>
            </div>
          </div>
          <div className={styles.map}>
            <Googlemap />
          </div>
        </div>
        <div className={styles.right}>
          <GoogleReviews />
        </div>
      </div>
    </div>
  );
}

export default Information;
