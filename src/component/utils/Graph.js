import React from "react";
import { Line } from "react-chartjs-2";

const Graph = (props) => {
  return (
    <div className="chartContainer">
      <Line
        width={700}
        height={350}
        data={props.data}
        options={props.options}
      />
    </div>
  );
};

export default Graph;
