import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import * as Api from "../../api";

import WorldMap from "../../data/worldMap.json";
const geoUrl = WorldMap;

const CountryMap = ({
  countryName,
  restaurants,
  setTooltipContent,
  handleClick,
}) => {
  // const selectedCountry = customMap.filter(
  //   (map) => map.name === countryName,
  // )[0];
  const [geoData, setGeoData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const res = await Api.get("map/border/China");
      const data = 
        {
          "type": "FeatureCollection",
          "features": [
            res.data
          ]
        }
      setGeoData(data);
    })()
    
  }, [])

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 70 }}
      data-tip=""
    >
      <ZoomableGroup center={[90, 25]} zoom={6}>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies
              .filter((d) => d.properties.name === countryName)
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  strokeWidth="0.3"
                />
              ))
          }
        </Geographies>
        {restaurants.map(({ _id, name, latitude, longitude }) => (
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
              transform="translate(0, -1.5)"
            >
              <svg width="10px" height="10px" viewBox="0 0 100 100">
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
