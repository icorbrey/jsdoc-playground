import { currencySymbols } from './currencies';
import { useLocale } from './localeHooks';
import React from 'react';

/** @typedef {import('./currencies').Currency} Currency */

export function CurrencySelector() {

    const locale = useLocale();

    return (
        <select onChange={e => locale.setCurrency(/** @type {Currency} */(e.target.value))}>
            {Object.keys(currencySymbols).map(key => (
                <option value={key}>{key} ({currencySymbols[key]})</option>
            ))}
        </select>
    );
}
