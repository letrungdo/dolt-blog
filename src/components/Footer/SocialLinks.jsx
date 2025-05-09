import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoLink from "../AutoLink/AutoLink";

function SocialLinks({ socials, color }) {
  return <div className="social-links-container margin-half">
    {socials.map((social) => {
      if (social.url !== "")
        return (
          <AutoLink
            className="margin-left-half margin-right-half"
            to={social.url}
            key={social.label}
          >
            <FontAwesomeIcon
              icon={social.iconClassName.split(" ")}
              transform="grow-2"
              style={{ color }}
            />
          </AutoLink>
        );

      // Ignore
      return null;
    })}
  </div>
}

export default SocialLinks;
