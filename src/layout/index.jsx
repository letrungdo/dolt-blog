import React from "react";
import brand from "../../content/images/brand.webp";
import "../../content/styles/customize.scss";
import siteConfig from "../../data/SiteConfig";
import Footer from "../components/Footer/Footer";
import "../components/Icons/FontAwesome";
import Navigation from "../components/Navigation/Navigation";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import "../styles/main.min.css";

function MainLayout({ children, hasFooter = true }) {
  return (
    <div>
      <Navigation
        brand={brand}
        title={siteConfig.navTitle}
        links={siteConfig.navLinks}
      />
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
