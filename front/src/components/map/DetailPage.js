import { useLocation } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const DetailPage = () => {
  const location = useLocation();
  const { countryName } = location.state;

  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          width: "300px",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      ></div>
      <div>
        <ComposableMap
          projectionConfig={{
            scale: 100,
          }}
          data-tip=""
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((d) => d.properties.NAME === countryName)
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EAEAEC"
                      stroke="#D6D6DA"
                    />
                  ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
};

export default DetailPage;
