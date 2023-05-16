import { productReducer } from '../features/product/productSlice';
import { localeReducer } from '../features/locale/localeSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { configureStore } from '@reduxjs/toolkit';

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */

export const store = configureStore({
    reducer: {
        products: productReducer,
        locale: localeReducer,
        cart: cartReducer,
    }
});
