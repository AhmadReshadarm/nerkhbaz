import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Chart = () => {
  let chartData = useSelector((state) => state.hero);

  console.log(chartData);
  return (
    <>
      <div className="chartContainer">
        <div className="chartWrapper">
          <table className="chartContent">
            <tbody className="chartCol">
              <tr className="info">
                <td>Code</td>
                <td>Currency</td>
                <td>Sell</td>
                <td style={{ border: "none" }}>Buy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Chart;
