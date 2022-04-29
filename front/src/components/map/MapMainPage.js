import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import WorldMap from "./WorldMap";

const MapMainPage = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <WorldMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default MapMainPage;
