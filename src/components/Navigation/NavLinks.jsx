import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function NavLinks({
  links = [],
  isDropdown = false,
  currentLang = "vi",
  translations = {},
  pathname = "/",
  onLinkClick,
}) {
  const navLinksClassDropdown = "nav-links text-left nav-links-mobile";
  const navLinksClassNormal = "nav-links text-right nav-links-desktop";
  const navLinksClass = isDropdown
    ? navLinksClassDropdown
    : navLinksClassNormal;

  const itemClassDropdown = "nav-item nav-item-mobile block";
  const itemClassNormal = "nav-item nav-item-desktop";
  const itemClass = isDropdown ? itemClassDropdown : itemClassNormal;

  return (
    <div className={navLinksClass}>
      {links.map((link) => (
        <AutoLink
          key={link.label}
          to={link.url}
          activeClassName="active"
          className={itemClass}
          onClick={onLinkClick}
        >
          {link.label}
        </AutoLink>
      ))}
      <div className={isDropdown ? "nav-lang-wrapper-mobile" : "nav-lang-wrapper-desktop"}>
        <LanguageSwitcher
          currentLang={currentLang}
          translations={translations}
          pathname={pathname}
          onSelectLanguage={onLinkClick}
          isDropdown={isDropdown}
        />
      </div>
    </div>
  );
}

export default NavLinks;
