import React from "react";
import { Line } from "react-chartjs-2";
import { ReactComponent as Ads } from "../../assets/images/ads.svg";

const Graph = (props) => {
  return (
    <div className="graph_ads_wrapper">
      <div className="graphContainer">
        <Line
          width={700}
          height={350}
          data={props.data}
          options={props.options}
        />
      </div>
      <div className="ads_container">
        <Ads />
        <h2>
          Place your ads here with us{" "}
          <span role="img" aria-label="smily face">
            😊
          </span>{" "}
        </h2>
      </div>
    </div>
  );
};

export default Graph;
