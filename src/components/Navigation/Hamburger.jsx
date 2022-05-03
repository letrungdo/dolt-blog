import React from "react";
import "./Hamburger.scss";

function Hamburger({ open }) {
  return <div className={`hamburger ${open ? "open" : ""}`}>
    <span />
    <span />
    <span />
    <span />
  </div>
}

export default Hamburger;
