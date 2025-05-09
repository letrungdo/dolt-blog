import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import config from "../../../data/SiteConfig";
import { getTagPath } from "../../utils/helpers";
import AutoLink from "../AutoLink/AutoLink";

function PostTags({ tags, extraClass = "", iconColor = "#444" }) {
  const tagLink = (tag) => (
    <AutoLink className="text-uppercase" to={getTagPath(tag)} label={tag}>
      {tag}
    </AutoLink>
  );

  return (
    tags && (
      <div className={`post-tags-container ${extraClass}`}>
        <b>
          {config.postTagged && <span>{config.postTagged} </span>}

          {!config.postTagged && (
            <>
              <FontAwesomeIcon
                icon={["fas", "tags"]}
                style={{ color: iconColor, width: "20px" }}
              />{" "}
            </>
          )}

          {tags.map((tag, index) => (
            <span key={tag}>
              {tagLink(tag)}
              {index < tags.length - 1 && <>, </>}
            </span>
          ))}
        </b>
      </div>
    )
  );
}

export default PostTags;
