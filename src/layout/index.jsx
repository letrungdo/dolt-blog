import React from "react";
import Helmet from "react-helmet";
import Modal from "react-modal";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import siteConfig from "../../data/SiteConfig";
import brand from "../../content/images/brand.webp";
import "../components/Icons/FontAwesome";
import "../styles/main.min.css";
import "../../content/styles/customize.scss";
import AdblockDetect from "../utils/AdblockDetect";

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

const MainLayout = ({ children, hasFooter = true }) => (
  <div>
    <Helmet htmlAttributes={{ lang: siteConfig.siteLang }}>
      <meta name="description" content={siteConfig.siteDescription} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <script
        data-ad-client={siteConfig.adsClientId}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </Helmet>
    <Navigation
      brand={brand}
      title={siteConfig.navTitle}
      links={siteConfig.navLinks}
    />
    <AdblockDetect>
      <Modal isOpen style={adBlockStyles} contentLabel="Example Modal">
        <div>Please turn off AdBlock</div>
      </Modal>
    </AdblockDetect>
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
export default MainLayout;
