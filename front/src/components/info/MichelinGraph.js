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
      <div className={`${styles.graphWrapper} ${styles.michelin}`}>
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
              fill="#EEE4AB"
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
