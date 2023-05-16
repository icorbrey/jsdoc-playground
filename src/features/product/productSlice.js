import { OptionMap } from '../../utilities/optionMap';
import { createSlice } from '@reduxjs/toolkit';

/**
 * @template T
 * @typedef {import('@reduxjs/toolkit').PayloadAction<T>} PayloadAction
 */

/** @typedef {import('../../app/store').RootState} RootState */

/**
 * @template T
 * @typedef {import('../../utilities/option').Option<T>} Option
 */

/**
 * @typedef {Object} Product A product to be sold.
 * @property {Guid} id The product's unique ID.
 * @property {string} title The product's title.
 * @property {string} category The product's category.
 * @property {number} rating The product's rating, in number of stars.
 * @property {number} price The product's price.
 * @property {{
*     src: string
*     alt: string
* }} image The product's image.
*/

/** @typedef {OptionMap<Guid, Product>} ProductsState */

/** @type {ProductsState} */
const initialState = new OptionMap();

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        /** @param {PayloadAction<Product>} action */
        created: (state, action) => {
            if (state.get(action.payload.id)) {
                return;
            }

            state.set(action.payload.id, action.payload);
        },

        /** @param {PayloadAction<Product>} action */
        updated: (state, action) => {
            state.set(action.payload.id, action.payload);
        },

        /** @param {PayloadAction<Guid>} action */
        removed: (state, action) => {
            state.delete(action.payload);
        },
    }
});

/** @param {RootState} state */
export const selectProducts = state => state.products;

/**
 * @param {Guid} productId
 * @returns {(state: RootState) => Option<Product>}
 */
export const selectProductById = (productId) => (state) => state.products.get(productId);

export const productReducer = productSlice.reducer;
