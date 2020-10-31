import React from "react";
import styled from "styled-components";
import { themeColors } from "../../styles/themeColors";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { getCategoryPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

const CategoryWrapper = styled.div`
  &:hover .category-text {
    padding-left: 5px;
    color: ${(props) => props.color};
  }
`;
const IndexWrapper = styled.div`
  float: left;
  height: 24px;
  min-width: 24px;
  margin-right: 10px;
  border-radius: 2px;
  text-align: center;
  padding: 3px;
  font-size: 1.2rem;
  line-height: 2rem;
  color: white;
  background-color: ${(props) => props.color};
`;
const WidgetCategory = ({ categoryList }) => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title={config.categoryWidgetTitle} color={themeColors[6]} />
    <div>
      {categoryList.map((category, index) => (
        <AutoLink
          key={category}
          to={getCategoryPath(category)}
          className="flex align-items-center border-bottom border-color-light-grey padding-top-half padding-bottom-half widget_categories"
        >
          <IndexWrapper color={themeColors[index]} />
          <CategoryWrapper color={themeColors[index]}>
            <span className="category-text">{category}</span>
          </CategoryWrapper>
        </AutoLink>
      ))}
    </div>
  </WidgetContainer>
);
export default WidgetCategory;
