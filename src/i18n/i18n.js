import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import GENERAL_EN from "../locales/en/general.json";
import HOME_EN from "../locales/en/home.json";
import LOGIN_EN from "../locales/en/login.json";
import PRODUCT_EN from "../locales/en/product.json";
import CART_EN from "../locales/en/cart.json";
import BUY_EN from "../locales/en/buy.json";
import ORDER_EN from "../locales/en/order.json";



import GENERAL_VI from "../locales/vi/general.json";
import HOME_VI from "../locales/vi/home.json";
import LOGIN_VI from "../locales/vi/login.json";
import PRODUCT_VI from "../locales/vi/product.json";
import CART_VI from "../locales/vi/cart.json";
import BUY_VI from "../locales/vi/buy.json";
import ORDER_VI from "../locales/vi/order.json";






export const locales = {
  en: "English",
  vi: "Tiếng Việt"
}


const resources = {
  en: {
    general: GENERAL_EN,
    home: HOME_EN,
    login: LOGIN_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    buy: BUY_EN,
    order: ORDER_EN
  },
  vi: {
    general: GENERAL_VI,
    home: HOME_VI,
    login: LOGIN_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    buy: BUY_VI,
    order: ORDER_VI


  }
};
const defaultNS = "home";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns: ["home", "login", "general", "product", "cart", "buy", "order"], 
    defaultNS,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;