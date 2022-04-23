import React from "react";

const Googlemap = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <iframe
      width="540"
      height="380"
      frameBorder="0"
      referrerPolicy="no-referrer-when-downgrade"
      src={
        "https://www.google.com/maps/embed/v1/place?key=" +
        GOOGLE_API_KEY +
        "&q=place_id:ChIJY8mKQvyOsUcRA-H7nvNI-L8"
      }
      allowFullScreen
    ></iframe>
  );
};

export default Googlemap;
