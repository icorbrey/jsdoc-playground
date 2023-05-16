import { OptionMap } from '../../utilities/optionMap';
import { createSlice } from '@reduxjs/toolkit';

/**
 * @template T
 * @typedef {import('@reduxjs/toolkit').PayloadAction<T>} PayloadAction
 */

/** @typedef {import('../../app/store').RootState} RootState */

/**
 * @typedef {Object} CartEntry
 * @property {Guid} productId
 * @property {number} quantity
 */

/** @typedef {OptionMap<Guid, number>} CartState */

/** @type {CartState} */
const initialState = new OptionMap();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /** @param {PayloadAction<CartEntry>} action */
        productAdded: (state, action) => {
            state.set(action.payload.productId, action.payload.quantity);
        },

        /** @param {PayloadAction<CartEntry>} action */
        productQuantityModified: (state, action) => {
            state.set(action.payload.productId, action.payload.quantity);
        },

        /** @param {PayloadAction<Guid>} action */
        productRemoved: (state, action) => {
            state.delete(action.payload);
        },

        cleared: (state) => {
            state.clear();
        }
    }
});

/** @param {RootState} state */
export const selectCart = state => state.cart;

export const cartReducer = cartSlice.reducer;
