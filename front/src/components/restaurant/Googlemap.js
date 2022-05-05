import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Googlemap = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { placeId, address } = useSelector(
    (state) => state.restaurant.restaurantInfo,
  );
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (placeId !== "a") {
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
    <iframe
      width="540"
      height="380"
      frameBorder="0"
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      allowFullScreen
    ></iframe>
  );
};

export default Googlemap;
