const path = require("path");
const dayjs = require("dayjs");
const siteConfig = require("./data/SiteConfig");
const Logger = require("./src/utils/logs");
const { DEFAULT_LANGUAGE, getLocalizedPath } = require("./src/i18n/config");

const VIETNAMESE_CHARS =
  /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const { default: slug } = await import("slug");
  const slugify = (text) => slug(text || "").toLowerCase();

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    const isPage = node.frontmatter && node.frontmatter.template === "page";

    // 1. Determine lang
    let lang;
    if (node.frontmatter && node.frontmatter.lang) {
      lang = node.frontmatter.lang;
    } else if (fileNode.relativePath.endsWith(".en.md")) {
      lang = "en";
    } else if (fileNode.relativePath.endsWith(".vi.md")) {
      lang = "vi";
    } else if (isPage) {
      lang = DEFAULT_LANGUAGE;
    } else {
      const title = node.frontmatter ? node.frontmatter.title : "";
      lang = VIETNAMESE_CHARS.test(title) ? "vi" : "en";
    }

    // 2. Determine translation key
    let translationKey;
    if (node.frontmatter && node.frontmatter.translationKey) {
      translationKey = node.frontmatter.translationKey;
    } else if (node.frontmatter && node.frontmatter.slug) {
      translationKey = slugify(node.frontmatter.slug);
    } else if (node.frontmatter && node.frontmatter.title) {
      translationKey = slugify(node.frontmatter.title);
    } else {
      translationKey = parsedFilePath.name.replace(/\.(en|vi)$/, "");
    }

    // 3. Determine base slug
    let rawSlug;
    if (node.frontmatter && node.frontmatter.slug) {
      rawSlug = slugify(node.frontmatter.slug);
    } else if (node.frontmatter && node.frontmatter.title) {
      rawSlug = slugify(node.frontmatter.title);
    } else {
      rawSlug = parsedFilePath.name.replace(/\.(en|vi)$/, "");
    }

    let slugValue = getLocalizedPath(`/${rawSlug}/`, lang);

    if (node.frontmatter && node.frontmatter.date) {
      const date = dayjs(node.frontmatter.date, siteConfig.dateFromFormat);
      if (!date.isValid()) {
        Logger.warn(`WARNING: Invalid date.`, node.frontmatter);
      }

      createNodeField({
        node,
        name: "date",
        value: date.toISOString(),
      });
    }

    createNodeField({ node, name: "slug", value: slugValue });
    createNodeField({ node, name: "lang", value: lang });
    createNodeField({ node, name: "translationKey", value: translationKey });
    // Posts flagged noAds render without AdSense and are noindexed (policy-risky content)
    createNodeField({
      node,
      name: "noAds",
      value: Boolean(node.frontmatter && node.frontmatter.noAds),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPageTemplate = path.resolve("src/templates/post-template.jsx");
  const pagePageTemplate = path.resolve("src/templates/page-template.jsx");
  const tagPageTemplate = path.resolve("src/templates/tag-template.jsx");
  const categoryPageTemplate = path.resolve(
    "src/templates/category-template.jsx"
  );
  const indexPageTemplate = path.resolve("src/pages/index.jsx");

  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
              lang
              translationKey
            }
            frontmatter {
              template
              title
              tags
              categories
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    Logger.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const edges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Build translation mapping per translationKey
  const translationMap = {};
  edges.forEach(({ node }) => {
    const key = node.fields.translationKey;
    const lang = node.fields.lang;
    if (!translationMap[key]) {
      translationMap[key] = {};
    }
    translationMap[key][lang] = node.fields.slug;
  });

  const { SUPPORTED_LANGUAGES } = require("./src/i18n/config");
  const {
    postsPerPage,
    pathPrefixPagination,
    pathPrefixTag,
    pathPrefixCategory,
    numberLatestPost,
  } = siteConfig;
  const { default: slug } = await import("slug");
  const slugify = (text) => slug(text || "").toLowerCase();

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const langEdges = edges.filter((edge) => edge.node.fields.lang === lang);

    const postEdges = langEdges.filter(
      (edge) => edge.node.frontmatter.template === "post"
    );
    const pageEdges = langEdges.filter(
      (edge) => edge.node.frontmatter.template === "page"
    );

    const tagSet = new Set();
    const categorySet = new Set();

    postEdges.forEach((edge) => {
      if (edge.node.frontmatter.tags) {
        edge.node.frontmatter.tags.forEach((tag) => tagSet.add(tag));
      }
      if (edge.node.frontmatter.categories) {
        edge.node.frontmatter.categories.forEach((cat) =>
          categorySet.add(cat)
        );
      }
    });

    const tagList = Array.from(tagSet);
    const categoryList = Array.from(categorySet);

    const latestPostEdges = postEdges.slice(0, numberLatestPost);

    // Create Home Page for non-default languages (e.g. /en/)
    if (lang !== DEFAULT_LANGUAGE) {
      createPage({
        path: `/${lang}/`,
        component: indexPageTemplate,
        context: {
          lang,
          tagList,
          categoryList,
          latestPostEdges,
        },
      });
    }

    // Create Post pages
    postEdges.forEach((edge, index) => {
      const nextID = index + 1 < postEdges.length ? index + 1 : 0;
      const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
      const nextEdge = postEdges[nextID];
      const prevEdge = postEdges[prevID];

      const translations =
        translationMap[edge.node.fields.translationKey] || {};

      createPage({
        path: edge.node.fields.slug,
        component: postPageTemplate,
        context: {
          slug: edge.node.fields.slug,
          lang,
          translations,
          nexttitle: nextEdge ? nextEdge.node.frontmatter.title : "",
          nextslug: nextEdge ? nextEdge.node.fields.slug : "",
          prevtitle: prevEdge ? prevEdge.node.frontmatter.title : "",
          prevslug: prevEdge ? prevEdge.node.fields.slug : "",
          tagList,
          categoryList,
          latestPostEdges,
        },
      });
    });

    // Create Page pages (static pages like about, contact, terms, privacy)
    pageEdges.forEach((edge) => {
      const translations =
        translationMap[edge.node.fields.translationKey] || {};
      createPage({
        path: edge.node.fields.slug,
        component: pagePageTemplate,
        context: {
          slug: edge.node.fields.slug,
          lang,
          translations,
          tagList,
          categoryList,
          latestPostEdges,
        },
      });
    });

    // Create Tag pages
    tagList.forEach((tag) => {
      const tagPosts = postEdges.filter(
        (edge) =>
          edge.node.frontmatter.tags && edge.node.frontmatter.tags.includes(tag)
      );
      const numTagPages = Math.ceil(tagPosts.length / postsPerPage) || 1;
      const baseTagPath =
        lang === DEFAULT_LANGUAGE
          ? `${pathPrefixTag}/${slugify(tag)}`
          : `/${lang}${pathPrefixTag}/${slugify(tag)}`;

      for (let i = 0; i < numTagPages; i++) {
        createPage({
          path:
            i === 0
              ? baseTagPath
              : `${baseTagPath}${pathPrefixPagination}/${i + 1}`,
          component: tagPageTemplate,
          context: {
            tag,
            lang,
            tagList,
            categoryList,
            latestPostEdges,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            totalPages: numTagPages,
          },
        });
      }
    });

    // Create Category pages
    categoryList.forEach((category) => {
      const categoryPosts = postEdges.filter(
        (edge) =>
          edge.node.frontmatter.categories &&
          edge.node.frontmatter.categories.includes(category)
      );
      const numCategoryPages =
        Math.ceil(categoryPosts.length / postsPerPage) || 1;
      const baseCategoryPath =
        lang === DEFAULT_LANGUAGE
          ? `${pathPrefixCategory}/${slugify(category)}`
          : `/${lang}${pathPrefixCategory}/${slugify(category)}`;

      for (let i = 0; i < numCategoryPages; i++) {
        createPage({
          path:
            i === 0
              ? baseCategoryPath
              : `${baseCategoryPath}${pathPrefixPagination}/${i + 1}`,
          component: categoryPageTemplate,
          context: {
            category,
            lang,
            tagList,
            categoryList,
            latestPostEdges,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            totalPages: numCategoryPages,
          },
        });
      }
    });
  });
};
