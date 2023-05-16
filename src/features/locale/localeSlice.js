import { createSlice } from '@reduxjs/toolkit';

/** @typedef {import('./languages').LanguageCode} LanguageCode */
/** @typedef {import('../../app/store').RootState} RootState */
/** @typedef {import('./currencies').Currency} Currency */

/**
 * @template T
 * @typedef {import('@reduxjs/toolkit').PayloadAction<T>} PayloadAction
 */

/**
 * @typedef {Object} LocaleState
 * @property {Currency} currency
 * @property {LanguageCode} language
 */

/** @type {LocaleState} */
const initialState = {
    language: 'en_US',
    currency: 'USD',
};

export const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        /** @param {PayloadAction<Currency>} action */
        currencyModified: (state, action) => {
            state.currency = action.payload;
        },

        /** @param {PayloadAction<LanguageCode>} action */
        languageModified: (state, action) => {
            state.language = action.payload;
        }
    }
});

/** @param {RootState} state */
export const selectLocale = state => state.locale;

export const localeReducer = localeSlice.reducer;
