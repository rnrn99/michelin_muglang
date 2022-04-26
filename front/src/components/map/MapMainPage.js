import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import WorldMap from "./WorldMap";
import Header from "../header/Header";

const MapMainPage = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <Header />
      <WorldMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default MapMainPage;
