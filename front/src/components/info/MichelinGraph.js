import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../../css/info/InfoPage.module.css";

function MichelinGraph({ active }) {
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    Api.get("graphs/michelin-by-continent").then((res) => setGraph(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={
          active ? `${styles.textWrapper} ${styles.active}` : styles.textWrapper
        }
      >
        <h1>
          검증받은 <span>음식점</span>을 고르는 방법
        </h1>
        <p>
          미슐랭 가이드는 프랑스의 타이어 제조회사가 운전자에게 도로 여행에 대한
          정보를 제공하기 위해 만든 가이드북에서 시작되었습니다.
        </p>
        <p>
          1900년 부터 현재까지 전 세계의 다양한 레스토랑에 익명의 평가원을 보내
          레스토랑을 평가하고 있으며 전 세계적으로 3천만부 이상이
          판매되었습니다.
        </p>
        <p>
          미슐랭 먹을랭은 이러한 명성을 쌓아온 미슐랭 가이드에서 제공하는
          데이터를 기반으로{" "}
          <span>
            <strong>6500여 개의 레스토랑</strong>
          </span>
          을 당신에게 소개해 드립니다.
        </p>
        <p className={styles.description}>
          미슐랭 가이드 별점 소개
          <br />
          3 stars 요리가 매우 훌륭하여 맛을 보기 위해 특별한 여행을 떠날 가치가
          있는 식당 <br />
          2 stars 요리가 훌륭하여 멀리 찾아갈 만한 식당
          <br />
          1 stars 요리가 훌륭한 식당
          <br />
          Bib Gourmand 합리적인 가격으로 좋은 요리를 맛볼 수 있는 식당
          <br />
        </p>
      </div>
      <div className={styles.graphWrapper}>
        <ResponsiveContainer>
          <BarChart data={graph}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "resturants (log10)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />
            <Legend />
            <Bar
              dataKey="3 MICHELIN Stars"
              fill="#68A7AD"
              isAnimationActive={active}
              animationDuration={2000}
            />
            <Bar
              dataKey="2 MICHELIN Stars"
              fill="#99C4C8"
              isAnimationActive={active}
              animationDuration={2000}
            />
            <Bar
              dataKey="1 MICHELIN Star"
              fill="#E5CB9F"
              isAnimationActive={active}
              animationDuration={2000}
            />
            <Bar
              dataKey="Bib Gourmand"
              fill="#F2BB9B"
              isAnimationActive={active}
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MichelinGraph;
