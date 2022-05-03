import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const Thumbnail = ({ post, extraClass = "" }) => {
  const img = post.cover ? getImage(post.cover) : null;
  const thumbnail = img ? (
    <AutoLink
      to={post.slug}
      key={post.title}
      className={`thumbnail-wrapper line-height-reset ${extraClass}`}
    >
      <GatsbyImage image={img} alt="thumbnail" className="thumbnail-img margin-right-2" />
    </AutoLink>
  ) : null;

  return thumbnail;
};

export default Thumbnail;
