import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import WorldMap from "./WorldMap";
import styles from "../../css/map/MapMainPage.module.css";
import SearchNationModal from "../modal/SearchNationModal";

const MapMainPage = () => {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <WorldMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <button
        className={styles.button_search}
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
      </button>
      {isModalOpen && <SearchNationModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default MapMainPage;
