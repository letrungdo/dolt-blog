import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import MainContainer from "../components/MainContainer/MainContainer";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../i18n/config";
import {
  getPostInCategory,
  getPostList,
  getTagCategoryList,
} from "../utils/helpers";

function Index({ data, pageContext, location }) {
  const currentLang = pageContext?.lang || DEFAULT_LANGUAGE;
  const postEdges = data?.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);
  const { tagList, categoryList } = getTagCategoryList(postList);
  const postInCategory = getPostInCategory(postList, categoryList);

  const content = (
    <PostListing
      postList={postList}
      hasThumbnail={config.homeHasThumbnail}
      hasLoadmore={config.homeHasLoadmore}
      postsPerPage={config.postsPerPage}
      numberLoadmore={config.numberLoadmore}
    />
  );
  const sidebar = (
    <Sidebar
      postInCategory={postInCategory}
      tagList={tagList}
      categoryList={categoryList}
      links={config.sidebarLinks}
    />
  );

  return (
    <Layout lang={currentLang} pathname={location?.pathname || "/"}>
      <div className="index-container">
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
}

export default Index;

export function Head({ pageContext, location }) {
  const currentLang = pageContext?.lang || DEFAULT_LANGUAGE;
  const langConfig = LANGUAGES[currentLang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;

  return (
    <SEO lang={currentLang} postPath={location?.pathname || "/"}>
      <title>{siteTitle}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($lang: String = "vi") {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: { date: DESC } }
      filter: {
        frontmatter: { template: { eq: "post" } }
        fields: { lang: { eq: $lang } }
      }
    ) {
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
`;
