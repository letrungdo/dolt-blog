import React from "react";
import NenkinToolPage, { NenkinToolHead } from "../components/NenkinTool/NenkinToolPage";

function NenkinToolTemplate({ pageContext, location }) {
  return <NenkinToolPage pageContext={pageContext} location={location} />;
}

export default NenkinToolTemplate;

export function Head({ pageContext, location }) {
  return <NenkinToolHead lang={pageContext.lang} translations={pageContext.translations} location={location} />;
}
