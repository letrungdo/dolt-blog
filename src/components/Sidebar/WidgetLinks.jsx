import React from "react";
import styled from "@emotion/styled";
import { linkColors } from "../../styles/themeColors";
import { useLanguage } from "../../i18n/LanguageContext";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";

const LinkWrapper = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  text-align: center;
  line-height: 36px;
  height: 36px;
  border-radius: 18px;
  transition: opacity 0.15s linear 0s;
  -moz-transition: opacity 0.15s linear 0s;
  -ms-transition: opacity 0.15s linear 0s;
  -o-transition: opacity 0.15s linear 0s;
  -webkit-transition: opacity 0.15s linear 0s;
  &:hover {
    opacity: 0.8;
  }
`;

function WidgetLinks({ links }) {
  const { t } = useLanguage();

  if (!links || links.length === 0) return null;

  return (
    <WidgetContainer extraClass="categories-container">
      <WidgetTitle title={t("linksWidgetTitle")} color={linkColors[3]} />
      <div>
        {links.map((link, index) => (
          <AutoLink
            key={link.label}
            to={link.url}
            className="block padding-top-half padding-bottom-half"
          >
            <LinkWrapper color={linkColors[index]}>{link.label}</LinkWrapper>
          </AutoLink>
        ))}
      </div>
    </WidgetContainer>
  );
}

export default WidgetLinks;
