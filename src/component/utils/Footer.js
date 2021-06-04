import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footerContainer">
      <div className="footerWrapper">
        <ul className="linksWrapper">
          <li className="linksItem">
            <Link to="/">Home</Link>
          </li>
          <li className="linksItem">
            <Link to="/archive">Archive</Link>
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
        <ul className="socialWrapper">
          <li className="socialItem">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com"
            >
              <img src="facebook.svg" alt="social facebook"></img>
            </a>
          </li>
          <li className="socialItem">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com"
            >
              <img src="instagram.svg" alt="social instagram"></img>
            </a>
          </li>
          <li className="socialItem">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com"
            >
              <img src="twitter.svg" alt="social twitter"></img>
            </a>
          </li>
          <li className="socialItem">
            <a href="mailto:support@nerkhbaz.com">
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
