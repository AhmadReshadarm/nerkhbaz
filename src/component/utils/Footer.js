import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <img src="nerkhbaz_logo.png" alt="Nikex logo"></img>
          <p>Iranian live exchange rate </p>
          <p className="copyright hideMobile">copyright {year} Nerkhbaz </p>
        </div>
        <ul className="linksWrapper hideMobile">
          <li className="linksItem">
            <Link to="/">Home</Link>
          </li>
          <li className="linksItem">
            <Link to="/USD">Graph</Link>
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
            <Link to="/advertising">Advertising</Link>
          </li>
        </ul>
        <nav className="navWrapper hideDesktop">
          <ul className="linksWrapper">
            <li className="linksItem">
              <Link to="/">Home</Link>
            </li>
            <li className="linksItem">
              <Link to="/USD">Graph</Link>
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
              <Link to="/advertising">Advertising</Link>
            </li>
          </ul>
        </nav>
        <p className="copyright hideDesktop">copyright {year} Nerkhbaz </p>
      </div>
      <div style={{ display: displayNone }} className="back-to-top">
        <a title="Back to top" href="#back_to_top">
          <img src="arrow_up.png" alt="back to the top" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
