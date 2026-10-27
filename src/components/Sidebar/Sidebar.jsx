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
  noAds = false,
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

      {!noAds && (
        <WidgetContainer extraClass="categories-container">
          <GoogleAds adSlot={config.adSlots.sidebar} />
        </WidgetContainer>
      )}

      {tagList && <WidgetTag tagList={tagList} />}

      <div className="position-sticky top-zero">
        {links && <WidgetLinks links={links} />}
      </div>
    </aside>
  );
}

export default Sidebar;
