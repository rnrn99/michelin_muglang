import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../../css/info/InfoPage.module.css";

function ReviewGraph({ active }) {
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    Api.get("graphs/tour-review").then((res) => {
      let result = [...res.data];
      result.sort((a, b) => a.rating - b.rating);
      setGraph(result);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h1>
          <span>여행</span>과 <span>맛집</span>
        </h1>
        <p>
          구글 리뷰를 기반으로 한 <strong>장소별 여행 선호도 조사</strong>에서
          음식점이 2위를 차지했습니다.
        </p>
        <p>
          이를 통해 만족스러운 음식을 먹는 것이 여행에서 높은 만족도를 줄 수
          있다는 것을 알 수 있었습니다.
        </p>
        <p>
          또한 2021년 서울 관광재단의 설문조사 결과 코로나 19 이후 가장 하고
          싶은 활동 1위가 <strong>맛집 탐방</strong>이었습니다.
        </p>
        <p>
          그래서 "미슐랭 먹을랭"은 해외 여행을 갈 수 있는 시기가 돌아오고 있는
          지금, 여행에서 빼놓을 수 없는{" "}
          <span>
            <strong>맛집 탐색</strong>
          </span>
          을 도와주는 서비스를 제공하고자 합니다.
        </p>
      </div>
      <div className={`${styles.graphWrapper} ${styles.review}`}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            data={graph}
            margin={{
              top: 5,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="rating" type="number" />
            <YAxis
              dataKey="name"
              type="category"
              scale="band"
              reversed={true}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="rating"
              fill="#E5CB9F"
              isAnimationActive={active}
              animationDuration={2000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReviewGraph;
