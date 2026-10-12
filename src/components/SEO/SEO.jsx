import { getImage } from "gatsby-plugin-image";
import React from "react";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  getLocalizedPath,
} from "../../i18n/config";

function SEO({
  postNode,
  postPath,
  postSEO,
  lang,
  translations = {},
  children,
}) {
  let title;
  let description;
  let keywords;
  let image = "";
  let postURL;

  const currentLang =
    lang || postNode?.fields?.lang || DEFAULT_LANGUAGE;
  const langConfig = LANGUAGES[currentLang] || LANGUAGES[DEFAULT_LANGUAGE];

  if (postSEO && postNode) {
    const postMeta = postNode.frontmatter;
    title = postMeta.title;
    description = postMeta.description
      ? postMeta.description
      : postNode.excerpt;
    keywords = postMeta.keywords;

    if (postMeta.cover) {
      const gatsbyImage = getImage(postMeta.cover);
      if (gatsbyImage?.images?.fallback?.src) {
        image = gatsbyImage.images.fallback.src;
      }
    }

    postURL = urljoin(config.siteUrl, config.pathPrefix, postPath || "");
  } else {
    title = langConfig.siteTitle || config.siteTitle;
    description = langConfig.siteDescription || config.siteDescription;
    image = config.siteLogo;
  }

  image = urljoin(config.siteUrl, config.pathPrefix, image);
  const blogURL = urljoin(config.siteUrl, config.pathPrefix);
  const currentCanonicalURL = postSEO ? postURL : urljoin(config.siteUrl, config.pathPrefix, postPath || "/");

  // Determine hreflang alternate paths
  const relativePath = postPath || "/";
  const viPath = translations.vi || getLocalizedPath(relativePath, "vi");
  const enPath = translations.en || getLocalizedPath(relativePath, "en");

  const viURL = urljoin(config.siteUrl, config.pathPrefix, viPath);
  const enURL = urljoin(config.siteUrl, config.pathPrefix, enPath);

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
      inLanguage: currentLang,
    },
  ];

  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image,
        },
        description,
        inLanguage: currentLang,
      }
    );
  }

  const ogLocale = langConfig.locale || "vi_VN";
  const alternateOgLocale = currentLang === "vi" ? "en_US" : "vi_VN";

  return (
    <>
      <html lang={currentLang} />
      {/* Canonical and Alternate Hreflang Tags for SEO */}
      <link rel="canonical" href={currentCanonicalURL} />
      <link rel="alternate" hrefLang="vi" href={viURL} />
      <link rel="alternate" hrefLang="en" href={enURL} />
      <link rel="alternate" hrefLang="x-default" href={viURL} />

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={alternateOgLocale} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <script
        data-ad-client={config.adsClientId}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <script
        async
        defer
        crossOrigin="anonymous"
        src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0&appId=${config.siteFBAppID}`}
      />
      {children}
    </>
  );
}

export default SEO;
