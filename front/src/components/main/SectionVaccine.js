import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import styles from "../../css/main/Graph.module.css";

function SectionVaccine({ active }) {
  const [graph, setGraph] = useState([]); // graph 그릴 data를 저장할 상태

  useEffect(() => {
    Api.get("graphs/vaccinated-ratio").then((res) => {
      setGraph(res.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.graphWrapper}>
        <ResponsiveContainer width="90%" height="90%">
          <BarChart
            data={graph}
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#000" />
            <YAxis dataKey="percent" stroke="#000" unit="%" />
            <Tooltip />
            <Bar
              dataKey="percent"
              fill="#8884d8"
              isAnimationActive={active}
              animationDuration={2000}
            />
            <ReferenceLine y={50} stroke="red" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.textWrapper}>
        <h1>예전처럼 다시 여행갈 수 있을까요?</h1>
        <p>
          미슐랭 가이드에 등록된{" "}
          <span className={active ? styles.underline : ""}>
            36개국의 백신 접종률은 평균 75.66%
          </span>
          에요. <br />
          국민 과반수가 백신 접종을 끝냈으니 이제 안전하게 여행을 떠나도 되지
          않을까요?
        </p>
      </div>
    </div>
  );
}

export default SectionVaccine;
