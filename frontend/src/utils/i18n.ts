import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SqTranslation } from "./SqTranslation";
import { EnTranslation } from "./EnTranslation";
import { getFromLocalStorage } from "./utils";

const resources = {
	en: {
		translation: EnTranslation,
	},
	sq: {
		translation: SqTranslation,
	},
};

const lang = getFromLocalStorage("language");

i18n.use(initReactI18next).init({
	resources,
	lng: lang || "en",

	keySeparator: false,

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
