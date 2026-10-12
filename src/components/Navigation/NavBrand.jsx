import React from "react";
import { getLocalizedPath } from "../../i18n/config";
import { useLanguage } from "../../i18n/LanguageContext";
import AutoLink from "../AutoLink/AutoLink";

function NavBrand({ brand, title, onLinkClick }) {
  const { lang } = useLanguage();
  const homePath = getLocalizedPath("/", lang);

  return (
    <div className="brand">
      <AutoLink
        className="flex align-items-center"
        to={homePath}
        onClick={onLinkClick}
      >
        <img
          className="image margin-right-half border-radius"
          src={brand}
          alt={title || "Brand"}
        />
        <span className="title">
          <strong>{title}</strong>
        </span>
      </AutoLink>
    </div>
  );
}

export default NavBrand;
