import { useEffect, useState } from "react";
import * as Api from "../../api";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import WorldMapJson from "../../data/worldMap.json";

const geoUrl = WorldMapJson;

const countries = [
  "Germany",
  "United Kingdom",
  "Austria",
  "China",
  "Macao",
  "Hong Kong",
  "Spain",
  "Japan",
  "South Korea",
  "Italy",
  "United States",
  "Sweden",
  "Norway",
  "Denmark",
  "Singapore",
  "Taiwan",
  "Netherlands",
  "Switzerland",
  "France",
  "Belgium",
  "Ireland",
  "Thailand",
  "Portugal",
  "Greece",
  "Slovenia",
  "Luxembourg",
  "Brazil",
  "Malta",
  "Andorra",
  "San Marino",
  "Czechia",
  "Iceland",
  "Finland",
  "Croatia",
  "Hungary",
  "Poland",
  "Serbia",
];

const WorldMap = ({ setTooltipContent }) => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchWorldMapMarker = async () => {
      const res = await Api.get("map/world/geojson");
      const { features } = res.data;
      setMarkers(features);
    };
    fetchWorldMapMarker();
  }, []);

  return (
    <ComposableMap
      projectionConfig={{
        scale: 180,
      }}
      data-tip=""
    >
      <Geographies geography={geoUrl} style={{ pointerEvents: "none" }}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const color = countries.includes(geo.properties.name)
              ? "#CBF3F0"
              : "#FFFFFF";
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={color}
                stroke="#D6D6DA"
              />
            );
          })
        }
      </Geographies>
      {markers.map(
        ({ geometry: { coordinates }, properties: { _id, nation, count } }) => (
          <Marker
            key={_id}
            coordinates={coordinates}
            onMouseEnter={() => setTooltipContent(`${nation}:${count}`)}
            onMouseLeave={() => setTooltipContent("")}
            onClick={() =>
              navigate(`/detail`, { state: { countryName: nation } })
            }
          >
            <g
              fill="#2EC4B6"
              stroke="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-5, -10)"
            >
              <svg width="60px" height="60px" viewBox="0 0 100 100">
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </svg>
            </g>
          </Marker>
        ),
      )}
    </ComposableMap>
  );
};

export default WorldMap;
