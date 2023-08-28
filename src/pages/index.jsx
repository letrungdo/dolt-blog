import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import {
  getPostInCategory,
  getPostList,
  getTagCategoryList,
} from "../utils/helpers";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
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
        btnLoadmore={config.btnLoadmore}
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

    const headerTitle = config.homeHeader
      ? `${config.siteTitle} - ${config.homeHeader}`
      : `${config.siteTitle}`;

    return (
      <Layout>
        <div className="index-container">
          <Header title={headerTitle} />
          <MainContainer content={content} sidebar={sidebar} />
        </div>
      </Layout>
    );
  }
}

export default Index;

export function Head() {
  return (
    <SEO>
      <title>{config.siteTitle}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: { date: DESC } }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
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
