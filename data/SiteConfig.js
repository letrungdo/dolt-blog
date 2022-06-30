const config = {
  // Site info
  siteTitle: "TĐ.VN", // Site title.
  siteTitleShort: "TĐ.VN", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "TĐ.VN - Le Trung Do Blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://xn--t-lia.vn", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Blog học lập trình Xamarin Forms, ReactJs, Chia sẻ tài liệu học tập.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "en",
  siteFBAppID: "2944501422238707", // FB Application ID for using app insights
  googleAnalyticsID: "UA-154318328-2", // GA tracking ID.
  postDefaultCategoryID: "", // Default category for posts.
  adsClientId: "ca-pub-1932696824172910",
  // Common for tag, category pages and widget
  numberLatestPost: 6,
  postsPerPage: 6,
  // Use for post
  dateFromFormat: "YYYY-MM-DDTHH:mm:ssZ", // Date format used in the frontmatter.
  dateFormat: "MMMM Do, YYYY", // Date format for display.
  postTagged: "",
  postInCategories: "",
  postOnDate: "Posted on",
  // Use for comment
  lazyLoadComments: true,
  disqusShortname: "doltblog", // Disqus shortname.
  btnLoadComments: "Disqus comments",
  // Use for home page
  numberLoadmore: 6,
  btnLoadmore: "Load more",
  homeHasLoadmore: true,
  homeHasThumbnail: true,
  homeHeader: "Home",
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  pageNotFoundTitle: "Page Not Found", //
  pageNotFoundBtn: "Back to our site",
  pageNotFoundContent:
    "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.",
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHeader: "Posts tagged as", // use in header of tag-template page
  tagHasThumbnail: true,
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHeader: "Posts in category", // use in header of category-template page
  categoryHasThumbnail: true,
  // Use for widget
  categoryWidgetTitle: "Categories",
  tagWidgetTitle: "Tags",
  latestPostsWidgetTitle: "Latest posts",
  linksWidgetTitle: "Links",
  // Use for Google custom search
  searchWidgetTitle: "Search",
  searchWidgetPlaceHolder: "Enter keyword",
  searchEngineID: "partner-pub-1932696824172910:bvnk1ezmb1a",
  hasSearch: true,
  // Use for links widget
  sidebarSticky: true,
  sidebarLinks: [
    {
      label: "My CV",
      url: "https://cv.letrungdo.com",
    },
    {
      label: "My App",
      url: "https://app.letrungdo.com",
    },
    {
      label: "My Blog",
      url: "https://xn--t-lia.vn",
    },
  ],
  // Use for user info
  userName: "letrungdo", // Username to display in the author segment.
  userEmail: "letrdo@gmail.com", // Email used for RSS feed"s author segment
  userTwitter: "letrungdo", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Ho Chi Minh City, Vietnam", // User location to display in the author segment.
  userAvatar:
    "https://gravatar.com/avatar/cc508a89f5901e9f8e39a6ffee6f7319?size=300", // User avatar to display in the author segment.
  userDescription: "Software Engineer, Xamarin Forms, React Developer", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Email",
      url: "mailto:letrdo@gmail.com",
      iconClassName: "far envelope",
    },
    {
      label: "Website",
      url: "https://xn--t-lia.vn",
      iconClassName: "fas globe",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/letrungdo",
      iconClassName: "fab twitter",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/DoRenew",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/letrungdo",
      iconClassName: "fab linkedin-in",
    },
  ],
  // Use for navigation
  navTitle: "TĐ.VN",
  navLinks: [
    { label: "CV", url: "https://cv.letrungdo.com" },
    { label: "App", url: "https://app.letrungdo.com" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ],
  // Use for footer
  socialLinks: [
    {
      label: "GitHub",
      url: "https://github.com/letrungdo",
      iconClassName: "fab github",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/DoRenew",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/letrungdo",
      iconClassName: "fab linkedin-in",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/letrungdo",
      iconClassName: "fab twitter",
    },
    {
      label: "RSS",
      url: "https://xn--t-lia.vn/rss.xml",
      iconClassName: "fas rss",
    },
  ],
  footerLinks: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Terms of Use", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Sitemap", url: "https://xn--t-lia.vn/sitemap/sitemap-index.xml" },
  ],
  copyright:
    "Copyright © 2022 Le Trung Do. Unless otherwise noted, all code MIT license.",
  // Use for manifest
  themeColor: "#4f4f4f", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/" || config.pathPrefix === "") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
