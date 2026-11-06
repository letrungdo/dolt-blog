import React from "react";
import NenkinToolPage, { NenkinToolHead } from "../../components/NenkinTool/NenkinToolPage";

export default function Page({ location }) {
  return <NenkinToolPage lang="en" location={location} />;
}

export function Head({ location }) {
  return <NenkinToolHead lang="en" location={location} />;
}
