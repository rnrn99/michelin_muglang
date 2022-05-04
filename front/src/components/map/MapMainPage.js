import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import WorldMap from "./WorldMap";
import styles from "../../css/map/MapMainPage.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapMainPage = () => {
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <WorldMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <button
        className={styles.button_search}
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
      </button>
    </div>
  );
};

export default MapMainPage;
