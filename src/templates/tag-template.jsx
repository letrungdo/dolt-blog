import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Pagination from "../components/Pagination/Pagination";
import PostListing from "../components/PostListing/PostListing";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { getPostList, getTagPath } from "../utils/helpers";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../i18n/config";
import { t } from "../i18n/translations";
import SEO from "../components/SEO/SEO";

function TagTemplate({ data, pageContext, location }) {
  const {
    tag,
    lang = DEFAULT_LANGUAGE,
    tagList,
    categoryList,
    latestPostEdges,
    currentPage,
    totalPages,
  } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const content = (
    <>
      <PostListing
        postList={postList}
        hasThumbnail={config.tagHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={getTagPath(tag, lang)}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  );
  const sidebar = (
    <Sidebar
      tagList={tagList}
      categoryList={categoryList}
      latestPostEdges={latestPostEdges}
      links={config.sidebarLinks}
    />
  );

  const headerTitle = `${t("tagHeader", lang)} ${tag}`;

  return (
    <Layout lang={lang} pathname={location?.pathname || "/"}>
      <div className="tag-container">
        <Header title={headerTitle} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
}

export default TagTemplate;

export function Head({ pageContext, location }) {
  const { tag, lang = DEFAULT_LANGUAGE } = pageContext;
  const langConfig = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;
  const headerTitle = `${t("tagHeader", lang)} ${tag}`;

  return (
    <SEO lang={lang} postPath={location?.pathname || "/"}>
      <title>{`${headerTitle} - ${siteTitle}`}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String, $lang: String = "vi", $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: { date: DESC } }
      filter: {
        frontmatter: { tags: { in: [$tag] }, template: { eq: "post" } }
        fields: { lang: { eq: $lang } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
            lang
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
            date
          }
        }
      }
    }
  }
`;
