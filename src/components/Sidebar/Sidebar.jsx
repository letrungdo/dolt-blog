import React from "react";
import config from "../../../data/SiteConfig";
import GoogleAds from "../GoogleAds";
import WidgetCategory from "./WidgetCategory";
import WidgetContainer from "./WidgetContainer";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import WidgetSearch from "./WidgetSearch";
import WidgetTag from "./WidgetTag";

function Sidebar({
  tagList,
  categoryList,
  latestPostEdges,
  links,
  postInCategory,
}) {
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

      <WidgetContainer extraClass="categories-container">
        <GoogleAds adFormat="auto" adSlot="8582663769" />
      </WidgetContainer>

      {tagList && <WidgetTag tagList={tagList} />}

      <div className="position-sticky top-zero">
        {links && <WidgetLinks links={links} />}
      </div>
    </aside>
  );
}

export default Sidebar;
