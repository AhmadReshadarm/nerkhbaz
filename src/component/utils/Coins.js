import React from "react";
import { useSelector } from "react-redux";

const Coins = () => {
  let coinsData = useSelector((state) => state.hero);

  if (coinsData.error) {
    return <div>Error: {coinsData.error.message}</div>;
  } else if (!coinsData.isLoaded) {
    return (
      <div>
        <div className="coinContainer">
          <div className="coinWrapper">
            <div className="coinItemWrapper grid_0">
              <img src="bitcoin.webp" alt="bitcoin" className="centerCoin" />
              <div className="dataWrapper">
                <div className="codeWrapper">
                  <h2>Bitcoin</h2>
                  <span>0.81%</span>
                </div>
                <div className="currentPriceWrapper">
                  <h2>45435</h2>
                  <sub>$</sub>
                </div>
              </div>
            </div>
            <div className="coinItemWrapper grid_1">
              <img src="ethereum.webp" alt="ethereum" className="centerCoin" />
              <div className="dataWrapper">
                <div className="codeWrapper">
                  <h2>Ethereum</h2>
                  <span>0.81%</span>
                </div>
                <div className="currentPriceWrapper">
                  <h2>45435</h2>
                  <sub>$</sub>
                </div>
              </div>
            </div>
            <div className="coinItemWrapper grid_2">
              <img src="Tether-logo.webp" alt="tether" className="centerCoin" />
              <div className="dataWrapper">
                <div className="codeWrapper">
                  <h2>Tether</h2>
                  <span>0.81%</span>
                </div>
                <div className="currentPriceWrapper">
                  <h2>1.02</h2>
                  <sub>$</sub>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="coinContainer">
          <div className="coinWrapper">
            {coinsData.coinsData.map((item, index) => {
              return (
                <div key={index} className={`coinItemWrapper grid_${index}`}>
                  <img src={item.image} alt="" className="centerCoin" />
                  <div className="dataWrapper">
                    <div className="codeWrapper">
                      <h2>{item.name}</h2>
                      <h2>{item.current_price}</h2>
                      <sub>$</sub>
                    </div>
                    <div className="currentPriceWrapper">
                      <span>{item.price_change_percentage_24h}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Coins;
