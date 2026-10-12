import React from "react";
import styled from "@emotion/styled";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";
import { useLanguage } from "../../i18n/LanguageContext";

const TagsWrapper = styled.div`
  border: 2px solid;
  border-color: ${(props) => props.color};
  padding: 5px;
  &:hover {
    color: ${(props) => props.color};
  }
`;

function Tag({ content, color }) {
  const { lang } = useLanguage();
  return (
    <AutoLink key={content} to={getTagPath(content, lang)}>
      <TagsWrapper
        className="inline-block margin-right-half margin-bottom-half
        border padding-left-half padding-right-half"
        color={color}
      >
        <span>{content}</span>
      </TagsWrapper>
    </AutoLink>
  );
}

export default Tag;
