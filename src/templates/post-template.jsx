import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Post from "../components/Post/Post";
import SEO from "../components/SEO/SEO";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";

function PostTemplate({ data, pageContext }) {
  const { slug, tagList, categoryList, latestPostEdges } = pageContext;
  const postNode = data.markdownRemark;
  const { title } = postNode.frontmatter;
  const content = <Post postNode={postNode} config={config} slug={slug} />;
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
      <Header title={title} />
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
}

export default PostTemplate;

export function Head({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const { title } = postNode.frontmatter;

  return (
    <SEO postPath={slug} postNode={postNode} postSEO>
      <title>{`${title} - ${config.siteTitle}`}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        categories
        tags
        description
        keywords
        cover {
          childImageSharp {
            gatsbyImageData(width: 660, layout: FIXED)
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
