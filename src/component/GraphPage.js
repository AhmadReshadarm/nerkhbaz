import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Graph from "./utils/Graph";
import { intialValueChart } from "../intials";
import { graphConfig } from "../actions/graphConfig";
import NotFound from "./NotFound";

// assets import
import { ReactComponent as Arrow } from "../assets/images/arrow-down.svg";
import { ReactComponent as More } from "../assets/images/more-down-arrow.svg";

const GraphPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const path = window.location.pathname;
  const [dataSets, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(true);
  const [intialValue, setValues] = useState({
    dataSetType: "Sell",
    period: "24",
  });

  let graphData = useSelector((state) => state.graphReducer);
  //  fetching data from api "https://powerful-earth-64232.herokuapp.com/api/v1"
  // http://localhost:5000/api/archive
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    intialValueChart.forEach((item, index) => {
      if (item.code === path.slice(-3)) {
        console.log(path.slice(-3), item.code);
        setError(false);
        return;
      }
    });
    axios
      .get(`https://powerful-earth-64232.herokuapp.com/api/archive${path}`, {
        cancelToken: source.token,
      })
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

  // find currency max value from intials

  // let max = 0;
  // let min = 0;

  // for (let i = 0; i < intialValueChart.length; i++) {
  //   if (intialValueChart[i].code === path.slice(-3)) {
  //     console.log(true);
  //     max = intialValueChart[i].max;
  //     min = intialValueChart[i].min;
  //   }
  // }

  // by default set data to last 24 hour on page refresh.
  let DATA_COUNT = [];
  let labels = [];
  let allDatapoints = [];
  let datapoints = [];
  let j = 0;
  if (!graphData.data) {
    j = 1;
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
  }

  const data = (canvas) => {
    let gradientColor = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 200);
    gradientColor.addColorStop(0.3, "#FF2270");
    gradientColor.addColorStop(1, "#9787FF");
    return {
      labels: labels,
      datasets: [
        {
          label: dataSets[0]
            ? `${dataSets[0].name} Price graph in (Toman)`
            : `Please select data set type first to show graph data`,
          data: datapoints,
          fill: true,
          backgroundColor: gradientColor,
          cubicInterpolationMode: "monotone",
          borderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointBorderColor: "#FFFFFF",
          lineTension: 0.4,
        },
      ],
    };
  };

  // graph configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        reverse: true,
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
        // suggestedMin: 25000,
        // suggestedMax: 25200,
      },
    },
  };

  // _________
  // UI states
  const [isOpen, setOpen] = useState(false);
  const [isBoydClick, setBodyClick] = useState(false);
  const [isTypeOpen, setTypeOpen] = useState(false);
  const [isDurationOpen, setDurationOpen] = useState(false);

  // ________________
  // UI event handler
  function handleBtnClick(evt) {
    setBodyClick(false);
    if (evt === "code") {
      setTypeOpen(false);
      setDurationOpen(false);
      !isOpen && !isBoydClick ? setOpen(true) : setOpen(false);
    } else if (evt === "type") {
      setOpen(false);
      setDurationOpen(false);
      !isTypeOpen && !isBoydClick ? setTypeOpen(true) : setTypeOpen(false);
    } else {
      setOpen(false);
      setTypeOpen(false);
      !isDurationOpen && !isBoydClick
        ? setDurationOpen(true)
        : setDurationOpen(false);
    }
  }

  function handleBodyClick() {
    if ((isOpen || isTypeOpen || isDurationOpen) && !isBoydClick) {
      setBodyClick(true);
      setOpen(false);
      setTypeOpen(false);
      setDurationOpen(false);
      setBodyClick(false);
    }
  }

  // UI dropdown scroll handlers
  function handleDropdownScroll() {
    let arrow = document.querySelector(".dropdown-links-arrow-more");
    let lastChild = document
      .querySelector(".dropdown-options-link")
      .lastChild.getBoundingClientRect().y;

    if (lastChild > 500) {
      arrow.style.transform = "rotate(0deg)";
    } else {
      arrow.style.transform = "rotate(180deg)";
    }
  }

  // UI elements values
  const dataSetType = ["Sell", "Buy"];
  const duration = ["24", "week", "1_month", "6_month", "year"];
  const durationUI = ["24 hour", "One week", "One month", "6 months", "A year"];
  const [btnUI, setBtnUI] = useState("24 hour");

  // data event Handler
  function cahngeHandler(inputName, inputValue) {
    setValues((prevSatats) => ({
      ...prevSatats,
      [inputName]: inputValue,
      // [evt.target.name]: evt.target.value,
    }));
    dispatch(
      graphConfig(intialValue, inputValue, inputName, dataSets)
      // graphConfig(intialValue, evt.target.value, evt.target.name, dataSets)
    );
  }

  if (!isLoaded) {
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
  } else if (isError) {
    setTimeout(() => {
      history.push("/");
    }, 5000);
    return <NotFound />;
  } else {
    return (
      <div
        onClick={() => {
          handleBodyClick();
        }}
        className="graphPageContainer"
      >
        <div className="graphPageWrapper">
          <div className="graphOptionsWrapper">
            <fieldset className="find-currency-value-fram">
              <label>Currency</label>
              <span className="btn-dropdown-currency btn-dropdown">
                <button
                  onClick={() => {
                    handleBtnClick("code");
                  }}
                  className="btn-dorpdown-link"
                >
                  <span className="default-option">
                    {dataSets[0].code} - {dataSets[0].name}
                  </span>
                  <Arrow className={isOpen ? "dropdown-arrow-rotate" : ""} />
                </button>
              </span>
              <ul
                onScroll={() => {
                  handleDropdownScroll();
                }}
                className={
                  isOpen
                    ? "dropdown-options-link"
                    : "dropdown-options-link-hide"
                }
              >
                {intialValueChart.map((item) => {
                  return (
                    <li
                      onClick={() => {
                        handleBtnClick("code");
                      }}
                      key={item.sellId}
                      className="dropdown-option-link"
                    >
                      <a
                        className={
                          item.code === dataSets[0].code
                            ? "dropdown-active-link"
                            : ""
                        }
                        href={`/graph/${item.code}`}
                      >
                        {item.code} - {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <More
                className={
                  isOpen
                    ? "dropdown-links-arrow-more"
                    : "dropdown-links-arrow-more-hide"
                }
              />
            </fieldset>
            <fieldset className="find-currency-value-fram">
              <label>Data sets type</label>
              <span className="btn-dropdown-currency btn-dropdown">
                <button
                  onClick={() => {
                    handleBtnClick("type");
                  }}
                  className="btn-dorpdown-link"
                >
                  <span className="default-option">
                    {`${intialValue.dataSetType} data sets`}
                  </span>
                  <Arrow
                    className={isTypeOpen ? "dropdown-arrow-rotate" : ""}
                  />
                </button>
              </span>
              <ul
                className={
                  isTypeOpen
                    ? "dropdown-options-link dropdown-options-link-data-set"
                    : "dropdown-options-link-hide"
                }
              >
                {dataSetType.map((inputValue, index) => {
                  return (
                    <li
                      onClick={() => {
                        handleBtnClick("type");
                        cahngeHandler("dataSetType", inputValue);
                      }}
                      key={index}
                      className="dropdown-option-link"
                    >
                      <span
                        className={
                          inputValue === intialValue.dataSetType
                            ? "dropdown-active-link dropdown-active-link-data-sets"
                            : ""
                        }
                      >
                        {`${inputValue} data sets`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <fieldset className="find-currency-value-fram">
              <label>Data sets duration</label>
              <span className="btn-dropdown-currency btn-dropdown">
                <button
                  onClick={() => {
                    handleBtnClick("duration");
                  }}
                  className="btn-dorpdown-link"
                >
                  <span className="default-option">{`${btnUI} data sets`}</span>
                  <Arrow
                    className={isDurationOpen ? "dropdown-arrow-rotate" : ""}
                  />
                </button>
              </span>
              <ul
                className={
                  isDurationOpen
                    ? "dropdown-options-link dropdown-options-link-data-set-duration"
                    : "dropdown-options-link-hide"
                }
              >
                {duration.map((inputValue, index) => {
                  return (
                    <li
                      onClick={() => {
                        setBtnUI(durationUI[index]);
                        handleBtnClick("duration");
                        cahngeHandler("period", inputValue);
                      }}
                      key={index}
                      className="dropdown-option-link dropdown-duration"
                    >
                      <span
                        className={
                          inputValue === intialValue.period
                            ? "dropdown-active-link dropdown-active-link"
                            : ""
                        }
                      >
                        {`${durationUI[index]} data sets`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>
          <Graph
            data={!graphData.data ? data : graphData.data}
            options={options}
          />
        </div>
      </div>
    );
  }
};

export default GraphPage;
