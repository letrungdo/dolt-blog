import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import config from "../../../data/SiteConfig";
import { getCategoryPath } from "../../utils/helpers";
import AutoLink from "../AutoLink/AutoLink";

function PostCategories({ categories, extraClass = "", iconColor = "#444" }) {
  const categoryLink = (category) => (
    <AutoLink
      className="text-uppercase"
      to={getCategoryPath(category)}
      label={category}
    >
      {category}
    </AutoLink>
  );

  return (
    categories && (
      <div className={`post-categories-container ${extraClass}`}>
        <b>
          {config.postInCategories && <span>{config.postInCategories} </span>}

          {!config.postInCategories && (
            <>
              <FontAwesomeIcon
                icon={["fas", "folder-open"]}
                style={{ color: iconColor, width: "20px" }}
              />{" "}
            </>
          )}

          {categories.map((category, index) => (
            <span key={category}>
              {categoryLink(category)}
              {index < categories.length - 1 && <>, </>}
            </span>
          ))}
        </b>
      </div>
    )
  );
}

export default PostCategories;
