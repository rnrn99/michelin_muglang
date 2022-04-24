import React, { useState, useEffect } from "react";
import * as Api from "../../api";

function SectionCovid() {
  const [graph, setGraph] = useState([]); // graph 그릴 data를 저장할 상태

  useEffect(() => {
    Api.get("graph/vaccinatedRatio").then((res) => console.log(res.data));
  }, []);
  return <div style={{ border: "2px solid blue" }}></div>;
}

export default SectionCovid;
