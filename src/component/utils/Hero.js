import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHero } from "../../actions/api";

let oneTime = true;
let preCacheData = true;
let prevValues = [];
let newValues = [];

const Hero = () => {
  let heroData = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  if (oneTime) {
    dispatch(fetchHero());
    oneTime = false;
  }

  for (let i = 0; i < newValues.length; i++) {
    prevValues[i] = newValues[i];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      return dispatch(fetchHero());
    }, 30000);
    return () => clearInterval(intervalId);
  });

  if (heroData.error) {
    return <div>Error: {heroData.error.message}</div>;
  } else {
    if (preCacheData) {
      heroData.heroData.forEach((el, i) => {
        prevValues[i] = parseFloat(el.value.replace(/,/g, ""));
      });
    }
    return (
      <div className="herowrapper">
        {heroData.heroData.map((item, index) => {
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
    );
  }
};

export default Hero;
