import React, { useEffect } from "react";
import siteConfig from "../../../data/SiteConfig";

function GoogleAds({ adFormat = "auto", adSlot, adLayout, extraClass = "" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ad blocked or script not loaded yet; nothing to do.
    }
  }, [adSlot]);

  return (
    <div className={`google-ads ${extraClass}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: adLayout ? "center" : undefined }}
        data-ad-client={siteConfig.adsClientId}
        data-ad-slot={adSlot}
        data-ad-format={adLayout ? "fluid" : adFormat}
        data-ad-layout={adLayout || undefined}
        data-full-width-responsive={adLayout ? undefined : "true"}
      />
    </div>
  );
}

export default GoogleAds;
