import React from "react";
import Tag from "../Tag/Tag";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import config from "../../../data/SiteConfig";
import { themeColors } from "../../styles/themeColors";

const WidgetTag = ({ tagList }) => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title={config.tagWidgetTitle} color={themeColors[5]} />
    <div>
      {tagList.map((tag, index) => (
        <Tag key={tag} content={tag} color={themeColors[index]} />
      ))}
    </div>
  </WidgetContainer>
)
export default WidgetTag;