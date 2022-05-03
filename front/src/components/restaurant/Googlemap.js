import React from "react";
import { useSelector } from "react-redux";

const Googlemap = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { placeId } = useSelector((state) => state.restaurant.restaurantInfo);

  return (
    <>
      {placeId && (
        <iframe
          width="540"
          height="380"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={
            "https://www.google.com/maps/embed/v1/place?key=" +
            GOOGLE_API_KEY +
            "&q=place_id:" +
            placeId
          }
          allowFullScreen
        ></iframe>
      )}
    </>
  );
};

export default Googlemap;
