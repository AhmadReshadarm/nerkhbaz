import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const SmallGraph = (props) => {
  const [dataSets, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get(
        `https://powerful-earth-64232.herokuapp.com/api/archive/graph/${props.code}`,
        {
          cancelToken: source.token,
        }
      )
      .then((res) => {
        setData(res.data);

        setLoaded(true);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err);
        }
        console.log(err);
      });
    return () => source.cancel();
  }, []);

  let DATA_COUNT = [];
  let labels = [];
  let allDatapoints = [];
  let datapoints = [];
  let j = 1;

  DATA_COUNT = [];
  for (let i = 0; i < 24; i++) {
    if (i === 0) {
      DATA_COUNT[0] = "now";
    }
    DATA_COUNT.push(`Past ${j}hr`);
    j++;
  }

  for (let i = 0; i < dataSets.length; i++) {
    allDatapoints.push(dataSets[i].sellId);
  }
  datapoints = allDatapoints.slice(-25).reverse();
  labels = DATA_COUNT;

  const data = {
    labels: labels,

    datasets: [
      {
        label: "",
        data: datapoints,
        borderColor: "#7C83FD",
        fill: false,
        backgroundColor: "#2b2e4a",
        cubicInterpolationMode: "monotone",
        tension: 0.9,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart - Cubic interpolation mode",
      },
      scaleShowGridLines: false,
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false,
        reverse: true,
        title: {
          display: false,
        },
      },
      y: {
        display: false,
        title: {
          display: false,
          text: "Value",
        },
      },
    },
  };
  if (isLoaded) {
    return (
      <div className="small-graph-main">
        <Line
          width={props.width > 1023 ? 120 : 80}
          height={40}
          data={data}
          options={options}
        />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default SmallGraph;
