import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Pagination from "../components/Pagination/Pagination";
import PostListing from "../components/PostListing/PostListing";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { getCategoryPath, getPostList } from "../utils/helpers";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../i18n/config";
import { t } from "../i18n/translations";
import SEO from "../components/SEO/SEO";

function CategoryTemplate({ data, pageContext, location }) {
  const {
    category,
    lang = DEFAULT_LANGUAGE,
    categoryList,
    tagList,
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
        hasThumbnail={config.categoryHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={getCategoryPath(category, lang)}
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

  const headerTitle = `${t("categoryHeader", lang)} ${category}`;

  return (
    <Layout lang={lang} pathname={location?.pathname || "/"}>
      <div className="category-container">
        <Header title={headerTitle} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
}

export default CategoryTemplate;

export function Head({ pageContext, location }) {
  const { category, lang = DEFAULT_LANGUAGE } = pageContext;
  const langConfig = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;
  const headerTitle = `${t("categoryHeader", lang)} ${category}`;

  return (
    <SEO lang={lang} postPath={location?.pathname || "/"}>
      <title>{`${headerTitle} - ${siteTitle}`}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String, $lang: String = "vi", $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: { date: DESC } }
      filter: {
        frontmatter: {
          categories: { in: [$category] }
          template: { eq: "post" }
        }
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
