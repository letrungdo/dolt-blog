import React from "react";
import Hamburger from "./Hamburger";

function NavBars({ handleClick, openDropdown }) {
  return <div onClick={handleClick} className="navbars cursor-pointer padding">
    <Hamburger open={openDropdown} />
  </div>
}

export default NavBars;
