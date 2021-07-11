import React from "react";
import { ReactComponent as NoteFoundSvg } from "../assets/images/404.svg";
import { Link } from "react-router-dom";

const NoteFound = () => {
  return (
    <div className="notFoundWrapper">
      <h4>Looks like the page you are looking for does not exist</h4>
      <NoteFoundSvg style={{ width: "100%", height: "60vh" }} />
      <Link to="/">Back to home page...</Link>
    </div>
  );
};

export default NoteFound;
