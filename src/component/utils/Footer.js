import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footerContainer">
      <div className="footerWrapper">
        <ul className="linksWrapper">
          <li className="linksItem">
            <a href="/">Home</a>
          </li>
          <li className="linksItem">
            <a href="/">Archive</a>
          </li>
          <li className="linksItem">
            <a href="/">Graph</a>
          </li>
        </ul>
        <ul className="policyWrapper">
          <li className="policyItem">
            <a href="/">Disclaimer</a>
          </li>
          <li className="policyItem">
            <a href="/">Privacy</a>
          </li>
          <li className="policyItem">
            <a href="/">Advertising</a>
          </li>
        </ul>
        <ul className="socialWrapper">
          <li className="socialItem">
            <a href="/">
              <img src="facebook.svg" alt="social facebook"></img>
            </a>
          </li>
          <li className="socialItem">
            <a href="/">
              <img src="instagram.svg" alt="social instagram"></img>
            </a>
          </li>
          <li className="socialItem">
            <a href="/">
              <img src="twitter.svg" alt="social twitter"></img>
            </a>
          </li>
          <li className="socialItem">
            <a href="/">
              <img src="envelope.png" alt="contact icon"></img>
            </a>
          </li>
        </ul>
      </div>
      <p className="copyright">copyright {year} Nerkhbaz </p>
    </div>
  );
};

export default Footer;
