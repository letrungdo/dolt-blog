const React = require("react");
const siteConfig = require("./data/SiteConfig");

// AdSense is added here instead of the Head API (SEO.jsx): the Head API marks tags with
// data-gatsby-head, which AdSense warns it does not support. Posts flagged noAds skip it.
exports.onRenderBody = ({ setHeadComponents, pathname, loadPageDataSync }) => {
  let noAds = false;
  try {
    noAds = Boolean(loadPageDataSync(pathname).result.pageContext.noAds);
  } catch (e) {
    // Pages without page data (e.g. dev 404) keep ads.
  }
  if (noAds) return;
  setHeadComponents([
    <script
      key="adsbygoogle"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsClientId}`}
    />,
  ]);
};
