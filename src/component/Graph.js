import React from "react";
import { useParams } from "react-router-dom";
const Graph = () => {
  let { graph_id } = useParams();

  return (
    <div className="graphContainer">
      <div className="graphWrapper">{graph_id}</div>
    </div>
  );
};

export default Graph;
