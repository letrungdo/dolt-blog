const DEFAULT_LANGUAGE = "vi";

const LANGUAGES = {
  vi: {
    code: "vi",
    name: "Tiếng Việt",
    shortName: "VI",
    flag: "🇻🇳",
    pathPrefix: "",
    locale: "vi_VN",
    siteTitle: "TĐ.VN",
    siteDescription:
      "Blog học lập trình Flutter, ReactJs, Xamarin Forms. Chia sẻ tài liệu học tập.",
  },
  en: {
    code: "en",
    name: "English",
    shortName: "EN",
    flag: "🇬🇧",
    pathPrefix: "en",
    locale: "en_US",
    siteTitle: "TĐ.VN - Dev Blog",
    siteDescription:
      "Software engineering blog covering Flutter, ReactJS, Mobile & Web development.",
  },
};

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

function getLanguage(code) {
  return LANGUAGES[code] || LANGUAGES[DEFAULT_LANGUAGE];
}

function getLangFromPath(pathname = "") {
  if (!pathname) return DEFAULT_LANGUAGE;
  const cleanPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const segments = cleanPath.split("/");
  const firstSegment = segments[0];

  if (firstSegment && LANGUAGES[firstSegment] && LANGUAGES[firstSegment].pathPrefix) {
    return firstSegment;
  }
  return DEFAULT_LANGUAGE;
}

function getLocalizedPath(path = "/", lang = DEFAULT_LANGUAGE) {
  if (!path) path = "/";
  const langConfig = getLanguage(lang);

  let cleanPath = path;
  SUPPORTED_LANGUAGES.forEach((l) => {
    const prefix = LANGUAGES[l].pathPrefix;
    if (prefix) {
      if (cleanPath === `/${prefix}` || cleanPath === `/${prefix}/`) {
        cleanPath = "/";
      } else if (cleanPath.startsWith(`/${prefix}/`)) {
        cleanPath = cleanPath.replace(`/${prefix}`, "");
      }
    }
  });

  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  if (langConfig.pathPrefix) {
    return cleanPath === "/"
      ? `/${langConfig.pathPrefix}/`
      : `/${langConfig.pathPrefix}${cleanPath}`;
  }

  return cleanPath;
}

module.exports = {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  SUPPORTED_LANGUAGES,
  getLanguage,
  getLangFromPath,
  getLocalizedPath,
};
