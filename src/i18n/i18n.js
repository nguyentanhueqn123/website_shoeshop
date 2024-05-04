import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "../locales/en/home.json";
import LOGIN_EN from "../locales/en/login.json";
import PRODUCT_EN from "../locales/en/product.json";


import HOME_VI from "../locales/vi/home.json";
import LOGIN_VI from "../locales/vi/login.json";
import PRODUCT_VI from "../locales/vi/product.json";



export const locales = {
  en: "English",
  vi: "Tiếng Việt"
}


const resources = {
  en: {
    home: HOME_EN,
    login: LOGIN_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    login: LOGIN_VI,
    product: PRODUCT_VI

  }
};
const defaultNS = "home";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns: ["home", "login"], 
    defaultNS,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;