import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init();

i18n.use(initReactI18next).init({
  fallbackLng: 'fi',

  // eslint-disable-next-line no-undef
  lng: localStorage.getItem('i18nextLng') || 'fi',
  resources: {
    fi: {
      // eslint-disable-next-line global-require
      translations: require('./locales/fi/translations.json'),
    },
    en: {
      // eslint-disable-next-line global-require
      translations: require('./locales/en/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['fi', 'en'];

export default i18n;
