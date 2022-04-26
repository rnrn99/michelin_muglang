import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import styles from "../../css/main/SectionCovid.module.css";

function SectionCovid() {
  const [graph, setGraph] = useState([]); // graph 그릴 data를 저장할 상태
  const COLORS = ["#1300ff", "#ff5e5e"];

  useEffect(() => {
    Api.get("graphs/covid-weekly").then((res) => setGraph(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <PieChart width={600} height={600} className={styles.chart}>
        <Pie
          dataKey="percent"
          data={graph}
          cx="50%"
          cy="50%"
          innerRadius={150}
          outerRadius={250}
          label
        >
          {graph.map((e, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default SectionCovid;
