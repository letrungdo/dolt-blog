import React from "react";
import "../../../content/styles/code-highlight.scss";
import Comment from "../Comment/Comment";
import GoogleAds from "../GoogleAds";
import "./Post.scss";
import PostCategories from "./PostCategories";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostShare from "./PostShare";
import PostTags from "./PostTags";

function Post({ postNode, config, slug }) {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  return (
    <div className="post-container">
      <div className="meta-share-wrapper padding-top padding-bottom">
        <PostDate extraClass="meta-wrapper" date={post.date} />
        <PostShare
          extraClass="share-wrapper"
          postPath={slug}
          postNode={postNode}
        />
      </div>
      <PostDivider />
      <div
        className="padding-top padding-bottom"
        dangerouslySetInnerHTML={{ __html: postNode.html }}
      />
      <PostDivider />
      <div className="padding-top padding-bottom">
        <small>
          <PostCategories
            categories={post.categories}
            extraClass="block"
            iconColor="#555"
          />
          <PostTags
            tags={post.tags}
            extraClass="block padding-top-half"
            iconColor="#555"
          />
        </small>
        <GoogleAds adFormat="link" adSlot="5431006373" />
      </div>
      <PostDivider />
      <div
        className="fb-comments"
        data-href={`${config.siteUrl}${slug}`}
        data-width="auto"
        data-numposts="5"
      />
      <Comment
        postNode={postNode}
        extraClass="padding-top"
        lazyload={config.lazyLoadComments}
        btnLoadComments={config.btnLoadComments}
      />
    </div>
  );
}

export default Post;
