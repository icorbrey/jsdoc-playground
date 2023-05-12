import React from 'react';

/**
 * @template T
 * @param {React.Context<T>} context 
 * @param {string} message 
 * @returns {NonNullable<T>}
 */
export const useSafeContext = (context, message) => {
    const value = React.useContext(context);
    if (!value) {
        throw new Error(message);
    }
    return value;
};
