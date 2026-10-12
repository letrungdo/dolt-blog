import dayjs from "dayjs";
import slug from "slug";
import config from "../../data/SiteConfig";
import { getLocalizedPath } from "../i18n/config";

export const slugify = (text) => slug(text || "").toLowerCase();
export const isInteralLink = (link) => link && link[0] === "/";
export const formatDate = (date) => dayjs(date).format(config.dateFormat);

export const getTagPath = (tag, lang = "vi") =>
  getLocalizedPath(`${config.pathPrefixTag}/${slugify(tag)}`, lang);

export const getCategoryPath = (category, lang = "vi") =>
  getLocalizedPath(`${config.pathPrefixCategory}/${slugify(category)}`, lang);

export const getPostList = (postEdges) =>
  postEdges.map((postEdge) => ({
    path: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags,
    categories: postEdge.node.frontmatter.categories,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.fields.date,
    slug: postEdge.node.fields.slug,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    lang: postEdge.node.fields.lang,
  }));

export const getTagCategoryList = (postList) => {
  const tagSet = new Set();
  const categorySet = new Set();

  postList.forEach(({ categories, tags }) => {
    if (categories) {
      categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    if (tags) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });

  return {
    tagList: Array.from(tagSet),
    categoryList: Array.from(categorySet),
  };
};

export const getPostInCategory = (postList, categoryList) => {
  const postInCategory = {};
  categoryList.forEach((category) => {
    let s = 0;
    postList.forEach((i) => {
      if (i.categories?.includes(category)) {
        s += 1;
      }
    });
    postInCategory[category] = s;
  });
  return postInCategory;
};
