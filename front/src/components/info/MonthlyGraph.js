import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../../css/info/InfoPage.module.css";

function MonthlyGraph({ active }) {
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    Api.get("graphs/covid-monthly").then((res) => setGraph(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <h1
        className={active ? `${styles.title} ${styles.active}` : styles.title}
      >
        <span>코로나</span>와 <span>여행</span>
      </h1>
      <div
        className={
          active ? `${styles.textWrapper} ${styles.active}` : styles.textWrapper
        }
      >
        <p>
          미슐랭 가이드에 기재된 레스토랑을 보유하고 있는 국가 36국을 대상으로
          최근 3달 간의 <strong>코로나 확진자 수</strong>를 조사한 결과{" "}
          <span>
            <strong>5만명</strong>
          </span>{" "}
          대에서{" "}
          <span>
            <strong>3만명</strong>
          </span>{" "}
          대까지 꾸준히 확진자 수가 <strong>감소</strong>하는 추세를 보였습니다.
        </p>
        <p>
          이에 따라 세계 각국은 해외입국자에 대한 자가격리 의무를 폐지하거나
          코로나19 관련 증명서 제출을 폐지하는 등 여행자들을 반길 준비를 하고
          있습니다.
        </p>
        <p className={styles.description}>
          (여행신문30 - 격리 끝! 무조건 입국 허용하는 국가도 있다! 해외여행지
          입국 조건 총정리)
        </p>
        <p>
          이러한 제도들에 힘입어 여행을 가는 사람들도 증가하고 있는데,
          국토교통부 항공포털에 따르면 22년 4월 <strong>국제선 여객수</strong>는{" "}
          <strong>24만1000여명</strong>으로 21년 3월(11만3380명)과 비교해{" "}
          <span>
            <strong>2배</strong>
          </span>
          로 늘었고 이는 22년 3월(17만9596명)과 비해서도{" "}
          <span>
            <strong>34%</strong>
          </span>{" "}
          가량 늘어난 수치입니다.
        </p>
        <p className={styles.description}>
          (대한금융신문 - 해외여행 수요 폭발…은행 ‘환전수익’ 기대감)
        </p>
      </div>
      <div className={styles.graphWrapper}>
        <ResponsiveContainer>
          <LineChart
            data={graph}
            margin={{
              top: 5,
              left: 10,
              right: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="case" unit="명" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="case"
              stroke="#68A7AD"
              isAnimationActive={active}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyGraph;
