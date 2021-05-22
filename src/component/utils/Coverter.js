import React, { useState } from "react";
import { useSelector } from "react-redux";
import persianDate from "persian-date";

const Converter = () => {
  let apiData = useSelector((state) => state.hero);
  let rates = [{ code: "IRR", price: 1, name: "Iranian Rial (Toman)" }];
  const dayWrapper = new persianDate().format();
  function asignRates() {
    let data = apiData.chartData;

    data.forEach((el) => {
      if (data.length < 2) {
        return;
      } else {
        rates.push({
          code: el.code,
          price: parseFloat(el.buyId.replace(/,/g, "")),
          name: el.name,
        });
      }
    });
  }

  asignRates();

  const [from, setFrom] = useState({
    fromCode: "IRR",
    fromValue: 1,
  });

  const [to, setTo] = useState({
    toCode: "IRR",
    toValue: 1,
  });
  const [calcFirt, setCalcFirt] = useState(0);
  const [calcSecond, setCalcSecond] = useState(0);

  function handleChange(event) {
    /// make changes on from
    if (event.target.name === "fromCode") {
      setFrom({
        ...from,
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name === "fromValue") {
      setFrom({
        ...from,
        [event.target.name]: event.target.value,
      });

      rates.forEach((item, i) => {
        if (item.code === from.fromCode) {
          setCalcFirt(i);
        }
      });
      rates.forEach((item, j) => {
        if (item.code === to.toCode) {
          setCalcSecond(j);
          setTo({
            ...to,
            toValue:
              (event.target.value * rates[calcFirt].price) /
              rates[calcSecond].price,
          });
        }
      });
    }

    ///// make changes on to
    else if (event.target.name === "toCode") {
      setTo({
        ...to,
        [event.target.name]: event.target.value,
      });
    } else {
      setTo({
        ...to,
        [event.target.name]: event.target.value,
      });

      rates.forEach((item, i) => {
        // finds the currency code from which that is going to be converted from
        if (item.code === to.toCode) {
          setCalcFirt(i);
        }
      });
      rates.forEach((item, j) => {
        // finds the currency code from which that is going to be converted to
        if (item.code === from.fromCode) {
          setCalcSecond(j);
          setFrom({
            ...from,
            fromValue:
              (event.target.value * rates[calcFirt].price) /
              rates[calcSecond].price,
          });
        }
      });
    }
  }

  return (
    <div className="converterContainer">
      <div className="formWrapper">
        <p>Last update {dayWrapper}</p>
        <h2>Currency Converter</h2>
        <div className="fromWrapper optionsWrapper">
          <h3>From</h3>
          <select
            className="fromSelection"
            value={from.fromCode}
            onChange={(e) => handleChange(e)}
            name="fromCode"
          >
            {rates.map((item, index) => {
              return (
                <option key={index} value={item.code}>
                  {item.code} - {item.name}
                </option>
              );
            })}
          </select>
          <input
            className="fromInput"
            min="1"
            name="fromValue"
            value={from.fromValue}
            onChange={(e) => handleChange(e)}
            type="number"
          />
        </div>
        <div className="toWrapper optionsWrapper">
          <h3>To</h3>
          <select
            className="toSelection"
            value={to.toCode}
            onChange={(e) => handleChange(e)}
            name="toCode"
            id=""
          >
            {rates.map((item, index) => {
              return (
                <option key={index} value={item.code}>
                  {item.code} - {item.name}
                </option>
              );
            })}
          </select>
          <input
            className="toInput"
            min="1"
            name="toValue"
            value={to.toValue}
            onChange={(e) => handleChange(e)}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
