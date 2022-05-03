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
