import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function SectionCovid() {
  const [graph, setGraph] = useState([]); // graph 그릴 data를 저장할 상태
  const COLORS = ["#1300ff", "#ff5e5e"];

  useEffect(() => {
    Api.get("graphs/covid-weekly").then((res) => setGraph(res.data));
  }, []);

  return (
    <div style={{ border: "1px solid blue" }}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="percent"
          isAnimationActive={false}
          data={graph}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={150}
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
