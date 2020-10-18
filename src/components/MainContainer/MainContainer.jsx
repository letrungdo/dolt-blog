import React from "react";
import "./MainContainer.scss";

const MainContainer = ({ content, sidebar, children }) => (
  <section className="main-container container">
    <div className="content-wrapper padding-top-half padding-bottom-2">
      {content || children}
    </div>
    <div className="sidebar-wrapper padding-top-half padding-bottom-2">
      {sidebar}
    </div>
  </section>
);

export default MainContainer;
