import React from "react";
import { formatDate } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

function PostDate({ date, extraClass = "" }) {
  return <div className={`text-description ${extraClass}`}>
    {config.postOnDate} {formatDate(date)}
  </div>
}

export default PostDate;
