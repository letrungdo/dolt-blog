import React from "react";
import brand from "../../content/images/brand.webp";
import "../../content/styles/customize.scss";
import siteConfig from "../../data/SiteConfig";
import Footer from "../components/Footer/Footer";
import "../components/Icons/FontAwesome";
import Navigation from "../components/Navigation/Navigation";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { DEFAULT_LANGUAGE, getLocalizedPath } from "../i18n/config";
import { LanguageProvider } from "../i18n/LanguageContext";
import { t } from "../i18n/translations";
import "../styles/main.min.css";

function MainLayout({
  children,
  hasFooter = true,
  lang = DEFAULT_LANGUAGE,
  translations = {},
  pathname = "/",
}) {
  const currentLang = lang || DEFAULT_LANGUAGE;

  const navLinks = [
    { label: t("navCv", currentLang), url: "https://cv.xn--t-lia.vn" },
    { label: t("navApp", currentLang), url: "https://app.xn--t-lia.vn" },
    {
      label: t("navAbout", currentLang),
      url: getLocalizedPath("/about", currentLang),
    },
    {
      label: t("navContact", currentLang),
      url: getLocalizedPath("/contact", currentLang),
    },
  ];

  const footerLinks = [
    {
      label: t("navHome", currentLang),
      url: getLocalizedPath("/", currentLang),
    },
    {
      label: t("navAbout", currentLang),
      url: getLocalizedPath("/about", currentLang),
    },
    {
      label: t("navContact", currentLang),
      url: getLocalizedPath("/contact", currentLang),
    },
    {
      label: t("navTerms", currentLang),
      url: getLocalizedPath("/terms", currentLang),
    },
    {
      label: t("navPrivacy", currentLang),
      url: getLocalizedPath("/privacy", currentLang),
    },
    {
      label: t("navSitemap", currentLang),
      url: getLocalizedPath("/sitemap-index.xml", currentLang),
    },
  ];

  return (
    <LanguageProvider lang={currentLang} translations={translations}>
      <div>
        <Navigation
          brand={brand}
          title={siteConfig.navTitle}
          links={navLinks}
          currentLang={currentLang}
          translations={translations}
          pathname={pathname}
        />
        {children}
        {hasFooter && (
          <Footer
            socials={siteConfig.socialLinks}
            links={footerLinks}
            copyright={t("copyright", currentLang)}
          />
        )}
        <ScrollToTop color="#FFF" bgColor="grey-half" />
      </div>
    </LanguageProvider>
  );
}

export default MainLayout;
