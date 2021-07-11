import React from "react";
import { ReactComponent as AdsImage } from "../assets/images/ads_page.svg";

const Ads = () => {
  return (
    <div className="ads-image-container">
      <div className="ads-image-wrapper">
        <AdsImage />
        <div className="ads-text-wrapper">
          <h2>
            Place your ads here with us{" "}
            <span role="img" aria-label="smily face">
              😊
            </span>{" "}
          </h2>
          <p>
            To learn more about advertising opportunities on Nerkhbaz.com or
            inquire about a partnership send us an email to:
            <a href="mailto:support@nerkhbaz.com">
              support@nerkhbaz.com
            </a> .{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ads;
