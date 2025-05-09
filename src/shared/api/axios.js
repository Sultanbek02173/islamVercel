import axios from "axios"
import i18n from "../../i18n/i18n"

const instance = axios.create({
    baseURL: `https://islamacademy.webtm.ru/${i18n.language}/api/v1/`
})
instance.interceptors.request.use((config) => {
    const lang = i18n.language;
    config.baseURL = `https://islamacademy.webtm.ru/${lang}/api/v1/`;
    return config;
});

i18n.on('languageChanged', (lang) => {
    instance.defaults.baseURL = `https://islamacademy.webtm.ru/${lang}/api/v1/`;
});

export default instance;