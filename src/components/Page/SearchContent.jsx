import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLanguage } from "../../i18n/LanguageContext";
import PostListing from "../PostListing/PostListing";
import { getPostList } from "../../utils/helpers";

function SearchContent() {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const data = useStaticQuery(graphql`
    query AllPostsForSearch {
      allMarkdownRemark(
        sort: { fields: { date: DESC } }
        filter: { frontmatter: { template: { eq: "post" } } }
      ) {
        edges {
          node {
            fields {
              slug
              date
              lang
            }
            excerpt(pruneLength: 150)
            timeToRead
            frontmatter {
              title
              tags
              categories
              date
              cover {
                childImageSharp {
                  gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
  `);

  const allPosts = getPostList(data.allMarkdownRemark.edges);
  const langPosts = allPosts.filter((post) => post.lang === lang);

  const filteredPosts = langPosts.filter((post) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = post.title && post.title.toLowerCase().includes(q);
    const excerptMatch = post.excerpt && post.excerpt.toLowerCase().includes(q);
    const tagMatch =
      post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q));
    const catMatch =
      post.categories &&
      post.categories.some((cat) => cat.toLowerCase().includes(q));
    return titleMatch || excerptMatch || tagMatch || catMatch;
  });

  return (
    <div className="search-page-content padding-top padding-bottom">
      <div className="margin-bottom-2">
        <input
          type="text"
          className="width-full padding"
          style={{
            fontSize: "1.6rem",
            padding: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100%",
          }}
          placeholder={t("searchWidgetPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery && (
        <div className="margin-bottom text-description">
          {lang === "vi" ? "Tìm thấy" : "Found"} <b>{filteredPosts.length}</b>{" "}
          {lang === "vi" ? "kết quả cho từ khóa" : "results for"}{" "}
          "<b>{searchQuery}</b>"
        </div>
      )}
      {filteredPosts.length > 0 ? (
        <PostListing postList={filteredPosts} hasThumbnail hasLoadmore={false} />
      ) : (
        <div className="text-center padding-top-3 padding-bottom-3">
          <p>{t("pageNotFoundContent")}</p>
        </div>
      )}
    </div>
  );
}

export default SearchContent;
