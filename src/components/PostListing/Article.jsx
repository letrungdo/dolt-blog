import styled from "@emotion/styled";
import React from "react";
import PostInfo from "./PostInfo";
import Thumbnail from "./Thumbnail";

function Article({ post, hasThumbnail }) {
  return (
    <Articlecontainer
      key={post.title}
      className="article-container padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"
    >
      {hasThumbnail && <Thumbnail post={post} />}
      <PostInfo post={post} />
    </Articlecontainer>
  );
}

const Articlecontainer = styled.article`
  display: flex;
  flex-direction: column;
  .thumbnail-wrapper {
    .thumbnail-img {
      width: 660px;
      max-width: 100%;
    }
  }
  .post-info-wrapper {
    margin-top: 2rem;
  }
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    .thumbnail-wrapper {
      .thumbnail-img {
        width: 300px;
      }
    }
    .post-info-wrapper {
      margin-top: unset;
    }
  }
`;

export default Article;
