import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import config from "../../../data/SiteConfig";
import { themeColors } from "../../styles/themeColors";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";

class WidgetSearch extends Component {
  render() {
    return (
      config.hasSearch && (
        <WidgetContainer extraClass="search-container">
          <WidgetTitle
            title={config.searchWidgetTitle}
            color={themeColors[4]}
          />
          <form className="margin-bottom-none" action="/search/" method="get">
            <div className="container-full row padding-none margin-bottom-none">
              <div className="padding-none padding-right-half col-xs-10">
                <input
                  className="margin-bottom-none"
                  type="text"
                  name="q"
                  placeholder={config.searchWidgetPlaceHolder}
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
      )
    );
  }
}
export default WidgetSearch;
