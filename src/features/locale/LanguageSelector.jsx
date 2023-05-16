import { useLocale } from './localeHooks';
import { languages } from './languages';
import React from 'react';

/** @typedef {import('./languages').LanguageCode} LanguageCode */

export function CurrencySelector() {

    const locale = useLocale();

    return (
        <select onChange={e => locale.setLanguage(/** @type {LanguageCode} */(e.target.value))}>
            {(/** @type {LanguageCode[]} */(Object.keys(languages))).map(key => (
                <option value={key}>[{key}] {locale.getString(key, key)}</option>
            ))}
        </select>
    );
}
