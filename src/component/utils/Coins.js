import React from "react";
import { useSelector } from "react-redux";

const Coins = () => {
  let coinsData = useSelector((state) => state.hero);

  if (coinsData.error) {
    return <div>Error: {coinsData.error.message}</div>;
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
                      <div className="coinPriceWrapper">
                        <h2>{item.current_price}</h2>
                        <sub>$</sub>
                      </div>
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
