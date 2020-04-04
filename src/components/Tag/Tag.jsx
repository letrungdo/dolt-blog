import React from "react";
import styled from "styled-components";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";

const TagsWrapper = styled.div`
  border: 2px solid;
  border-color: ${(props) => props.color};
  padding: 5px;
  &:hover {
    color: ${(props) => props.color};
  }
`;
const Tag = ({ content, color }) => (
  <AutoLink key={content} to={getTagPath(content)}>
    <TagsWrapper
      className="inline-block margin-right-half margin-bottom-half 
      border padding-left-half padding-right-half"
      color={color}
    >
      <span>{content}</span>
    </TagsWrapper>
  </AutoLink>
);
export default Tag;
