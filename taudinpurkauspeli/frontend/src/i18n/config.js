import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'fi',
  lng: 'fi',
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
