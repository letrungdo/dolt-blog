import React, { createContext, useContext } from "react";
import { DEFAULT_LANGUAGE } from "./config";
import { t as translateKey } from "./translations";

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  t: (key) => translateKey(key, DEFAULT_LANGUAGE),
  translations: {},
});

export function LanguageProvider({
  lang = DEFAULT_LANGUAGE,
  translations = {},
  children,
}) {
  const t = (key) => translateKey(key, lang);
  return (
    <LanguageContext.Provider value={{ lang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
