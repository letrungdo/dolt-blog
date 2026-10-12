import React from "react";
import SearchContent from "./SearchContent";

function Page({ postNode, slug }) {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  const isSearchPage =
    slug && (slug.includes("search") || postNode.fields?.translationKey === "search");

  return (
    <div className="page-container">
      {isSearchPage ? (
        <SearchContent />
      ) : (
        <div
          className="padding-top padding-bottom"
          dangerouslySetInnerHTML={{ __html: postNode.html }}
        />
      )}
    </div>
  );
}

export default Page;
