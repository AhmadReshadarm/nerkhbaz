import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Graph from "./utils/Graph";
import { intialValueChart } from "../intials";
import { graphConfig } from "../actions/graphConfig";

const GraphPage = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const [dataSets, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [intialValue, setValues] = useState({
    dataSetType: "sell",
    period: "24",
  });

  let graphData = useSelector((state) => state.graphReducer);

  //  fetching data from api
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/archive/graph/${path}`)
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // by default set data to last 24 hour on page refresh.
  if (!graphData.data) {
    dispatch(graphConfig(intialValue, "24", "dataSetType", dataSets));
  }

  // graph configuration options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "All prices are in Iranian (Toman)",
      },
      scaleShowGridLines: false,
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Price",
        },
        // suggestedMin: 250,
      },
    },
  };

  // event Handler
  function cahngeHandler(evt) {
    setValues((prevSatats) => ({
      ...prevSatats,
      [evt.target.name]: evt.target.value,
    }));
    dispatch(
      graphConfig(intialValue, evt.target.value, evt.target.name, dataSets)
    );
  }

  if (isLoaded) {
    return (
      <div className="graphPageContainer">
        <div className="graphPageWrapper">
          <h1>this is graph page</h1>
          <select
            name="dataSetType"
            value={intialValue.dataSetType}
            onChange={(evt) => cahngeHandler(evt)}
          >
            <option value="sell">Sell</option>
            <option value="buy">Buy</option>
          </select>
          <div className="priceCodeWrapper">
            {intialValueChart.map((item) => {
              return (
                <a key={item.sellId} href={`/${item.code}`}>
                  {item.code} - {item.name}
                </a>
              );
            })}
          </div>
          <select
            name="period"
            value={intialValue.period}
            onChange={(evt) => cahngeHandler(evt)}
          >
            <option value="24">past 24 hours</option>
            <option value="week">past 7 days</option>
            <option value="1_month">past month</option>
            <option disabled value="6_month">
              past 6 month
            </option>
            <option disabled value="year">
              past year
            </option>
          </select>
          <Graph data={graphData.data} options={options} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="loadingWrapper">
        <div className="loading-screen">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p>Loading</p>
        <h1>Nerkhbaz</h1>
      </div>
    );
  }
};

export default GraphPage;
