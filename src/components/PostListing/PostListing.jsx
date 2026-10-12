import React, { useState } from "react";
import Article from "./Article";
import { useLanguage } from "../../i18n/LanguageContext";

function PostListing({
  postList,
  hasThumbnail = true,
  hasLoadmore = false,
  postsPerPage,
  numberLoadmore,
  btnLoadmore,
}) {
  const { t } = useLanguage();
  const [maxPosts, setMaxPosts] = useState(
    hasLoadmore && postsPerPage ? postsPerPage : postList.length
  );

  const handleLoadmore = () => {
    if (!hasLoadmore || !numberLoadmore) return;
    setMaxPosts((prev) => prev + numberLoadmore);
  };

  const loadMoreText = btnLoadmore || t("btnLoadmore");

  return (
    <>
      <div className="post-listing-container">
        {postList.map((post, index) => {
          if (index < maxPosts) {
            return (
              <Article
                key={`${post.slug}-${index}`}
                post={post}
                hasThumbnail={hasThumbnail}
              />
            );
          }
          return null;
        })}
      </div>
      {hasLoadmore && maxPosts < postList.length && (
        <div className="loadmore-wrapper margin-top padding-top-half text-center">
          <button
            type="button"
            className="btn-primary"
            onClick={handleLoadmore}
          >
            {loadMoreText}
          </button>
        </div>
      )}
    </>
  );
}

export default PostListing;
