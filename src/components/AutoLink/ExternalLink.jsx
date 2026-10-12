import React from "react";

function ExternalLink({ className, to, children, style, onClick, ...rest }) {
  return (
    <a
      className={className}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...style }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
