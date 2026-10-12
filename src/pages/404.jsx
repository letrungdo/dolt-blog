import React from "react";
import config from "../../data/SiteConfig";
import AutoLink from "../components/AutoLink/AutoLink";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import Layout from "../layout";
import { DEFAULT_LANGUAGE, LANGUAGES, getLangFromPath, getLocalizedPath } from "../i18n/config";
import { t } from "../i18n/translations";

function PageNotFound({ location }) {
  const lang = getLangFromPath(location?.pathname);
  const homePath = getLocalizedPath("/", lang);

  return (
    <Layout hasFooter={false} lang={lang} pathname={location?.pathname || "/"}>
      <div className="page-not-found-container">
        <Header title={t("pageNotFoundTitle", lang)} />
        <div className="main-content container padding-top-3 padding-bottom-3 margin-top-3 margin-bottom-3">
          <p>{t("pageNotFoundContent", lang)}</p>
          <AutoLink to={homePath} className="btn btn-primary">
            {t("pageNotFoundBtn", lang)}
          </AutoLink>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;

export function Head({ location }) {
  const lang = getLangFromPath(location?.pathname);
  const langConfig = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;
  const pageTitle = t("pageNotFoundTitle", lang);

  return (
    <SEO lang={lang} postPath={location?.pathname || "/"}>
      <title>{`${pageTitle} - ${siteTitle}`}</title>
    </SEO>
  );
}
