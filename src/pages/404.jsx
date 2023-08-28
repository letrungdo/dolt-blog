import React from "react";
import config from "../../data/SiteConfig";
import AutoLink from "../components/AutoLink/AutoLink";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import Layout from "../layout";

function PageNotFound() {
  return (
    <Layout hasFooter={false}>
      <div className="page-not-found-container">
        <Header title={`${config.pageNotFoundTitle}`} />
        <div className="main-content container padding-top-3 padding-bottom-3 margin-top-3 margin-bottom-3">
          <p>{config.pageNotFoundContent}</p>
          <AutoLink to="/" className="btn btn-primary">
            {config.pageNotFoundBtn}
          </AutoLink>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;

export function Head() {
  return (
    <SEO>
      <title>{`${config.pageNotFoundTitle} - ${config.siteTitle}`}</title>
    </SEO>
  );
}
