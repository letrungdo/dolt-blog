import { getImage } from "gatsby-plugin-image";
import React, { Component } from "react";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO, children } = this.props;
    let title;
    let description;
    let keywords;
    let image = "";
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;

      keywords = postMeta.keywords;

      if (postMeta.cover) {
        image = getImage(postMeta.cover).images.fallback.src;
      }

      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }

    image = urljoin(config.siteUrl, config.pathPrefix, image);
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
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
        }
      );
    }
    return (
      <>
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
          onError={() => {
            window.postMessage({ hasAd: true });
          }}
        />
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=${config.siteFBAppID}&autoLogAppEvents=1`}
          nonce="HOOIv1rM"
        />
        {children}
      </>
    );
  }
}

export default SEO;
