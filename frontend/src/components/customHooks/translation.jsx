//import React, { useState, useContext } from "react";
import LocalizedStrings from "react-localization";
import localization from "../localization";
import { useLanguageContext } from "../../context/LanguageContext";

export default function useLocalization() {
  const { language } = useLanguageContext();
  let translation = new LocalizedStrings(localization);

  translation.setLanguage(language);
  return translation;
}