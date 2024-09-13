import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            'lang': 'en'
        }
    },
    th: {
        translation: {
            'lang': 'th'
        }
    }
} as const

i18n.use(initReactI18next).init({
    resources,
    lng: 'en'
})

export default i18n