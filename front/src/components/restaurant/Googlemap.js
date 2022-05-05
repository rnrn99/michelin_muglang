import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";

const Googlemap = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { placeId, address } = useSelector(
    (state) => state.restaurant.restaurantInfo,
  );
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (placeId !== "aaa") {
      setSrc(
        "https://www.google.com/maps/embed/v1/place?key=" +
          GOOGLE_API_KEY +
          "&q=place_id:" +
          placeId,
      );
    } else {
      setSrc(
        "https://www.google.com/maps/embed/v1/place?key=" +
          GOOGLE_API_KEY +
          "&q=" +
          address,
      );
    }
  }, [placeId]);

  return (
    <Tooltip
      title="호텔 내의 레스토랑의 경우 호텔의 정보가 나올 수 있습니다."
      arrow
      placement="bottom"
    >
      <iframe
        width="540"
        height="380"
        frameBorder="0"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        allowFullScreen
      ></iframe>
    </Tooltip>
  );
};

export default Googlemap;
