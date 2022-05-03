import React from "react";
import Thumbnail from "./Thumbnail";
import PostInfo from "./PostInfo";
import "./Article.scss";

function Article({ post, hasThumbnail }) {
  return <article
    key={post.title}
    className="article-container padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"
  >
    {hasThumbnail && <Thumbnail post={post} />}
    <PostInfo post={post} />
  </article>
}

export default Article;
