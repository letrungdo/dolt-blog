import React, { useCallback, useEffect, useState } from "react";
import NavBars from "./NavBars";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import "./Navigation.scss";

function Navigation({
  brand,
  title,
  links,
  currentLang,
  translations,
  pathname,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpenDropdown((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpenDropdown(false);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && openDropdown) {
        closeMenu();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, closeMenu]);

  // Lock body scroll when mobile dropdown is open
  useEffect(() => {
    if (openDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openDropdown]);

  return (
    <nav className="navigation-container background-color-white" role="navigation" aria-label="Main Navigation">
      <div className="navigation-main container flex align-items-center justify-content-space-between">
        <NavBrand brand={brand} title={title} onLinkClick={closeMenu} />
        <NavLinks
          links={links}
          currentLang={currentLang}
          translations={translations}
          pathname={pathname}
          onLinkClick={closeMenu}
        />
        <NavBars
          handleClick={toggleMenu}
          openDropdown={openDropdown}
        />
      </div>

      {/* Backdrop for mobile menu */}
      {openDropdown && (
        <div
          className="navigation-backdrop"
          onClick={closeMenu}
          role="presentation"
        />
      )}

      {/* Mobile navigation drawer / dropdown */}
      <div className={`navigation-dropdown ${openDropdown ? "is-open" : ""}`}>
        <div className="navigation-dropdown-inner container">
          <NavLinks
            links={links}
            isDropdown
            currentLang={currentLang}
            translations={translations}
            pathname={pathname}
            onLinkClick={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
