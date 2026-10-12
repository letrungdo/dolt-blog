import React from "react";
import { formatDate } from "../../utils/helpers";
import { useLanguage } from "../../i18n/LanguageContext";

function PostDate({ date, extraClass = "" }) {
  const { t } = useLanguage();
  return (
    <div className={`text-description ${extraClass}`}>
      {t("postedOn")} {formatDate(date)}
    </div>
  );
}

export default PostDate;
