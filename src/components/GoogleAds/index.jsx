import React from "react";
import siteConfig from "../../../data/SiteConfig";

export default class GoogleAds extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    const { adFormat, adSlot } = this.props;
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    );
  }
}
