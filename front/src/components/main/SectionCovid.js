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
} from "recharts";

function SectionCovid() {
  const [graph, setGraph] = useState([
    {
      _id: "6263b52e2e6be8c14a23cf24",
      type: "covidMonthly",
      year: "2022-01",
      case: 107275.0935483871,
    },
    {
      _id: "6263b52e2e6be8c14a23cf25",
      type: "covidMonthly",
      year: "2022-02",
      case: 71885.61785714286,
    },
    {
      _id: "6263b52e2e6be8c14a23cf26",
      type: "covidMonthly",
      year: "2022-03",
      case: 60323.461764705884,
    },
  ]); // graph 그릴 data를 저장할 상태

  useEffect(() => {
    Api.get("graph/vaccinatedRatio").then((res) => console.log(res.data));
  }, []);
  return (
    <div style={{ border: "2px solid blue" }}>
      Covid
      <LineChart
        width={500}
        height={300}
        data={graph}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="case" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="case"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

export default SectionCovid;
