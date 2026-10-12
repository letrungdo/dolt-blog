import { Link } from "gatsby";
import React from "react";
import { isInteralLink } from "../../utils/helpers";
import ExternalLink from "./ExternalLink";

function AutoLink({
  to,
  label,
  activeClassName,
  className,
  style,
  onClick,
  children,
  ...rest
}) {
  return isInteralLink(to) ? (
    <Link
      key={label}
      to={to}
      activeClassName={activeClassName}
      className={className}
      style={{ ...style }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <ExternalLink
      className={className}
      to={to}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ExternalLink>
  );
}

export default AutoLink;
