const path = require("path");
const dayjs = require("dayjs");
const siteConfig = require("./data/SiteConfig");
const Logger = require("./src/utils/logs");



exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const { default: slug } = await import('slug');
  const slugify = (text) => slug(text).toLowerCase();

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    let slugValue;
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slugValue = `/${slugify(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slugValue = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slugValue = `/${parsedFilePath.name}/`;
    } else {
      slugValue = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slugValue = `/${slugify(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = dayjs(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid())
          Logger.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        });
      }
    }
    createNodeField({ node, name: "slug", value: slugValue });
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

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              fields {
                slug
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
    `
  );

  if (markdownQueryResult.errors) {
    Logger.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // Filter data
  const tagSet = new Set();
  const categorySet = new Set();
  const postEdges = [];
  const pageEdges = [];

  markdownQueryResult.data.allMarkdownRemark.edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    if (edge.node.frontmatter.template === "post") {
      postEdges.push(edge);
    }

    if (edge.node.frontmatter.template === "page") {
      pageEdges.push(edge);
    }
  });

  // Create tagList, categoryList
  const tagList = Array.from(tagSet);
  const categoryList = Array.from(categorySet);

  // Get latest posts
  const latestPostEdges = [];
  postEdges.forEach((edge) => {
    if (latestPostEdges.length < siteConfig.numberLatestPost) {
      latestPostEdges.push(edge);
    }
  });

  // Create post page
  postEdges.forEach((edge, index) => {
    const nextID = index + 1 < postEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
    const nextEdge = postEdges[nextID];
    const prevEdge = postEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPageTemplate,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
        tagList,
        categoryList,
        latestPostEdges,
      },
    });
  });

  // create page page
  pageEdges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: pagePageTemplate,
      context: {
        slug: edge.node.fields.slug,
        tagList,
        categoryList,
        latestPostEdges,
      },
    });
  });

  // common config for pagination
  const { postsPerPage } = siteConfig;
  const { pathPrefixPagination } = siteConfig;
  const { default: slug } = await import('slug');
  const slugify = (text) => slug(text).toLowerCase();

  // create tag page
  tagList.forEach((tag) => {
    const tagPosts = postEdges.filter((edge) => {
      const { tags } = edge.node.frontmatter;
      return tags && tags.includes(tag);
    });

    const numTagPages = Math.ceil(tagPosts.length / postsPerPage);
    const basePath = `${siteConfig.pathPrefixTag}/${slugify(tag)}`;

    for (let i = 0; i < numTagPages; i++) {
      createPage({
        path:
          i === 0
            ? `${basePath}`
            : `${basePath}${pathPrefixPagination}/${i + 1}`,
        component: tagPageTemplate,
        context: {
          tag,
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

  // create category page
  categoryList.forEach((category) => {
    const categoryPosts = postEdges.filter((edge) => {
      const { categories } = edge.node.frontmatter;
      return categories && categories.includes(category);
    });

    const numCategoryPages = Math.ceil(categoryPosts.length / postsPerPage);
    const basePath = `${siteConfig.pathPrefixCategory}/${slugify(category)}`;

    for (let i = 0; i < numCategoryPages; i++) {
      createPage({
        path:
          i === 0
            ? `${basePath}`
            : `${basePath}${pathPrefixPagination}/${i + 1}`,
        component: categoryPageTemplate,
        context: {
          category,
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
};
