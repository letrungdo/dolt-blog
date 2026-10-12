import { graphql } from "gatsby";
import React from "react";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../i18n/config";

function PageTemplate({ data, pageContext, location }) {
  const {
    slug,
    lang = DEFAULT_LANGUAGE,
    translations = {},
    tagList,
    categoryList,
    latestPostEdges,
  } = pageContext;
  const postNode = data.markdownRemark;
  const { title } = postNode.frontmatter;
  const content = <Page postNode={postNode} slug={slug} />;
  const sidebar = (
    <Sidebar
      tagList={tagList}
      categoryList={categoryList}
      latestPostEdges={latestPostEdges}
      links={config.sidebarLinks}
    />
  );

  return (
    <Layout
      lang={lang}
      translations={translations}
      pathname={location?.pathname || slug}
    >
      <Header title={title} />
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
}

export default PageTemplate;

export function Head({ data, pageContext }) {
  const { slug, lang = DEFAULT_LANGUAGE, translations = {} } = pageContext;
  const postNode = data.markdownRemark;
  const { title } = postNode.frontmatter;
  const langConfig = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;

  return (
    <SEO
      postPath={slug}
      postNode={postNode}
      postSEO
      lang={lang}
      translations={translations}
    >
      <title>{`${title} - ${siteTitle}`}</title>
    </SEO>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        description
      }
      fields {
        slug
        lang
        translationKey
      }
    }
  }
`;
