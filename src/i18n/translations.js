const { DEFAULT_LANGUAGE } = require("./config");

const translations = {
  vi: {
    // Navigation & Footer
    navHome: "Trang chủ",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    navTerms: "Điều khoản",
    navPrivacy: "Bảo mật",
    navSitemap: "Sitemap",
    navCv: "CV",
    navApp: "Ứng dụng",

    // Titles & Headers
    homeHeader: "Trang chủ",
    categoriesWidgetTitle: "Chuyên mục",
    tagsWidgetTitle: "Thẻ",
    latestPostsWidgetTitle: "Bài viết mới nhất",
    linksWidgetTitle: "Liên kết",
    searchWidgetTitle: "Tìm kiếm",
    searchWidgetPlaceholder: "Nhập từ khóa...",
    tagHeader: "Bài viết với thẻ",
    categoryHeader: "Bài viết trong chuyên mục",

    // Post details & buttons
    postedOn: "Đăng ngày",
    readTime: "phút đọc",
    btnLoadmore: "Tải thêm",
    noMorePosts: "Đã hiển thị tất cả bài viết",
    btnLoadComments: "Bình luận Disqus",
    prevPost: "Bài trước",
    nextPost: "Bài sau",

    // 404
    pageNotFoundTitle: "Không tìm thấy trang",
    pageNotFoundBtn: "Trở về trang chủ",
    pageNotFoundContent:
      "Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.",

    // Footer
    copyright: "Copyright © 2025 Lê Trung Đô. Giữ toàn bộ quyền.",

    // Language switcher
    switchLanguage: "Ngôn ngữ",
  },
  en: {
    // Navigation & Footer
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    navTerms: "Terms",
    navPrivacy: "Privacy",
    navSitemap: "Sitemap",
    navCv: "CV",
    navApp: "App",

    // Titles & Headers
    homeHeader: "Home",
    categoriesWidgetTitle: "Categories",
    tagsWidgetTitle: "Tags",
    latestPostsWidgetTitle: "Latest Posts",
    linksWidgetTitle: "Links",
    searchWidgetTitle: "Search",
    searchWidgetPlaceholder: "Enter keyword...",
    tagHeader: "Posts tagged as",
    categoryHeader: "Posts in category",

    // Post details & buttons
    postedOn: "Posted on",
    readTime: "min read",
    btnLoadmore: "Load more",
    noMorePosts: "No more posts",
    btnLoadComments: "Disqus comments",
    prevPost: "Previous Post",
    nextPost: "Next Post",

    // 404
    pageNotFoundTitle: "Page Not Found",
    pageNotFoundBtn: "Back to home",
    pageNotFoundContent:
      "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.",

    // Footer
    copyright: "Copyright © 2025 Le Trung Do. All rights reserved.",

    // Language switcher
    switchLanguage: "Language",
  },
};

function t(key, lang = DEFAULT_LANGUAGE) {
  if (translations[lang] && translations[lang][key] !== undefined) {
    return translations[lang][key];
  }
  if (translations[DEFAULT_LANGUAGE] && translations[DEFAULT_LANGUAGE][key] !== undefined) {
    return translations[DEFAULT_LANGUAGE][key];
  }
  return key;
}

module.exports = {
  translations,
  t,
};
