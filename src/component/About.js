import React from "react";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutWrapper">
        <div className="aboutHeroWrapper">
          <div className="aboutHeroTextWrapper">
            <h1>The Heart of the money exchange rate market community</h1>
            <p>
              we are on a mission to provide the community an ease on exchanging
              money
            </p>
          </div>
          <img src="exchange.svg" alt="money exchange action transiction" />
        </div>
        <div className="aboutDescription">
          <div className="aboutDecriptionText">
            <h2>Over 28+ currencies to look at</h2>
            <p>
              Nerkhbaz proviods over 28+ currencies exchange rate in Iranian
              Toman. our goal is to proviod free exchange rate prices, we
              proviod all of our services for free to help people to find out
              about the latest prices of currencies.
            </p>
            <p>
              Founded in 2020, Nerkbaz is a noneprofitable website for whom
              wants to gather information about the market exchange rate.
            </p>
            <p>
              for further inquiries contact us by email at{" "}
              <a href="mailto:support@nerkhbaz.com">support@nerkhbaz.com</a>.
            </p>
          </div>
          <figure className="figureWrapper">
            <figure className="figureItem_1 shot_img figureTransition">
              <img src="stock.svg" alt="stock" />
            </figure>
            <figure className="figureItem_2 shot_img figureTransition">
              <img src="tether.svg" alt="etherium" />
            </figure>
            <figure className="figureItem_3 shot_img figureTransition">
              <img src="bitcoinhero.svg" alt="bitcoin" />
            </figure>
            <figure className="figureItem_4 figureTransition">
              <img src="nerkhbaz_logo.png" alt="site logo" />
              <p>Iranian live exchange rate </p>
            </figure>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default About;
