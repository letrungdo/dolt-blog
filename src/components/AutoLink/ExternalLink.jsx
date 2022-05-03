import React from "react";

function ExternalLink({ className, to, children, style }) {
  return <a
    className={className}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    style={{ ...style }}
  >
    {children}
  </a>
}

export default ExternalLink;
