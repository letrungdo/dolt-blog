import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import WidgetSearch from "./WidgetSearch";
import config from "../../../data/SiteConfig";
import GoogleAds from "../GoogleAds";
import WidgetContainer from "./WidgetContainer";

const Sidebar = ({
  tagList,
  categoryList,
  latestPostEdges,
  links,
  postInCategory,
}) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      <WidgetSearch />

      {categoryList && (
        <WidgetCategory
          categoryList={categoryList}
          postInCategory={postInCategory}
        />
      )}

      {latestPostEdges && (
        <WidgetLatestPosts latestPostEdges={latestPostEdges} />
      )}

      {tagList && <WidgetTag tagList={tagList} />}

      <WidgetContainer extraClass="categories-container">
        <GoogleAds adFormat="auto" adSlot="8582663769" />
      </WidgetContainer>

      <div className="position-sticky top-zero">
        {links && <WidgetLinks links={links} />}
      </div>
    </aside>
  );
};

export default Sidebar;
