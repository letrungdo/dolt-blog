import { Link } from "gatsby";
import React from "react";
import { isInteralLink } from "../../utils/helpers";
import ExternalLink from "./ExternalLink";

function AutoLink(props) {
  return isInteralLink(props.to) ? (
    <Link
      key={props.label}
      to={props.to}
      activeClassName={props.activeClassName}
      className={props.className}
      style={{ ...props.style }}
    >
      {props.children}
    </Link>
  ) : (
    <ExternalLink className={props.className} to={props.to} style={props.style}>
      {props.children}
    </ExternalLink>
  );
}

export default AutoLink;
