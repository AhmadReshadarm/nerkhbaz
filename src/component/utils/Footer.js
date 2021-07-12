import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/nerkhbaz_logo.png";
import arrow_up from "../../assets/images/arrow_up.png";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const [displayNone, setDisplay] = useState("none");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 380) {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  });

  return (
    <div className="footerContainer">
      <div className="footerWrapper">
        <div className="footerLogoWrapper">
          <Link to="/">
            <img src={logo} alt="Nikex logo" />
            <p>Iranian live exchange rate </p>
          </Link>
          <p className="copyright hideMobile">copyright {year} Nerkhbaz </p>
        </div>
        <ul className="linksWrapper hideMobile">
          <li className="linksItem">
            <Link to="/">Home</Link>
          </li>
          <li className="linksItem">
            <Link to="/graph/USD">Graph</Link>
          </li>
          <li className="linksItem">
            <Link to="/about_us">About Us</Link>
          </li>
        </ul>
        <ul className="policyWrapper hideMobile">
          <li className="policyItem">
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
          <li className="policyItem">
            <Link to="/policy">Privacy and policy</Link>
          </li>
          <li className="policyItem">
            <Link to="/ads">Advertising</Link>
          </li>
        </ul>
        <nav className="navWrapper hideDesktop">
          <ul className="linksWrapper">
            <li className="linksItem">
              <Link to="/">Home</Link>
            </li>
            <li className="linksItem">
              <Link to="/graph/USD">Graph</Link>
            </li>
            <li className="linksItem">
              <Link to="/about_us">About Us</Link>
            </li>
          </ul>
          <ul className="policyWrapper">
            <li className="policyItem">
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
            <li className="policyItem">
              <Link to="/policy">Privacy and policy</Link>
            </li>
            <li className="policyItem">
              <Link to="/ads">Advertising</Link>
            </li>
          </ul>
        </nav>
        <p className="copyright hideDesktop">copyright {year} Nerkhbaz </p>
      </div>
      <div style={{ display: displayNone }} className="back-to-top">
        <a title="Back to top" href="#back_to_top">
          <img src={arrow_up} alt="back to the top" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
