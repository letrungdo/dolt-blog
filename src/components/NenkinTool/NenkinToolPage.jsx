import React from "react";
import config from "../../../data/SiteConfig";
import AutoLink from "../AutoLink/AutoLink";
import GoogleAds from "../GoogleAds";
import Header from "../Header/Header";
import MainContainer from "../MainContainer/MainContainer";
import Sidebar from "../Sidebar/Sidebar";
import SEO from "../SEO/SEO";
import Layout from "../../layout";
import { DEFAULT_LANGUAGE, LANGUAGES, getLocalizedPath } from "../../i18n/config";
import NenkinTool from "./NenkinTool";

export const TOOL_PATH = "/cong-cu-dien-don-nenkin-lan-2/";
const GUIDE_PATH = "/huong-dan-tu-lam-nenkin-lan-2/";
const LAN1_PATH = "/huong-dan-tu-lam-nenkin-lan-1/";

const TEXT = {
  vi: {
    title: "Công cụ điền đơn nenkin lần 2 (hoàn thuế 20.42%)",
    description:
      "Nhập thông tin để tự điền mẫu 納税管理人届出書 và 確定申告書 (令和7年分以降用) cho nenkin lần 2, tính trước số tiền được hoàn và tải PDF. Chạy hoàn toàn trên trình duyệt.",
    intro: "Nhập thông tin bên dưới, công cụ sẽ tính số tiền được hoàn và điền sẵn 2 mẫu đơn của 国税庁 thành 1 file PDF (4 trang A4).",
    guide: "Xem hướng dẫn chi tiết từng ô",
    lan1: "Chưa nhận nenkin lần 1?",
    lan1Link: "Xem hướng dẫn tự làm nenkin lần 1",
  },
  en: {
    title: "Japan Pension Lump-Sum Tax Refund Form Filler (20.42%)",
    description:
      "Enter your details to fill in the 納税管理人届出書 and the 確定申告書 (令和7年分以降用) for the pension lump-sum tax refund, estimate your refund and download a PDF. Runs entirely in your browser.",
    intro: "Enter your details below. The tool estimates your refund and fills in both National Tax Agency forms as one PDF (4 A4 pages).",
    guide: "Read the field-by-field guide",
    lan1: "Haven't received the lump-sum payment yet?",
    lan1Link: "Read the lump-sum withdrawal claim guide",
  },
};

function NenkinToolPage({ pageContext, location }) {
  const { lang = DEFAULT_LANGUAGE, translations = {}, tagList, categoryList, latestPostEdges } = pageContext;
  const tx = TEXT[lang];
  const sidebar = (
    <Sidebar tagList={tagList} categoryList={categoryList} latestPostEdges={latestPostEdges} links={config.sidebarLinks} />
  );
  const content = (
    <>
      <p>
        {tx.intro} <AutoLink to={getLocalizedPath(GUIDE_PATH, lang)}>{tx.guide}</AutoLink>.
      </p>
      <p>
        {tx.lan1} <AutoLink to={getLocalizedPath(LAN1_PATH, lang)}>{tx.lan1Link}</AutoLink>.
      </p>
      <GoogleAds adSlot={config.adSlots.postTop} extraClass="padding-bottom" />
      <NenkinTool lang={lang} />
      {/* Kept well below the download buttons so the ad is not clicked by mistake (AdSense policy). */}
      <GoogleAds adSlot={config.adSlots.postBottom} extraClass="padding-top-3" />
    </>
  );
  return (
    <Layout lang={lang} translations={translations} pathname={location?.pathname || getLocalizedPath(TOOL_PATH, lang)}>
      <Header title={tx.title} />
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
}

export function NenkinToolHead({ lang = DEFAULT_LANGUAGE, translations = {}, location }) {
  const tx = TEXT[lang];
  const langConfig = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANGUAGE];
  const siteTitle = langConfig.siteTitle || config.siteTitle;
  return (
    <SEO lang={lang} translations={translations} postPath={location?.pathname || getLocalizedPath(TOOL_PATH, lang)}>
      <title>{`${tx.title} - ${siteTitle}`}</title>
      <meta name="description" content={tx.description} />
    </SEO>
  );
}

export default NenkinToolPage;
