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

function CategoryTemplate({ data, pageContext }) {
  const {
    category,
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
        pathPrefix={getCategoryPath(category)}
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

  return (
    <Layout>
      <div className="category-container">
        <Header title={`${config.categoryHeader} ${category}`} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
}

export default CategoryTemplate;

export function Head({ pageContext }) {
  const { category } = pageContext;
  return (
    <title>{`${config.categoryHeader} ${category} - ${config.siteTitle}`}</title>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: { date: DESC } }
      filter: {
        frontmatter: {
          categories: { in: [$category] }
          template: { eq: "post" }
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
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
