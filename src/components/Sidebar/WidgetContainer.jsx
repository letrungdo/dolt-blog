import React from "react";

function WidgetContainer({ extraClass = "", children }) {
  return <aside className={`${extraClass} padding-top padding-bottom`}>
    {children}
  </aside>
}

export default WidgetContainer;
