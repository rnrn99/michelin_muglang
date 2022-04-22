import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const countries = ["Russia", "China", "Germany", "United Kingdom"];

const WorldMap = ({ setTooltipContent }) => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([
    {
      markerOffset: 5,
      name: "Russia",
      coordinates: [96.328125, 62.103882522897855],
    },
    {
      markerOffset: 5,
      name: "China",
      coordinates: [102.3046875, 36.03133177633187],
    },
    {
      markerOffset: -25,
      name: "Germany",
      coordinates: [9.931640625, 51.303145259199056],
    },
    {
      markerOffset: 10,
      name: "United Kingdom",
      coordinates: [-2.2412109375, 54.34214886448341],
    },
  ]);

  return (
    <ComposableMap
      projectionConfig={{
        scale: 150,
      }}
      data-tip=""
    >
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const color = countries.includes(geo.properties.NAME)
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
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => setTooltipContent(10)}
            onMouseLeave={() => setTooltipContent("")}
            onClick={() =>
              navigate("/detail", { state: { countryName: name } })
            }
          >
            <g
              fill="#2EC4B6"
              stroke="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontSize: "8px",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default WorldMap;
