/** @typedef {keyof typeof en_US} LanguageKey */
/** @typedef {{ [key in LanguageKey]: string }} Language */
/** @typedef {keyof typeof languages} LanguageCode */

const en_US = {
    addProductToCart: 'Add to Cart',
    productOutOfStock: 'Out of Stock',
    en_US: 'English',
    es_MX: 'Spanish',
};

/**
 * @param {Partial<Language>} language 
 * @returns {Language}
 */
const patchLanguage = (language) => {
    // @ts-ignore
    return Object.keys(en_US)
        .map(key => ({ [key]: language[key] ?? 'LOCALE_MISSING' }))
        .reduce((x, y) => ({ ...x, ...y }), {});
};

const es_MX = patchLanguage({
    addProductToCart: 'Añadir al Carrito',
    productOutOfStock: 'Indisponible',
    en_US: 'Inglés',
    es_MX: 'Español',
});

export const languages = {
    en_US,
    es_MX,
};
