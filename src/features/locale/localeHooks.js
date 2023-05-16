import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { localeSlice, selectLocale } from './localeSlice';
import { currencySymbols } from './currencies';
import { languages } from './languages';

/** @typedef {import('./languages').LanguageCode} LanguageCode */
/** @typedef {import('./languages').LanguageKey} LanguageKey */
/** @typedef {import('./currencies').Currency} Currency */

export const useLocale = () => {

    const dispatch = useAppDispatch();
    const locale = useAppSelector(selectLocale);

    /** @param {Currency} currency */
    const setCurrency = (currency) =>
        dispatch(localeSlice.actions.currencyModified(currency));


    /** @param {LanguageCode} language */
    const setLanguage = (language) =>
        dispatch(localeSlice.actions.languageModified(language));

    /** @param {LanguageKey} key */
    const getString = (key, language = locale.language) => languages[language][key];

    return ({
        currencySymbol: currencySymbols[locale.currency],
        currency: locale.currency,
        setCurrency,
        setLanguage,
        getString,
    });
};
