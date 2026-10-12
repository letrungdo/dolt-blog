import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import config from "../../../data/SiteConfig";
import { useLanguage } from "../../i18n/LanguageContext";
import { getLocalizedPath } from "../../i18n/config";
import { themeColors } from "../../styles/themeColors";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";

function WidgetSearch() {
  const { t, lang } = useLanguage();

  if (!config.hasSearch) return null;

  const searchAction = getLocalizedPath("/search/", lang);

  return (
    <WidgetContainer extraClass="search-container">
      <WidgetTitle title={t("searchWidgetTitle")} color={themeColors[4]} />
      <form className="margin-bottom-none" action={searchAction} method="get">
        <div className="container-full row padding-none margin-bottom-none">
          <div className="padding-none padding-right-half col-xs-10">
            <input
              className="margin-bottom-none"
              type="text"
              name="q"
              placeholder={t("searchWidgetPlaceholder")}
              required
              spellCheck="false"
            />
          </div>
          <div className="padding-none padding-left-half col-xs-2">
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon
                icon={["fas", "search"]}
                style={{ color: "#FFFFFF" }}
              />
            </button>
          </div>
        </div>
      </form>
    </WidgetContainer>
  );
}

export default WidgetSearch;
