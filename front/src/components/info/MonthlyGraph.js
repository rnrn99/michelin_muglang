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
      <div className={`${styles.graphWrapper} ${styles.covidMonthly}`}>
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
