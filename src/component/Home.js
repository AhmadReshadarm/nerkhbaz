import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchHero } from "../actions/api";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import Coins from "./utils/Coins";
import Converter from "./utils/Coverter";

let oneTime = true;
let preCacheData = true;
let prevValues = [];
let newValues = [];
let prevBuyValues = [];
let prevSellValues = [];
let newBuyValues = [];
let newSellValues = [];
let preCacheChartData = true;

const Home = () => {
  let day = new Date().toISOString().slice(0, 10);
  // let month = new Date().getMonth();
  // let year = new Date().getFullYear();
  let minute = new Date().getMinutes();
  let hour = new Date().getHours();
  let apiData = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  if (oneTime) {
    dispatch(fetchHero());
    oneTime = false;
  }

  for (let i = 0; i < newValues.length; i++) {
    prevValues[i] = newValues[i];
  }
  for (let i = 0; i < newBuyValues.length; i++) {
    prevBuyValues[i] = newBuyValues[i];
    prevSellValues[i] = newSellValues[i];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      return dispatch(fetchHero());
    }, 60000);
    return () => clearInterval(intervalId);
  });

  if (apiData.error) {
    return (
      <div>
        <Header></Header>
        <div>Error: {apiData.error.message}</div>
      </div>
    );
  } else {
    if (preCacheData) {
      apiData.heroData.forEach((el, i) => {
        prevValues[i] = parseFloat(el.value.replace(/,/g, ""));
      });
    }
    if (preCacheChartData) {
      apiData.chartData.forEach((el, i) => {
        prevBuyValues[i] = parseFloat(el.buyId.replace(/,/g, ""));
        prevSellValues[i] = parseFloat(el.sellId.replace(/,/g, ""));
      });
    }
    return (
      <div>
        <Header></Header>
        <Coins></Coins>
        <div className="heroContainer hideMobile">
          <div className="herowrapper">
            {apiData.heroData.map((item, index) => {
              newValues[index] = parseFloat(item.value.replace(/,/g, ""));
              preCacheData = false;
              return (
                <div key={index} className="heroItemWrapper">
                  <div className="heroTitle">
                    <span>{item.name}</span>
                    <sub>{item.sub}</sub>
                  </div>
                  <div className="heroValue">
                    <svg
                      className={
                        prevValues[index] === newValues[index]
                          ? "same_val arrow"
                          : prevValues[index] < newValues[index]
                          ? "down_val arrow"
                          : "up_val arrow"
                      }
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox={"0 0 494.148 494.148"}
                      style={{ enableBackground: "new 0 0 494.148 494.148" }}
                    >
                      <g>
                        <g>
                          <path
                            d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
			c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
			C432.632,229.572,422.964,213.288,405.284,201.188z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>{item.value}</span>
                    <sub>{item.unit}</sub>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chartContainer">
          <div className="chartWrapper">
            <div className="dateAndTimeWrapper">
              <p>All currencies are in iranian Toman</p>
              <p>
                Last update {hour}:{minute} - {day}
              </p>
            </div>

            <table className="chartContent">
              <tbody className="chartCol">
                <tr className="info">
                  <td>Code</td>
                  <td>Currency</td>
                  <td>Sell</td>
                  <td style={{ border: "none" }}>Buy</td>
                </tr>
                {apiData.chartData.map((item, index) => {
                  newBuyValues[index] = parseFloat(
                    item.buyId.replace(/,/g, "")
                  );
                  newSellValues[index] = parseFloat(
                    item.sellId.replace(/,/g, "")
                  );
                  preCacheChartData = false;
                  return (
                    <tr key={index} className="currenciesWrapper">
                      <td className="contentWrapper">
                        <img src={item.flagUrl} alt="flag"></img>
                        <p>{item.code}</p>
                      </td>
                      <td className="contentWrapper">
                        <p>{item.name}</p>
                      </td>
                      <td className="contentWrapper">
                        <svg
                          className={
                            prevSellValues[index] === newSellValues[index]
                              ? "same_val arrow"
                              : prevSellValues[index] < newSellValues[index]
                              ? "down_val arrow"
                              : "up_val arrow"
                          }
                          version="1.1"
                          id="Layer_1"
                          x="0px"
                          y="0px"
                          viewBox={"0 0 494.148 494.148"}
                          style={{
                            enableBackground: "new 0 0 494.148 494.148",
                          }}
                        >
                          <g>
                            <g>
                              <path
                                d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
			c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
			C432.632,229.572,422.964,213.288,405.284,201.188z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span>{item.buyId}</span>
                      </td>
                      <td style={{ border: "none" }} className="contentWrapper">
                        <svg
                          className={
                            prevBuyValues[index] === newBuyValues[index]
                              ? "same_val arrow"
                              : prevBuyValues[index] < newBuyValues[index]
                              ? "down_val arrow"
                              : "up_val arrow"
                          }
                          version="1.1"
                          id="Layer_1"
                          x="0px"
                          y="0px"
                          viewBox={"0 0 494.148 494.148"}
                          style={{
                            enableBackground: "new 0 0 494.148 494.148",
                          }}
                        >
                          <g>
                            <g>
                              <path
                                d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
			c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
			C432.632,229.572,422.964,213.288,405.284,201.188z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span>{item.sellId}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="heroContainer hideDesktop">
          <div className="herowrapper">
            {apiData.heroData.map((item, index) => {
              newValues[index] = parseFloat(item.value.replace(/,/g, ""));
              preCacheData = false;
              return (
                <div key={index} className="heroItemWrapper">
                  <div className="heroTitle">
                    <span>{item.name}</span>
                    <sub>{item.sub}</sub>
                  </div>
                  <div className="heroValue">
                    <svg
                      className={
                        prevValues[index] === newValues[index]
                          ? "same_val arrow"
                          : prevValues[index] < newValues[index]
                          ? "down_val arrow"
                          : "up_val arrow"
                      }
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox={"0 0 494.148 494.148"}
                      style={{ enableBackground: "new 0 0 494.148 494.148" }}
                    >
                      <g>
                        <g>
                          <path
                            d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
			c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
			C432.632,229.572,422.964,213.288,405.284,201.188z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>{item.value}</span>
                    <sub>{item.unit}</sub>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Converter></Converter>
        <Footer></Footer>
      </div>
    );
  }
};

export default Home;
