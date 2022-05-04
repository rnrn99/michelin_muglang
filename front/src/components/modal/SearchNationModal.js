import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/modal/SearchNationModal.module.css";
import { countries } from "../../data/MapConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const SearchNationModal = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchedList = useMemo(() => {
    if (keyword !== "") {
      return countries.filter((c) =>
        c.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
    return [];
  }, [keyword]);

  const handleClick = (nation) => {
    navigate(`/detail?country=${nation}`);
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  return (
    <div className={styles.container}>
      <section>
        <div className={styles.input}>
          <div className={styles.input_form}>
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              value={keyword}
              placeholder="국가를 입력해주세요..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <span onClick={() => setKeyword("")} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </div>
        {searchedList.length === 0 ? (
          <div style={{ textAlign: "center" }}>검색 결과가 없습니다.</div>
        ) : (
          <div className={styles.result}>
            {searchedList.map((nation) => (
              <div className={styles.result_item}>
                <p onClick={() => handleClick(nation)}>{nation}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsModalOpen(false)}
          className={styles.closeButton}
        >
          닫기
        </button>
      </section>
    </div>
  );
};

export default SearchNationModal;
