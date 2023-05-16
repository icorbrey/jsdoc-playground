import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cartSlice, selectCart } from './cartSlice';

export const useCart = () => {

    const dispatch = useAppDispatch();
    const entries = useAppSelector(selectCart);

    /**
     * @param {Guid} productId
     * @param {number} quantity
     */
    const addProduct = (productId, quantity = 1) => dispatch(cartSlice.actions.productAdded({
        productId,
        quantity,
    }));

    /**
     * @param {Guid} productId
     * @param {number} quantity
     */
    const setProductQuantity = (productId, quantity) => dispatch(cartSlice.actions.productQuantityModified({
        productId,
        quantity,
    }));

    /** @param {Guid} productId */
    const removeProduct = (productId) => dispatch(cartSlice.actions.productRemoved(productId));

    const clear = () => dispatch(cartSlice.actions.cleared());

    return ({
        setProductQuantity,
        removeProduct,
        addProduct,
        entries,
        clear,
    });
};
