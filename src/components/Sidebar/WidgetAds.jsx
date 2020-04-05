import React from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { themeColors } from "../../styles/themeColors";

const WidgetAds = () => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title="Google Ads" color={themeColors[9]} />
    <div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 300 }}
        data-ad-client="ca-pub-1932696824172910"
        data-ad-slot="8582663769"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push(
        {}
        );
      </script>
    </div>
  </WidgetContainer>
);
export default WidgetAds;
