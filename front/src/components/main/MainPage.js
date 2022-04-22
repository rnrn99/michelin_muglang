import React, { useState } from "react";
import "./MainPage.css";

function MainPage() {
  const [text, setText] = useState("");
  const section = document.getElementsByTagName("section");

  let pageNum = 1;
  const totalNum = section.length;

  const prevBtnClick = () => {
    if (pageNum > 1) {
      pageNum--;
    }
    window.scrollTo({
      top: section[pageNum - 1].offsetTop,
      behavior: "smooth",
    });
    setText(`${pageNum} 페이지 입니다.`);
  };

  const nextBtnClick = () => {
    if (pageNum < totalNum) {
      pageNum++;
    }
    window.scrollTo({
      top: section[pageNum - 1].offsetTop,
      behavior: "smooth",
    });
    setText(`${pageNum} 페이지 입니다.`);
  };

  window.addEventListener("scroll", function (event) {
    var yOffset = this.scrollY;
    var height = window.innerHeight / 3;

    for (var i = 0; i < totalNum; i++) {
      if (
        yOffset > section[i].offsetTop - height &&
        yOffset < section[i].offsetTop - height + section[i].offsetHeight
      ) {
        pageNum = i + 1;
        setText(`${pageNum} 페이지 입니다.`);
        break;
      }
    }
  });

  return (
    <>
      <div class="nav">
        <button type="button" className="prevBtn" onClick={prevBtnClick}>
          PREV
        </button>
        <button type="button" className="nextBtn" onClick={nextBtnClick}>
          NEXT
        </button>
        <h1>{text}</h1>
      </div>

      <section>
        <h2>page 1</h2>
      </section>

      <section>
        <h2>page 2</h2>
      </section>

      <section>
        <h2>page 3</h2>
      </section>

      <section>
        <h2>page 4</h2>
      </section>
    </>
  );
}

export default MainPage;
