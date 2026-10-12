import React from "react";
import Tag from "../Tag/Tag";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { themeColors } from "../../styles/themeColors";
import { useLanguage } from "../../i18n/LanguageContext";

function WidgetTag({ tagList }) {
  const { t } = useLanguage();
  return (
    <WidgetContainer extraClass="categories-container">
      <WidgetTitle title={t("tagsWidgetTitle")} color={themeColors[5]} />
      <div>
        {tagList.map((tag, index) => (
          <Tag key={tag} content={tag} color={themeColors[index]} />
        ))}
      </div>
    </WidgetContainer>
  );
}
export default WidgetTag;
