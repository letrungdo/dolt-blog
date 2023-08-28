import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import brand from "../../content/images/brand.webp";
import "../../content/styles/customize.scss";
import siteConfig from "../../data/SiteConfig";
import Footer from "../components/Footer/Footer";
import "../components/Icons/FontAwesome";
import Navigation from "../components/Navigation/Navigation";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import "../styles/main.min.css";

// Modal.setAppElement("#___gatsby");
const adBlockStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function MainLayout({ children, hasFooter = true }) {
  const [hasAd, setHasAd] = useState(false);

  useEffect(() => {
    window.onmessage = (event) => {
      if (typeof event.data.hasAd !== "undefined") {
        setHasAd(event.data.hasAd);
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, []);

  return (
    <div>
      <Navigation
        brand={brand}
        title={siteConfig.navTitle}
        links={siteConfig.navLinks}
      />
      {hasAd && (
        <Modal isOpen style={adBlockStyles} contentLabel="Ad block notice">
          <div>Please turn off AdBlock</div>
        </Modal>
      )}
      {children}
      {hasFooter && (
        <Footer
          socials={siteConfig.socialLinks}
          links={siteConfig.footerLinks}
          copyright={siteConfig.copyright}
        />
      )}
      <ScrollToTop color="#FFF" bgColor="grey-half" />
    </div>
  );
}
export default MainLayout;
