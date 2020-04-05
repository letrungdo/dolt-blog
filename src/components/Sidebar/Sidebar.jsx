import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import WidgetSearch from "./WidgetSearch";
import config from "../../../data/SiteConfig";
import WidgetAds from "./WidgetAds";

const Sidebar = ({ tagList, categoryList, latestPostEdges, links }) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      <WidgetSearch />

      {categoryList && <WidgetCategory categoryList={categoryList} />}

      {latestPostEdges && (
        <WidgetLatestPosts latestPostEdges={latestPostEdges} />
      )}

      {tagList && <WidgetTag tagList={tagList} />}

      {links && <WidgetLinks links={links} />}

      {
        <div className="position-sticky top-zero">
          <WidgetAds links={links} />
        </div>
      }
    </aside>
  );
};

export default Sidebar;
