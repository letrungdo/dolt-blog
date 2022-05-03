import React from "react";
import AutoLink from "../AutoLink/AutoLink";

function NavBrand({ brand, title }) {
  return <div className="brand">
    <AutoLink className="flex align-items-center" to="/">
      <img
        className="image margin-right-half border-radius"
        src={brand}
        alt="Brand"
      />
      <span className="title">
        <strong>{title}</strong>
      </span>
    </AutoLink>
  </div>
}

export default NavBrand;
