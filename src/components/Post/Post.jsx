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
import { useLanguage } from "../../i18n/LanguageContext";

const splitAtMiddleHeading = (html) => {
  const headings = [...html.matchAll(/<h[23][\s>]/g)];
  if (headings.length < 2) return [html, ""];
  const { index } = headings[Math.floor(headings.length / 2)];
  return [html.slice(0, index), html.slice(index)];
};

function Post({ postNode, config, slug }) {
  const { t } = useLanguage();
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  const { adSlots, postMiddleLayout } = config;
  const [firstHalf, secondHalf] = splitAtMiddleHeading(postNode.html);

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
      <GoogleAds adSlot={adSlots.postTop} extraClass="padding-top" />
      <div className="padding-top padding-bottom">
        <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
        {secondHalf && (
          <>
            <GoogleAds
              adSlot={adSlots.postMiddle}
              adLayout={postMiddleLayout}
              extraClass="padding-top-half padding-bottom-half"
            />
            <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
          </>
        )}
      </div>
      <GoogleAds adSlot={adSlots.postBottom} extraClass="padding-bottom" />
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
        btnLoadComments={t("btnLoadComments")}
      />
    </div>
  );
}

export default Post;
