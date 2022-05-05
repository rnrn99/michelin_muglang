import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../../css/info/InfoPage.module.css";
import MonthlyGraph from "./MonthlyGraph";
import ReviewGraph from "./ReviewGraph";
import MichelinGraph from "./MichelinGraph";
import Footer from "../Footer";

function InfoPage() {
  const sectionRef = useRef(null);
  const pointRef = useRef(null);
  const [section, setSection] = useState([]); // section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 nav btn 저장할 상태
  const headerHeight = 32;

  // nav 버튼 클릭 핸들러
  const clickPointBtn = (e) => {
    if (e.target.id) {
      const pageNum = e.target.id;

      window.scrollTo({
        top: section[pageNum].offsetTop - headerHeight,
        behavior: "smooth",
      });

      setActiveBtn(pageNum);
    }
  };

  const handleScrollEvent = useCallback(() => {
    let yOffset = window.scrollY;
    let height = window.innerHeight / 1.5;

    for (let i = 0; i < section.length; i++) {
      if (
        yOffset > section[i].offsetTop - height &&
        yOffset <= section[i].offsetTop - height + section[i].offsetHeight
      ) {
        setActiveBtn(i);
        break;
      }
    }
  }, [section]);

  // section 세팅
  useEffect(() => {
    const s = sectionRef.current.getElementsByTagName("section");
    setSection([...s]);
  }, []);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handleScrollEvent, section]);

  // nav btn 활성화
  useEffect(() => {
    const pointBtn = pointRef.current.getElementsByTagName("li");

    for (var i = 0; i < pointBtn.length; i++) {
      pointBtn[i].classList.remove(styles.active);
    }
    pointBtn[activeBtn].classList.add(styles.active);
  }, [activeBtn]);

  return (
    <>
      <div ref={sectionRef}>
        {/* nav btn */}
        <ul className={styles.pointWrap} onClick={clickPointBtn} ref={pointRef}>
          <li id="0"></li>
          <li id="1"></li>
          <li id="2"></li>
        </ul>

        {/* Covid Monthly Graph */}
        <section>
          <MonthlyGraph active={activeBtn === 0} />
        </section>

        {/* Google Review Graph */}
        <section>
          <ReviewGraph active={activeBtn === 1} />
        </section>

        {/* Michelin Restaurant Graph */}
        <section>
          <MichelinGraph active={activeBtn === 2} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default InfoPage;
