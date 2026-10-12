import React from "react";
import Hamburger from "./Hamburger";

function NavBars({ handleClick, openDropdown }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="navbars cursor-pointer"
      aria-label={openDropdown ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={openDropdown}
    >
      <Hamburger open={openDropdown} />
    </button>
  );
}

export default NavBars;
