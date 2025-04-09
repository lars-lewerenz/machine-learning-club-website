import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../public/locales/en.json';
import deTranslation from '../public/locales/de.json';

// Initialize i18n
i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Pass i18n down to react-i18next
    .init({
        resources: {
            en: { translation: enTranslation },
            de: { translation: deTranslation },
        },
        lng: 'en',
        fallbackLng: 'en', // Use English if detected language is not available
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['localStorage', 'navigator'], // Check localStorage first, then navigator
            lookupLocalStorage: 'i18nextLng', // Key in localStorage to store language
            caches: ['localStorage'], // Store language in localStorage
        },
    });

export default i18n;
