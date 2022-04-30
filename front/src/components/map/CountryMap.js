import { useState, useEffect } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import * as Api from "../../api";
import customMap from "../../data/customMap.json";

const CountryMap = ({
  countryName,
  restaurants,
  setTooltipContent,
  handleClick,
}) => {
  const { center_first, center_second, zoom, size } = customMap.filter(
    (map) => map.name === countryName,
  )[0];

  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await Api.get(`map/border/${countryName}`);
      const data = {
        type: "FeatureCollection",
        features: [res.data],
      };
      setGeoData(data);
    })();
  }, []);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 70 }}
      data-tip=""
    >
      <ZoomableGroup center={[center_first, center_second]} zoom={zoom}>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ff9f1c"
                stroke="#ff9f1c"
                strokeWidth="0.15"
              />
            ))
          }
        </Geographies>
        {restaurants &&
          restaurants.map(({ _id, name, latitude, longitude }) => (
            <Marker
              key={_id}
              coordinates={[longitude, latitude]}
              onClick={() => handleClick(_id)}
              onMouseEnter={() => setTooltipContent(name)}
              onMouseLeave={() => setTooltipContent("")}
            >
              <g
                fill="#2EC4B6"
                stroke="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-0.5, -4.3)"
              >
                <svg width={size} height="10px" viewBox="0 0 100 100">
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </svg>
              </g>
            </Marker>
          ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default CountryMap;
