import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import {
  getLocalizedPath,
  LANGUAGES,
  SUPPORTED_LANGUAGES,
} from "../../i18n/config";
import "./LanguageSwitcher.scss";

function LanguageSwitcher({
  currentLang = "vi",
  translations = {},
  pathname = "/",
  onSelectLanguage,
  isDropdown = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangConfig = LANGUAGES[currentLang] || LANGUAGES.vi;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        closeDropdown();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLanguageClick = () => {
    closeDropdown();
    if (onSelectLanguage) {
      onSelectLanguage();
    }
  };

  return (
    <div
      className={`language-switcher ${isDropdown ? "is-mobile-menu" : ""} ${
        isOpen ? "is-open" : ""
      }`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="lang-trigger"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="lang-flag">{currentLangConfig.flag}</span>
        <span className="lang-code">{currentLangConfig.shortName}</span>
      </button>

      {isOpen && (
        <ul className="lang-dropdown-menu" role="menu">
          {SUPPORTED_LANGUAGES.map((langCode) => {
            const langConfig = LANGUAGES[langCode];
            const isActive = langCode === currentLang;

            const targetPath =
              translations && translations[langCode]
                ? translations[langCode]
                : getLocalizedPath(pathname, langCode);

            return (
              <li key={langCode} role="none">
                <Link
                  to={targetPath}
                  className={`lang-option ${isActive ? "active" : ""}`}
                  onClick={handleLanguageClick}
                  role="menuitem"
                >
                  <span className="lang-flag">{langConfig.flag}</span>
                  <span className="lang-name">{langConfig.name}</span>
                  <span className="lang-badge">{langConfig.shortName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
