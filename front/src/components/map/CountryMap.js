import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

import WorldMap from "../../data/worldMap.json";
import ChinaMap from "../../data/china.json";

const geoUrl = WorldMap;

const CountryMap = ({ countryName, restaurants, setTooltipContent }) => {
  return (
    <ComposableMap
      width={800}
      height={400}
      projection="geoMercator"
      projectionConfig={{ scale: 70 }}
      data-tip=""
    >
      <ZoomableGroup center={[90, 35]} zoom={5}>
        {countryName === "China" ? (
          <Geographies geography={ChinaMap}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#FFF"
                    stroke="#D6D6DA"
                    strokeWidth="0.2"
                  />
                );
              })
            }
          </Geographies>
        ) : (
          <Geographies geography={geoUrl}>
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
        )}
        {restaurants.map(({ name, latitude, longitude }) => (
          <Marker
            key={name}
            coordinates={[longitude, latitude]}
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
