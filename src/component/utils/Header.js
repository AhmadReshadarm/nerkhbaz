import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/nerkhbaz_logo.png";

const Header = () => {
  const [menuVisible, setVisible] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [animation, setAnimation] = useState(false);

  function handleClik() {
    setAnimation(animation ? false : true);

    if (menuVisible) {
      setTimeout(() => {
        setVisible(false);
      }, 300);
    } else {
      setVisible(true);
    }

    setTimeout(() => {
      setMenuActive(menuActive ? false : true);
    }, 30);
  }

  function handleClose() {
    setMenuActive(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }

  return (
    <div id="back_to_top" className="headerContainer">
      <div className="headerWrapper">
        <div className="logoWrapper">
          <Link to="/">
            <img src={logo} alt="Nikex logo"></img>
            <p>Iranian live exchange rate </p>
          </Link>
        </div>
        <nav className="menuContainer">
          <ul className="menuWprapper hideMobile">
            <li style={{ border: "none" }} className="menuItem">
              <Link to="/">Home</Link>
            </li>
            <li className="menuItem">
              <Link to="/policy">Privacy and policy</Link>
            </li>
            <li className="menuItem">
              <Link to="/graph/USD">Graph</Link>
            </li>
          </ul>
          <button
            onClick={() => handleClik()}
            className="mobileMenuBtn onlyMobile"
          >
            <svg viewBox={"0 0 941 844"}>
              <rect
                style={{ fill: "#ff485a" }}
                width="941"
                height="120"
                rx="60"
              />
              <rect
                className={`${animation ? "animationRight" : ""}`}
                style={{ fill: "#ff485a" }}
                y="362"
                width="603"
                height="120"
                rx="60"
              />
              <rect
                style={{ fill: "#ff485a" }}
                y="724"
                width="941"
                height="120"
                rx="60"
              />
              <rect
                className={`${animation ? "animationLeft" : ""}`}
                style={{ fill: "#ffbbc0" }}
                x="724"
                y="362"
                width="217"
                height="120"
                rx="60"
              />
            </svg>
          </button>
          <div
            className={`mobileMenuContainer onlyMobile ${
              menuActive ? "menuActive" : ""
            } ${menuVisible ? "menuFirtActive" : ""}`}
          >
            <ul className="menuWrapper">
              <li onClick={() => handleClose()} className="menuItemMobile">
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => handleClose()} className="menuItemMobile">
                <Link to="/policy">Privacy and policy</Link>
              </li>
              <li onClick={() => handleClose()} className="menuItemMobile">
                <Link to="/graph/USD">Graph</Link>
              </li>
              <li
                onClick={() => handleClose()}
                style={{ border: "none" }}
                className="menuItemMobile"
              >
                <span>Close</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
